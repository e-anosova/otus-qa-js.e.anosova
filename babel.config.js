// babel.config.js в корне проекта
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '22'
        }
      }
    ]
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          framework: './framework'
        }
      }
    ]
  ]
}
