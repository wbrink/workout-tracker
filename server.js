const express = require("express");
const app = express();
const path = require("path");

const publicDir = path.join(__dirname, "public");
const PORT = 8080;

app.use(express.static(publicDir));

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// use the html routes
app.use(require("./routes/html_routes"));

// use the api routes
app.use(require("./routes/api_routes"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



// workouts contain excercises