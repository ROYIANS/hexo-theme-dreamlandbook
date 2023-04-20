module.exports = {
  content: ['./themes/dreamlandbook/layout/**/*.ejs'],
  darkMode: 'class',
  theme: {
    textShadow: {},
    extend: {
      colors: {
        'background': {
          DEFAULT: '#f0f0f0',
          dark: '#222222'
        },
        'page-bg': {
          DEFAULT: '#fafafa',
          dark: '#161616'
        },
        'main-text': {
          DEFAULT: '#444444',
          dark: '#ffffff'
        },
        'border-color': {
          DEFAULT: '#eee',
          dark: '#262626'
        }
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        '17/20': '85%',
        '9/10': '90%',
        '19/20': '95%',
        'full': '100%',
        '10': '10rem',
        '20': '20rem',
        '30': '30rem',
        '40': '40rem',
        '50': '50rem',
        '80': '80rem'
      },
      zIndex: {
        '-100': -100,
        '-20': -20,
        '-10': -10,
        '-3': -3,
        '-2': -2,
        '-1': -1,
        '-0': -0,
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        '100': 100,
        'auto': 'auto',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [
    require('tailwindcss-typography')({
      // all these options default to the values specified here
      ellipsis: true,         // whether to generate ellipsis utilities
      hyphens: true,          // whether to generate hyphenation utilities
      kerning: true,          // whether to generate kerning utilities
      textUnset: true,        // whether to generate utilities to unset text properties
      componentPrefix: 'c-',  // the prefix to use for text style classes
    })
  ],
}
