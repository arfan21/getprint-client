const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            poppins: {
                blue: {
                    100: "#9B8FFF",
                    200: "#554AB2",
                    300: "#4A3EAE",
                    700: "#0E0943",
                },
                orange: "#FA7854",
                white: "#F6F5FF",
                gray: "#AFAFAF",
            },
            ...colors,
        },
        fill: {
            current: "currentColor",
            poppins: {
                blue: {
                    100: "#9B8FFF",
                    200: "#554AB2",
                    300: "#4A3EAE",
                    700: "#0E0943",
                },
                orange: "#FA7854",
                white: "#F6F5FF",
                gray: "#AFAFAF",
            },
            ...colors,
        },
    },
    variants: {
        fill: ["hover", "focus", "group-hover"], // this line does the trick
    },
    plugins: [],
};
