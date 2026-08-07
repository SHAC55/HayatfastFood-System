import "dotenv/config";

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

console.log(process.env.CLIENT_URL);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});