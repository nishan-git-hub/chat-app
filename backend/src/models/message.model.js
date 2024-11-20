import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {},
    receiverId: {},
    text: {},
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
