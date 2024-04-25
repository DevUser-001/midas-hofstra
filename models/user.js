const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
name :{
    type  : String,
    required : true
  },
email :{
  type  : String,
  required : true
},
password :{
  type  : String,
  required : true
},
role :{
  type  : String,
  required : false
},
agreedToTos :{
  type  : String,
  required : true
},
agreedToTosDate :{
  type : Date,
  default : Date.now
},
accountCreationDate :{
  type : Date,
  default : Date.now
},
accountAuthorizedByAdmin :{
  type : Boolean,
  default : false
}
},{ collection: 'users' });
const User = mongoose.model('User',UserSchema);

module.exports = User;