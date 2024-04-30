var request = require("request");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var XLSX = require("xlsx");

const app = express();
app.use(bodyParser.json({ limit: "8mb" }));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"));
});
app.use("/css", express.static(path.join(__dirname, "view", "css")));
app.use("/js", express.static(path.join(__dirname, "view", "js")));

const base64ToArrayBuffer = async (base64) => {
    return new Promise((resolve) => {
        var binaryString = atob(base64.split(",")[1]);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        resolve(bytes.buffer);
    });
};

app.post("/file", async (req, res) => {
    try {
        const base64 = req.body.file;
        const buffer = await base64ToArrayBuffer(base64);

        var workbook = XLSX.read(buffer, {raw: true});

        var allText = [];

        workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];

            var arr = Object.keys(worksheet);

            arr.forEach((element) => {
                const line = worksheet[element];
                allText.push({
                    text: line.w,
                    index: element,
                    sheetName: sheetName
                });
            });
        });
        allText = allText.filter(e => e.text)
        return res.send(allText);
    } catch (e) {
        return res.send({ erro: true, message: e.message });
    }
});

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});