const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    // loaders: [
    // 	{
    // 		test: /\.jsx?$/,
    // 		loader: 'babel-loader',
    // 		exclude: /node_modules/,
    // 		query: {
    // 			cacheDirectory: true,
    // 			presets: ['react', 'es2015']
    // 		},
    // 		use: [
    // 			// Creates `style` nodes from JS strings
    // 			'style-loader',
    // 			// Translates CSS into CommonJS
    // 			'css-loader',
    // 			// Compiles Sass to CSS
    // 			'sass-loader',
    // 		]
    // 	}
    // ]

    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
