const mysql = require('mysql')
require('dotenv').config()

const bs = mysql.createConnection({
	host: process.env.host,
	user: process.env.user,
	database: process.env.database,
	password: process.env.password,
})

bs.connect(function (err) {
	if (err) {
		return console.error('Ошибка: ' + err.message)
	} else {
		console.log('Подключение к серверу MySQL успешно установлено')
	}
})

module.exports = bs
