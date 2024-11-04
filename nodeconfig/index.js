
const express = require("express");

const cors = require("cors");

const config = require("./src/controller/meterConfig");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.use("/config", config);


const port = 8888;
app.listen(port, () => {
  console.log(`Server is running on http://10.1.2.3:${port}`);
});
