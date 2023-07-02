/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        backbeige: "#F4EFE4",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
