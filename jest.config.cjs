module.exports = {
  // Твоя конфигурация
  testEnvironment: 'allure-jest/node',
  testEnvironmentOptions: {
    resultsDir: 'reports/allure-results'
  },
  
  // Остальные настройки
  testMatch: ['**/specs/tests/**/*.js', '**/?(*.)+(spec|test).js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};