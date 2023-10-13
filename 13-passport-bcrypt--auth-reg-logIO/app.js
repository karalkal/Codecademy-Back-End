
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4001;

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
