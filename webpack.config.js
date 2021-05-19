const path = require("path")


module.exports = {
    mode: "production",
    
    entry: {
        index: "./js/index.js",
        product: "./js/product.js",
        cart: "./js/cart.js",
        confirm: "./js/confirm.js",
        polyfill: "babel-polyfill"
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve("./js/bundle")
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}