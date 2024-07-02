import app from "./app.js";
import { connectToDatabase } from "./src/db/connection.js";

const PORT = process.env.PORT || 3000;
//Database connection
connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server listening to http://localhost:${PORT} and connected to database ✌️`
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });
