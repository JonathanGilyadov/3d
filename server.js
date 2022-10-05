const express = require('express');
const app = express(); // create express app
const path = require('path');
const folder = 'build';
app.use((req, res, next) => {
	res.header('Cross-Origin-Embedder-Policy', 'require-corp');
	res.header('Cross-Origin-Opener-Policy', 'same-origin');
	next();
});
app.use(express.static(folder));

app.get('*', (req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, './build/') });
});

// start express server on port 5000
app.listen(5000, '0.0.0.0', () => {
	console.log('server started on port 5000');
});
