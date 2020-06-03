var path = require("path");

const include = path.join(__dirname, "src");

module.exports = {
    entry: "./src/index",
    output: {
        path: path.join(__dirname, "dist"),
        libraryTarget: "umd",
        library: "Timer"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                include
            }
        ]
    }
};
