const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();


const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ListClientRegisted = {};

function addToUserList(UserId, socketId) {
    if (!UserId) {
        console.log("UserId undefined");
        return;
    }
    
    if (!ListClientRegisted[UserId]) {
        ListClientRegisted[UserId] = [];
    }

    if (!ListClientRegisted[UserId].includes(socketId)) {
        ListClientRegisted[UserId].push(socketId);
        console.log(`UserId ${UserId} added with socketId ${socketId}`);
    } else {
        console.log(`socketId ${socketId} already exists for UserId ${UserId}`);
    }
}



function getAllRegistedExceptUser(userId) {
    let users = Object.keys(ListClientRegisted);
	var filteredUsers = users.filter(_ => _ != userId);
    return filteredUsers;

}

function getAllSocketIdsExceptUser(userId) {
    let allSocketIds = [];
    
    for (let key in ListClientRegisted) {
        if (key !== userId) {
            allSocketIds = allSocketIds.concat(ListClientRegisted[key]);
        }
    }
    
    return allSocketIds;
}

function removeFromUserList(socketId) {
    for (const userId in ListClientRegisted) {
        const index = ListClientRegisted[userId].indexOf(socketId);
        if (index !== -1) {
            ListClientRegisted[userId].splice(index, 1);
            console.log(`socketId ${socketId} removed from UserId ${userId}`);
            if (ListClientRegisted[userId].length === 0) {
                delete ListClientRegisted[userId];
                console.log(`UserId ${userId} has no more socket connections and has been removed`);
            }
            return;
        }
    }
}

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('user_connect', (key) => {

		let listUser = getAllRegistedExceptUser(key);

		// emit every user connect to socket
		socket.emit("list_connected_user",{Data : listUser} );

		let IsNewUser = !ListClientRegisted[key];

		if (IsNewUser) {
			// emit event new user for all users
			let allUserKeys = getAllSocketIdsExceptUser(key);

			allUserKeys.forEach(socketId => {
				io.to(socketId).emit("new_connected_user", {UserId : key});
			});
		}

        addToUserList(key, socket.id);
        console.log('Received connect data:', key, socket.id);
    });


	socket.on('user_sent_message', async (data) => {
		try {
			console.log('message from client:', data);
			const userId = data.userId;
			const receiverId = data.receiverId;
			const userMessage = data.message;

			let receiverKeys = ListClientRegisted[receiverId] ?? null;
			if (!receiverKeys || receiverKeys.length === 0) {
				console.log(`Can't find any socketId for receiverId ${receiverId}`);
			} else {
				receiverKeys.forEach(socketId => {
					io.to(socketId).emit("message_received", { UserId: userId, UserMessage: userMessage });
				});
			}

			let userKeys = ListClientRegisted[userId] ?? null;
			if (!userKeys || userKeys.length === 0) {
				console.log(`Can't find any socketId for UserId ${userId}`);
			} else {
				userKeys.forEach(socketId => {
					if(socketId != socket.id)
						io.to(socketId).emit("message_received", { UserId: userId, UserMessage: userMessage });
				});
			}

		} catch (error) {
			console.log('Error requesting reply message:', error);
		}
	});
	
	socket.on('disconnect', () => {
		removeFromUserList(socket.id);
		console.log('user disconnected');
	});

	socket.on('reconnect', () => {
		console.log('user reconnect');
	});
});

server.listen(3000);
console.log('server running at http://localhost:3000');
