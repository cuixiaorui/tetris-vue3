const Koa = require("koa");
const app = new Koa();
const server = require("http").createServer(app.callback());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("gameOver", (state) => {
    socket.broadcast.emit("gameWon", state);
  });

  // 1. 接受 user 发过来的数据
  // 2. 广播给其他的 user
  socket.on("eliminateLine", (num) => {
    // 玩家消行了
    // 1. 让其他的玩家加行
    // 2. 同步自己的 Dival 视图
    socket.emit("syncAddLine", num);
    socket.broadcast.emit("addLine", num);
  });
  socket.on("moveBoxToDown", (info) => {
    // socket.broadcast.emit("moveBoxToDown", info);
    io.emit("moveBoxToDown", info);
  });
  socket.on("moveBoxToLeft", (info) => {
    // socket.broadcast.emit("moveBoxToLeft", info);
    io.emit("moveBoxToLeft", info);
  });
  socket.on("moveBoxToRight", (info) => {
    // socket.broadcast.emit("moveBoxToRight", info);
    io.emit("moveBoxToRight", info);
  });
  socket.on("rotateBox", (info) => {
    // socket.broadcast.emit("rotateBox", info);
    io.emit("rotateBox", info);
  });
  socket.on("createBox", (info) => {
    // socket.broadcast.emit("createBox", info);
    io.emit("createBox", info);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
