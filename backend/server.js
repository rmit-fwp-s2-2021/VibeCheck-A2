const express = require("express");
const cors = require("cors");
const db = require("./src/database"); // by default will look for index.js
const fileUpload = require('express-fileupload');

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

app.use(fileUpload());

app.get("/", (req, res) => {
    res.json({ message: "VibeCheck API says hello!" });
  });


// Add routes
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/postReaction.routes.js")(express, app);
require("./src/routes/userFollows.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on - http://localhost:${PORT}.`);
});