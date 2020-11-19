module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      animation: {
        pop: 'pop 0.6s',
        popSimple: 'popSimple 0.7s',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite alternate',
        delayed: 'nothing 1s'
      },

      keyframes: {
        nothing: {
          '0% 100%':{}
        },

        pop: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg)'
          },
          '50%': {
            transform: 'scale(1.2) rotate(7deg)'
          }
        },

        popSimple: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.05)'
          }
        },

        ping: {
          '0%': {transform: 'scale(1)', opacity: '1'},
          '50%, 100%': { transform: 'scale(1.1)', opacity: '0.9' },
        }
      },

      fontFamily: {
        balsamiq: ['Balsamiq Sans']
      },

      colors: {
        blueGray: {
          50: "#eceff1",
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#90a4ae',
          400: '#78909c',
          500: '#607d8b',
          600: '#546e7a',
          700: '#455a64',
          800: '#37474f',
          900: '#263238',
        },
      },

      spacing: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem'
      },

      boxShadow: {
        mdBlue: '0 4px 6px -1px rgba(43, 108, 176, 0.1), 0 2px 4px -1px rgba(43, 108, 176, 0.3)',
        xlBlue: '0 20px 25px 5px rgba(43, 108, 176, 0.1), 0 10px 10px 5px rgba(43, 108, 176, 0.5)',
        lgBlue: '0 10px 15px 3px rgba(43, 108, 176, 0.01), 0 4px 6px 2px rgba(43, 108, 176, 0.05)',
        mdPurpleCenter: '0 0 6px 3px rgba(102, 126, 234, 0.2)',
        mdOrangeCenter: '0 0 6px 3px rgba(237, 137, 54, 0.5)',
        mdIndigoCenter: '0 0 6px 3px rgba(102, 126, 234, 0.5)',
        mdBlueCenter: '0 0 6px 4px rgba(66, 153, 225, 0.5)',
        mdGrayCenter: '0 0 6px 4px rgba(0, 0, 0, 0.2)',
        mdGreenCenter: '0 0 6px 4px rgba(72, 187, 120, 0.5)',
        mdYellowCenter: '0 0 6px 4px rgba(236, 201, 75, 0.5)',
        mdRedCenter: '0 0 6px 4px rgba(245, 101, 101, 0.5)',
        lgPurpleCenter: '0 0 15px 4px rgba(102, 126, 234, 0.7)',
        lgOrangeCenter: '0 0 15px 4px rgba(237, 137, 54, 0.7)',
        lgIndigoCenter: '0 0 15px 4px rgba(102, 126, 234, 0.7)',
        lgBlueCenter: '0 0 15px 4px rgba(66, 153, 225, 0.7)',
        lgGrayCenter: '0 0 15px 4px rgba(0, 0, 0, 0.3)',
        lgGreenCenter: '0 0 15px  4px rgba(72, 187, 120, 0.7)',
        lgYellowCenter: '0 0 15px 4px rgba(236, 201, 75, 0.7)',
        lgRedCenter: '0 0 15px 4px rgba(245, 101, 101, 0.5)',
        cell: '0 0 8px -1px rgba(0, 0, 0, 0.2)'
      },
    },
  },
  variants: {},
  plugins: [],
}
