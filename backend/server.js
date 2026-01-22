require("dotenv").config();

const app = require('./src/app');
const connectDB = require('./src/db/db');


const PORT = process.env.PORT || 3000;
connectDB();

console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

