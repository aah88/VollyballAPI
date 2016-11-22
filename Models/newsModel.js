var restful=require('node-restful'),
     mongoose = restful.mongoose,
    
    Schema = mongoose.Schema;

var newsModel = new Schema({
     title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
});

module.exports= restful.model('News', newsModel);