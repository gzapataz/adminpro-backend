const mongoose = require('mongoose');



const dbConnection = async () => {
  try {
    await mongoose.connect( process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to the database', error);
  }
}

module.exports = {
  dbConnection
}