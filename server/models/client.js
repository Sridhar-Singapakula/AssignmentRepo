const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactPersonName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  pincode: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }, 
  isAdmin:{type:Boolean,default:false},
});

clientSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id,clientName:this.clientName,isAdmin:this.isAdmin,isClient:this.isClient}, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const Client = mongoose.model("Client", clientSchema);

const validate = (client) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    contactPersonName: Joi.string().label("Contact Person Name"),
    password: passwordComplexity().required().label("Password"),
    mobileNo: Joi.string().required().label("Mobile Number"),
    emailId: Joi.string().email().required().label("Email Address"),
    pincode: Joi.string().required().label("Pincode"),
    state: Joi.string().required().label("State"),
    city: Joi.string().required().label("City"),
    address: Joi.string().required().label("Address"),
  });
  return schema.validate(client);
};

module.exports = { Client, validate };
