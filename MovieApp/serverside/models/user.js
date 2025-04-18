const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema
const userSchema = mongoose.Schema({
    firstName: { type: String},
    mood: { type: String},
    genre: { type: String },
    actor: { type: String},
});

//user the blueprint to create the model
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model
module.exports = mongoose.model('User', userSchema, 'Users');
//note capital U in the colection name