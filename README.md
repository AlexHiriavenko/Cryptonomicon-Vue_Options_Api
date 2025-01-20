# Cryptonomicon-Vue_Options_Api

## URL:

https://alexhiriavenko.github.io/Cryptonomicon-Vue_Options_Api/

## Description:

Cryptonomicon (Vue_Options_Api). Vue Course by Illya Klymov, JavaScript Ninja.

## Youtube course link:

https://www.youtube.com/watch?v=4XTy6ucbLNg&list=PLvTBThJr861yMBhpKafII3HZLAYujuNWw

## Project setup

1. If you work with "lesson\_" branches

- npm install
- npm run serve
- npm run build
- npm run lint

2. If you work with "main" or "after_course" branches

- manually delete "node_modules" directory
- npm install
- restart your IDE
- npm run lint
- npm run dev
- npm run build
- npm run deploy

### [Configuration Reference](https://cli.vuejs.org/config/)

### Recommended VSCode Extensions:

- Vue - Official;
- ESLint;
- Prettier - Code formatter
- tailwind css Intellisense

## !!! Important Notes !!!

!!! В проекте в разных ветках используются разные сборщики и разные зависимости , что я имею в виду:

- курс с ветки lesson_1 по ветку lesson_8 это проект на vue-cli (deprecated) и с некоторыми устаревшими зависимостями; <br>
  все выполнено строго как у автора курса, чтобы полностью сохранить аутентичность курса автора.
- финальная версия (ветки after_course и main) уже собрана на сборщике vite и имеет последние актуальные версии зависимостей на 2025г.
- чтобы избежать конфликтов при настройке и сборке проекта при переходе к веткам after_course или main: <br>
  !!! обязательно удалите папку node_modules и заново выполните npm i !!!
- перезапустите ваш IDE.
- В качестве end of line лучше использовать LF вместо CRLF . В случае ошибок выполните npm run lint. Или внесите изменения eslint.config.js чтобы игнорировать эти правила

### Notes

1. For syntax highlighting, use Vue-Official (Vue-Volar), but for code formatting, use Prettier.
   Write next code in settings.json:

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "[vue]": {
    "editor.formatOnSave": true,
    // "editor.defaultFormatter": "Vue.volar"            // not used
    "editor.defaultFormatter": "esbenp.prettier-vscode"  // used
  },
}

```

2. you can find cryptocurrencies list here:
   https://min-api.cryptocompare.com/data/all/coinlist?summary=true
