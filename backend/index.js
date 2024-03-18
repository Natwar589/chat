const express = require("express");
const dotenv = require("dotenv");

// const { chats } = require("./data/data");
const connectDB = require("./Config/Db");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewere/errorMiddlewere");
dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("api is running Successfully");
});

app.use(express.json()); //To accept json data from frontend

//To Go on particular user
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`server running on PORT ${5000}`));
const io = require("socket.io")(server, {
  cors: {
    pingTimeout: 60000,
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    // console.log(userData);
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("newMessage", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    // console.log(newMessageRecieved);
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);

      // console.log(newMessageRecieved);
    });
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stopTyping", (room) => {
    socket.in(room).emit("stopTyping");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.off("setup", () => {
    console.log("user DISCONNTECTED");
    socket.leave(userData._id);
  });
});
