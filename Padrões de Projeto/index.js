const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json({ limit: "8mb" }));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"));
});
app.use("/css", express.static(path.join(__dirname, "view", "css")));
app.use("/js", express.static(path.join(__dirname, "view", "js")));

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});