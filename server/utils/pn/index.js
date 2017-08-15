var request = require('request');

module.exports = {
	all (data) {
		request({
			url: 'https://pushcrew.com/api/v1/send/all',
			headers: {
				'Authorization': 'key=61e4d89d5d5d1391dc97ca0c471003d4'
			},
			method: 'POST'
		})
		.form(data)
		.on('response', function(response) {
			console.log('Respuesta de https://pushcrew.com/api/v1/send/all')
			console.log(response.status);
			console.log(response.request_id);
			console.log(response.statusCode);
			console.log(response.statusMessage);
		})
		.on('error', function(err) {
			console.log('Error de https://pushcrew.com/api/v1/send/all')
			console.log(err);
		});
	}
};