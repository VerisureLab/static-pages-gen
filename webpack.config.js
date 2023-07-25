// const glob = require('glob');
// const path = require('path');
//
// module.exports = {
//     mode: "none",
//     entry: {
//         styles: glob.sync('./templates/scss/*/style.scss').reduce((acc, path) => {
//             const entry = path
//                 .replace('/style.scss', '')
//                 .split('/')
//                 .slice(-1)
//                 .pop()
//             ;
//             acc[entry] = path;
//             return acc;
//         }, {}),
//     },
//     output: {
//         publicPath: "/assets/",
//         filename: 'css/[name]/style.js',
//         path: path.resolve(__dirname, "dist")
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /\.scss$/,
//                 use: [
//                     'style-loader',
//                     'css-loader',
//                     'sass-loader'
//                 ]
//             }
//         ]
//     },
//
// }