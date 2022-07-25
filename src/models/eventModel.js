const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    eventDate: {
      type: Number,
      required: true,
      trim: true,
    },
    invitees: {
      type: [
        {
          invite: {
            type: ObjectId,
            ref: "User",
          },
          timings: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
