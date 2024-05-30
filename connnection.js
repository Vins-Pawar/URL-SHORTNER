const mongoose=require('mongoose')

async function connectToMongoDB(path){
    return await mongoose.connect(path);
}

module.exports=connectToMongoDB;