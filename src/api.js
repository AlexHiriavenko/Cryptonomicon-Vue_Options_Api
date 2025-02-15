// const API_KEY = '260247a5c09824d11eacc4f26c9f6b8f1d20c900f0b366e746a65609f5dc05b5';

const API_KEY =
  'd0690cd38c2b128758385513f18ad8ee5045266d889b6aebc6430bdcff48c177';

const tickerHandlers = new Map();
let tickerList;

const messageType = {
  AGGREGATE_INDEX: '5',
  INVALID_SUB: '500',
};

let priceBTC;

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

socket.addEventListener('message', (e) => {
  let {
    TYPE: type,
    FROMSYMBOL: fromCurrency,
    TOSYMBOL: toCurrency,
    PRICE: newPrice,
    PARAMETER: parameter,
  } = JSON.parse(e.data);

  if (type === messageType.INVALID_SUB && type === '500') {
    // Извлекаем тикер из параметра подписки через регулярное выражение (строка1, X, строка2)
    const tickerMatch = parameter.match(/5~CCCAGG~(.*?)~/);

    if (Array.isArray(tickerMatch) && tickerMatch.length > 1) {
      const tickerName = tickerMatch[1];
      // Получаем обработчики для данного тикера
      const tickerHandlersList = tickerHandlers.get(tickerName) ?? [];
      tickerHandlersList.forEach((updateHandler) => updateHandler(null));
    }
    return;
  }

  let ratioBTC = 1;
  if (fromCurrency === 'BTC') {
    priceBTC = newPrice;
  } else if (toCurrency === 'BTC') {
    ratioBTC = priceBTC;
  }

  const handlers = tickerHandlers.get(fromCurrency) ?? [];
  handlers?.forEach((fn) => fn(newPrice * ratioBTC));
});

const sendToWS = (message) => {
  const stringifiedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
  }
  socket.addEventListener(
    'open',
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
};

const subscribeToTickerOnWS = (ticker, convertCurrency) => {
  const message = {
    action: 'SubAdd',
    subs: [`5~CCCAGG~${ticker}~${convertCurrency}`],
  };
  sendToWS(message);
};

const unsubscribeFromTickerOnWS = (ticker, convertCurrency) => {
  const message = {
    action: 'SubRemove',
    subs: [`5~CCCAGG~${ticker}~${convertCurrency}`],
  };
  sendToWS(message);
};

export const unsubscribeFromTicker = (ticker) => {
  tickerHandlers.delete(ticker);
  unsubscribeFromTickerOnWS(ticker, 'USD');
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickerHandlers.get(ticker) || [];
  tickerHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWS(ticker, 'USD');
};

export const getTickerList = async () => {
  const response = await fetch(
    'https://min-api.cryptocompare.com/data/all/coinlist?summary=true'
  );
  const data = await response.json();
  tickerList = Object.values(data.Data)?.map((ticker) => ticker.Symbol);
  return tickerList;
};

export const getCoinTopList = async (limit = 10) => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${limit}&tsym=USD`
  );

  return await response.json().then((res) => res.Data);
};
