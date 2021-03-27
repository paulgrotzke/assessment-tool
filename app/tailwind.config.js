module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
    },
  },
}
