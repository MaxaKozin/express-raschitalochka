const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
    totalBalance: String,
    typeTotalBalance: {
      type: String,
      enum: ["+", "-"],
      default: "+",
    },
    finance: [
      {
        comments: {
          type: String,
          required: true,
          default: "",
        },
        date: {
          type: Date,
          required: true,
        },
        type: {
          type: String,
          enum: ["+", "-"],
        },
        category: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
          default: "0",
        },
        balanceAfter: {
          type: String,
          default: "0",
        },
      },
    ],
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("User", userSchema);
  }

  createUser = async (userData) => {
    return await this.db.create(userData);
  };

  findUserByEmail = async (query) => {
    return await this.db.findOne(query);
  };

  findUserById = async (id) => {
    return await this.db.findById(id);
  };

  updateUser = async (userId, newData) => {
    return await this.db.findByIdAndUpdate(userId, newData, { new: true });
  };
}

module.exports = new User();
