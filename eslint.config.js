import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettier from '@vue/eslint-config-prettier';
import globals from 'globals';

export default [
  // Игнорируемые файлы
  {
    ignores: ['node_modules/', 'dist/'],
  },

  // Базовые правила ESLint
  js.configs.recommended,

  // Конфигурация для Vue
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // Указываем Vue Parser
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'writable',
      },
    },
    plugins: {
      vue,
    },
    rules: {
      // Требует имена пропсов в стиле camelCase
      'vue/prop-name-casing': ['error', 'camelCase'],
      // Требует emit в стиле camelCase
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      // Запрещает использовать `this` в шаблонах компонентов
      'vue/this-in-template': ['error', 'never'],
      // Запрещает использование нескольких пробелов подряд
      'vue/no-multi-spaces': 'error',
      // Требует определённый порядок тегов `<template>`, `<script>` и `<style>`
      'vue/component-tags-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
    },
  },

  // Конфигурация для JS файлов
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
  },

  // Интеграция Prettier
  {
    files: ['**/*.{js,vue}'],
    rules: {
      semi: 'off', // Не дублируйте правило, Prettier уже обрабатывает точки с запятой
    },
    ...prettier,
  },
];
