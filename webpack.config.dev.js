const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


//------------------------------------------------------------------------
// получить переменную командной строки
// const arg=(name)=>process.argv.find((a) => ((a === name) || (a === (`--${name}`)))) !== undefined;
//------------------------------------------------------------------------
// генерация ключа (для CSS)
// const genHash=(count)=>{
//     let res = '';
//     const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < count; i++) res += possible.charAt(Math.floor(Math.random() * possible.length));
//     return res;
// }
//------------------------------------------------------------------------

let mode = 'development';
// let outputPath = path.resolve(__dirname,'dist');
// let hash = genHash(20);





module.exports = {
    entry:{
        main:'./dev/index.js',
        //style:'./app/style.scss'
    }, 
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[fullhash].js',
        chunkFilename: 'lazy/[id].[chunkhash].js',
    },
    resolve: {
        alias: {
            //COMPONENTS: path.resolve(__dirname, app_client+'components/'),
            // REDUX:path.resolve(__dirname, 'dev/redux/'),
        },
    },
    mode,
    devtool: 'inline-source-map',
    plugins: [
        //new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),        
        new webpack.DefinePlugin({
           WEBPACK_MODE:JSON.stringify(mode),
        }),        
        new HtmlWebPackPlugin({
            template: `./dev/index.html`,
            filename: './index.html',
        }),
        new CopyWebpackPlugin([
            { from: `./dev/media/favicon.ico` }
        ]),
        //new webpack.HotModuleReplace`mentPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader', // inject CSS to page
                    'css-loader', // translates CSS into CommonJS modules
                    // 'sass-loader' // compiles SASS to CSS
                    {
                        loader: "sass-loader",
                        options: {
                        //   warnRuleAsWarning: true,
                        },
                      },
                ]
            },            
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            //{
            //    test: /\.css$/,
            //    use: [MiniCssExtractPlugin.loader, 'css-loader'],
            //},
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port:3000,
        liveReload: true,
    },
        

};