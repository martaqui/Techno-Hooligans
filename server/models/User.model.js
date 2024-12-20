const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

// userSchema.pre('save', function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// })

// userSchema.methods.isValidPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

userSchema.methods.isValidPassword = function (password) {
  return this.password === password; // Comparación directa de texto plano
};

const User = mongoose.model("User", userSchema);
module.exports = User;
