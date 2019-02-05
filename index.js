require('dotenv').config();

const server = require('./api/server.js');


// enable dynamic ports for hoding provider
const port = process.env.PORT || 5000;


server.listen(port, () => console.log(`Server running on port ${port}`));
