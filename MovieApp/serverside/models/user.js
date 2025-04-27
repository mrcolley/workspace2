const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema
const userSchema = mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String, required: false },
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
    primaryNumber: { type: String, required: false },
    secondaryNumber: { type: String, required: false },
    primaryEmail: { type: String, required: false },
    secondaryEmail:  { type: String, required: false },
    mood: { type: String},
    genre: { type: String },
    actor: { type: String},
});

//user the blueprint to create the model
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model
module.exports = mongoose.model('User', userSchema, 'Users');
//note capital U in the colection name