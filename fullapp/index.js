const express = require("express");
const app = express();

require("./routes/home")(app);
require("./routes/demo")(app);

app.use(express.static("assets"));

app.listen(7000);
