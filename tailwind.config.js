/** @type {import('tailwindcss').Config} */
module.exports = {

  darkMode: 'class',

  content: [
    
    "*.{html,js}",

    "**/*.{html,js}",

    "./componentes/*.{html,js}"
  
  ],

  theme: {

    extend: {

      colors:{

        "primary":"#4338ca",

      }
      
    },

  },


  plugins: [],

}

