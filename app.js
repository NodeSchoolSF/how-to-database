const express = require("express");
const morgan = require("morgan");
const app = express();

const router = require("./router");

// Logging
app.use(morgan("combined"));

// Parse incoming request JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", router);

// Listen
const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
