const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

// connect mongoose db (the options are required to get rid of depracation warnings)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// application constants
const mongoose_db = mongoose.connection;
const publicDir = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

// express middleware
app.use(express.static(publicDir));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// use the html & api routes
app.use(require("./routes/html_routes"));
app.use(require("./routes/api_routes"));


// when the db opens then start our application
mongoose_db.on("open", function() {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

// on error opening database
mongoose_db.on("error", function() {
  console.error("database failed to open");
})
