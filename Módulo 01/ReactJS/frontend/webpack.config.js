const path = require('path');

module.exports = {
	// Entry - arquivo de entrada, primeiro arquivo que vai ser executado
	entry: path.resolve(__dirname, 'src', 'index.js'),
	// Output - Qual arquivo que vai ser gerado depois de ser convertido
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
  },
  devServer: {
    // contentBase aponta para os caminhos publicos da sua aplicação
    contentBase: path.resolve(__dirname, 'public')
  },
	module: {
		rules: [
			{
				// Converter todos os arquvis js usando o babel-loader desde que não esteja na pasta node_modules
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					// Pegar o css convertido pelo css-loader e injetar dentro do nosso HTML
					{loader: 'style-loader'},
					// Ler arquivos css e interprestar as importações dentro dos mesmos
					{loader: 'css-loader'},
				]
			},
			{
				test: /.*\.(git|png|jpe?g)$/i,
				use: {
					loader: 'file-loader',
				}
			}
		]
	},
}