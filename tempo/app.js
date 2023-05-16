const express = require("express");
const app = express();
app.use("/", require("./modules/rutas"));

app.listen("3300", () => {
  console.log("aplicacion corriendo");
});
