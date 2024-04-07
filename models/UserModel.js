import mongoose, { model, mongo } from "mongoose";

import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    E_no: {
      type: Number,
      minLength: [15, "minimum length is 15"],
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      // unique : true,
      minLength: [5, "min length is 5"],
      require: true,
    },
    room: {
      isBooked: {
        type: Boolean,
        default: false,
      },
      bookingDate: {
        type: Date,
      },
      roomId: {
        type: String,
      },
    },
    complains: [
      {
        complain_type: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    ph_no: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timeStamp: true,
  }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods = {
  JWT: function () {
    const token = Jwt.sign(
      {
        id: this.E_no,
        email: this.email,
      },
      process.env.SEC,
      {
        expiresIn: "1h",
      }
    );
    return token;
  },
  comparePassword: async function (password, dbPassword) {
    console.log(this.password);
    return await bcrypt.compare(password, dbPassword);
  },
};

const UserModel = model("Students", UserSchema);
export default UserModel;
