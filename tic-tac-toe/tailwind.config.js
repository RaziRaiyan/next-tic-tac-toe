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
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite alternate',
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
        mdO: '0 0 6px 1px rgba(0, 0, 0, 0.2)',
        cell: '0 0 8px -1px rgba(0, 0, 0, 0.2)'
      },

      keyframes: {
        pop: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg)'
          },
          '50%': {
            transform: 'scale(1.2) rotate(7deg)'
          }
        },
        ping: {
          '0%': {transform: 'scale(1)', opacity: '1'},
          '50%, 100%': { transform: 'scale(1.1)', opacity: '0.9' },
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
