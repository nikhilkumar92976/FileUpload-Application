const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log('db connection successful'))
    .catch(err => console.error('db connection error:', err))
}