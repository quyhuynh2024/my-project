import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please prodive name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: [true, "please prodive password"],
    minlength: 6,
    // select: false, // cannot get this field (password) when use User model, need to add more const user = await User.findOne({ email: email }).select("+password");
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

UserSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};
const User = mongoose.model("User", UserSchema);

export default User;
