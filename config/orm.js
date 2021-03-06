require("./connection");

connection.connect(function (err) {
	if (err) throw err;

	console.log("connected as id " + connection.threadId);
});

module.exports = {

	selectAll: function (callback, devoured) {
		if (arguments.length > 1) {
			connection.query('SELECT * FROM burgers WHERE devoured=?', [devoured], function (err, res) {
				if (err) throw err;

				callback(res);
			});

		} else {
			connection.query('SELECT * FROM burgers', function (err, res) {
				if (err) throw err;

				callback(res);
			});

		}
	},

	selectDevoured: function (callback) {
		connection.query('SELECT * FROM burgers WHERE devoured = 1', function (err, res) {

		});
	},

	insertOne: function (burgerName, devoured) {
		connection.query('INSERT INTO burgers (burger_name, devoured) VALUES ?',
			[[[burgerName, devoured]]], function (err, res) {
				if (err) throw err;

				res.send(res.affectedRows);
			});
	},

	updateOne: function (id, burgerName, devoured) {
		var query = 'UPDATE burgers ' +
			'SET burgerNAME = ?' +
			'WHERE id = ?'
		connection.query(query, function (err, res) {
			if (err) throw err;

			res.send(res.affectedRows);
		});
	}
}