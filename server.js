const mongoose = require("mongoose");
const Document = require("./Document");

require("dotenv").config();

async function connect() {
  await mongoose.connect(
    "mongodb+srv://Lucifer8729:uxL8n3sSlxjAy96N@document.w8m7r.mongodb.net/Documents?retryWrites=true&w=majority"
  );
}
connect();

const io = require("socket.io")(process.env.PORT || 3001, {
  cors: {
    origin: "https://collaborative-doc-cn-project-64-65-71.netlify.app/",
    methods: ["GET", "POST"],
  },
});

const defaultVaule = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: defaultVaule });
}

// console.log("server is running...");
