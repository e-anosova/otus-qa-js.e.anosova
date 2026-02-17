/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Используем ts-jest для обработки TypeScript
  preset: 'ts-jest/presets/default-esm',

  // Тестовое окружение
  testEnvironment: 'node',

  // Корневая директория
  roots: ['<rootDir>'],

  // Поиск тестов
  testMatch: ['**/specs/tests/**/*.ts'],

  // Игнорируем node_modules
  testPathIgnorePatterns: ['/node_modules/', '/types.ts$'],

  // Трансформация TypeScript файлов
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'ESNext',
          target: 'ES2020',
          esModuleInterop: true
        }
      }
    ]
  },

  // Расширения файлов, которые Jest обрабатывает
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Маппинг модулей (важно для ESM)
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  // Паттерны для игнорирования трансформации
  transformIgnorePatterns: ['/node_modules/(?!allure-js-commons|jest-allure)/'],

  // Файлы для настройки окружения
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Репортеры (как в вашем примере)
  reporters: [
    'default',
    ['github-actions', { silent: false }],
    'summary',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/html-report',
        filename: 'index.html'
      }
    ]
  ],

  // Провайдер покрытия кода
  coverageProvider: 'v8'

  // Директория для отчетов о покрытии
  //coverageDirectory: './reports/coverage',

  // Детальный вывод
  //verbose: true,

  // Таймаут
  //testTimeout: 30000,
}

module.exports = config
