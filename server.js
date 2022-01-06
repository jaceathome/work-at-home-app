const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const path = require('path');

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const server = require("http").Server(app)
const io = require("socket.io")(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        // credentials: true
    }
})

app.use(cors());
app.use(express.json());


/*Routes*/
const UserResource = require('./routes/api/users.api')
app.use('/api/users', UserResource)

//Peer JS Setup
let usersOnRoom = {};

const ExpressPeerServer = require("peer").ExpressPeerServer;
const options = {
    debug: true,
    allow_discovery: true,
};
let peerServer = ExpressPeerServer(server, options);
app.use("/peerjs", peerServer);

io.on("connection", socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId, "Has joined!")

        if (usersOnRoom[roomId] === undefined) {
            usersOnRoom[roomId] = []
        }

        if (!usersOnRoom[roomId].includes(userId)) {
            usersOnRoom[roomId].push(userId)


            socket.to(roomId).emit('user-connected', userId)
        }

        socket.on('disconnect', () => {
            usersOnRoom[roomId] = usersOnRoom[roomId].filter(e => e !== userId);

            socket.to(roomId).emit('user-disconnected', userId)
        })
    })

    socket.on('leave-room', (roomId, userId) => {
        if (usersOnRoom[roomId]) {
            usersOnRoom[roomId] = usersOnRoom[roomId].filter(e => e !== userId);

            socket.to(roomId).emit('user-disconnected', userId)
        } else {

        }
    })


})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("public"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public/index.html'))
    })
}

server.listen(PORT, () => 
