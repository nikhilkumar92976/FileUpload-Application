const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
const fileuploader = require('express-fileupload');
app.use(fileuploader({
  useTempFiles:true,
  tempFileDir:'/tmp/'
}));

require('dotenv').config();
const port = process.env.PORT || 4000;

// mount the routs
const routes =  require('./routs/rout');
app.use('/api/v1/upload', routes);

require('./DataBase/database').dbConnect();

const cloudinary = require('./DataBase/cloudinary');
cloudinary.cloudinaryConnect();


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
