const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  booksread: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: [String],
        required: true
      },
      publishdate: {
        type: Date
      },
      averagerating: {
        type: Number
      },
      thumbnail: {
        type: String
      },
      link: {
        type: String,
        required: true
      }
    }
  ],
  bookstoread: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: [String],
        required: true
      },
      publishdate: {
        type: Date
      },
      averagerating: {
        type: Number
      },
      thumbnail: {
        type: String
      },
      link: {
        type: String,
        required: true
      }
    }
  ]
  //TODO maybe add posts as well
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
