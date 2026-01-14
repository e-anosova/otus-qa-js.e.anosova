// jest.config.js
module.exports = {
  testEnvironment: 'node',

  // Важно: трансформировать ВСЕ .js файлы через babel-jest
  transform: {
    '^.+\\.js$': 'babel-jest'
  },

  // НЕ игнорировать node_modules при трансформации (если нужно)
  transformIgnorePatterns: [],

  testMatch: ['**/*.test.js'],

  // Убедитесь что Jest ищет модули в правильных местах
  moduleDirectories: ['node_modules', 'src']
}
