require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

// const DB = process.env.DATABASE_LOCAL;
const DB = process.env.DATABASE_SERVER;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB is connected");
  });

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
