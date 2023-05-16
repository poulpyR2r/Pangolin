const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
require('./src/config/db'); // Importez la connexion à la base de données


const userRoutes = require('./src/routes/user.routes');
const friendRoutes = require('./src/routes/friends.routes');





const app = express();










app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(userRoutes);
app.use(friendRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}.`);
});