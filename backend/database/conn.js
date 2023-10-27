const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://alexsmag:web123@cluster0.ywme2nb.mongodb.net/?retryWrites=true&w=majority"

const connectMongo = async() => {
    try {

        const {connection} = await mongoose.connect(MONGO_URI)

        if (connection.readyState == 1){
            console.log("Database Connected")
        }


    } catch(errors) {
        return Promise.reject(errors)
    }
}
module.exports = connectMongo;