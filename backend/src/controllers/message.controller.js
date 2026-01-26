import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js"
import User from "../models/User.js"

export const getAllcontacts = async (req, res) => {

  try {

    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId } // $ne -> means not equal to
    }).select("-password");

    res.status(200).json(filteredUsers);

  } catch (error) {
    console.log("Error in getAllcontact message controller: ", error);
    res.status(500).json({
      message: "Server error"
    });
  }

};

export const getChatPartners = async (req, res) => {
  try {

    const loggedInUserId = req.user._id;

    //find all the messages whether logged-in user is either sender or receiver.

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId },
      ]
    })

    const chatPartnersIds = [...new Set(
      messages.map((msg) => {
        return msg.senderId.toString() === loggedInUserId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString();
      }
      )
    ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds }
    }).select("-password");

    res.status(200).json(chatPartners);

  } catch (error) {
    console.error("Error in getChatPartners controller: ", error.message);
    return res.status(500).json({
      error:"Internal server error"
    });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    /* variable name {id} comes from /:id. whatever the routename would be the variable name.
   then we rename it using id:RENAMED-VALUE*/

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);

  } catch (error) {
    console.log("Error in getMessagesByUserId message controller:", error.message);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    console.log(req.body);

    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    };

    // Message creation
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: send message in real-time if user is online - socket.io

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message)
    return res.status(500).json({
      error: "Internal server error",
    });
  };
};