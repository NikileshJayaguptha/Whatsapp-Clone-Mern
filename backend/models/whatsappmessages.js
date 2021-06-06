import mongoose from "mongoose";

const messageschema = mongoose.Schema({
  message: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },

  receiver: {
    required: true,
    type: Boolean,
  },
});
export default mongoose.model("Message", messageschema);
