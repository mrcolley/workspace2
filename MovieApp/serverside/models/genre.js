const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema
const genreSchema = mongoose.Schema({
    //id: { type: Number },
    //name: { type: String }
});


//use the blueprint to create the model
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model
module.exports = mongoose.model('Genre', genreSchema, 'Genres');
//note capital G in the colection name