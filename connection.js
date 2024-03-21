// Environment file
import dotenv from 'dotenv';
dotenv.config();
DB_USERNAME = process.env.DB_USERNAME;
DB_PASSWORD = process.env.DB_PASSWORD;
DB_NAME = process.env.DB_NAME;

const mariadb = require('mariadb');

// Main function
async function main() {
	let conn;

	try {
		conn = await mariadb.createConnection({
			host: 'localhost',
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			trace: true,
		});

		// Use Connection
		const contact = {
			first_name: 'Jonathan',
			last_name: 'DD',
			email: 'john.dd@example.com',
			ville: 'Liège',
			password: '987654321',
		};

		const response = await add_client(conn, contact);
		console.log(response);

		// Use Connection to get contacts data
		// var rows = await get_clients(conn);

		// //Print list of contacts
		// for (i = 0, len = rows.length; i < len; i++) {
		// 	console.log(`${rows[i].prenom} ${rows[i].nom} <${rows[i].email}>`);
		// }
	} catch (err) {
		// Manage Errors
		console.log(err);
	} finally {
		// Close Connection
		if (conn) conn.end();
	}
}

//Get list of contacts
function get_clients(conn) {
	return conn.query('SELECT prenom, nom, email FROM client LIMIT 5');
}

async function add_client(conn, data) {
	try {
		return await conn.query(
			`INSERT INTO ${DB_NAME}.client(prenom, nom, email, ville, password) VALUES (?, ?, ?, ?, ?)`,
			[
				data.first_name,
				data.last_name,
				data.email,
				(data.ville = 'Eupen'),
				(data.password = '12356'),
			]
			// ,
			// (err, result, meta) => {
			// 	if (err) throw err;
			// 	return [result, meta];
			// }
		);
		// return {
		//     id: result.insertId,
		//     // data.first_name,
		//     // data.last_name,
		//     // data.email
		// }
	} catch (err) {
		// Manage Errors
		console.log('SQL error in establishing a connection: ', err);
	}
}

main();
