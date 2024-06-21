import "./index.css";
import ChatRoom from "./components/ChatRoom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

function App() {
  const [userKey, setUserKey] = useState("");
  const [receiverKey, setReceiverKey] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const saveMessages = (userKey, receiverKey, messages) => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || {};
    const chatKey = `${userKey}_${receiverKey}`;
    chatHistory[chatKey] = messages;
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  };

  const loadMessages = (userKey, receiverKey) => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || {};
    const chatKey = `${userKey}_${receiverKey}`;
    return chatHistory[chatKey] || [];
  };

  useEffect(() => {
    const storedUserKey = localStorage.getItem("userKey");
    if (storedUserKey) {
      setUserKey(storedUserKey);
    } else {
      const newUserKey = generateRandomUserKey();
      localStorage.setItem("userKey", newUserKey);
      setUserKey(newUserKey);
    }

    socket.on("message_received", (data) => {
      console.log(data);
      const chatKey = `${data.userId}_${data.receiverId}`;
      const reverseChatKey = `${data.receiverId}_${data.userId}`;
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, data];
        saveMessages(chatKey, newMessages); // Lưu tin nhắn vào localStorage
        saveMessages(reverseChatKey, newMessages); // Lưu tin nhắn vào localStorage cho người nhận
        return newMessages;
      });
    });

    socket.on("list_connected_user", (data) => {
      console.log(data);
      setConnectedUsers(data.Data);
    });

    socket.on("new_connected_user", (data) => {
      console.log(data);
      setConnectedUsers((prevUsers) => {
        if (!prevUsers.includes(data.UserId)) {
          return [...prevUsers, data.UserId];
        }
        return prevUsers;
      });
    });

    return () => {
      socket.off("message_received");
      socket.off("list_connected_user");
      socket.off("new_connected_user");
    };
  }, []);

  useEffect(() => {
    if (userKey) {
      socket.emit("user_connect", userKey);
    }
  }, [userKey]);

  useEffect(() => {
    if (userKey && receiverKey) {
      const loadedMessages = loadMessages(userKey, receiverKey);
      setMessages(loadedMessages); // Load tin nhắn từ localStorage
    }
  }, [receiverKey]);

  const generateRandomUserKey = () => {
    return "user_" + Math.random().toString(36).substr(2, 9);
  };

  const sendMessage = () => {
    const messageData = {
      userId: userKey,
      receiverId: receiverKey,
      message: message,
      UserMessage: message,
    };
    console.log(messageData);
    socket.emit("user_sent_message", messageData);
    const newMessages = [...messages, messageData];
    setMessages(newMessages);
    saveMessages(userKey, receiverKey, newMessages); // Lưu tin nhắn vào localStorage
    saveMessages(receiverKey, userKey, newMessages); // Lưu tin nhắn vào localStorage cho người nhận
    setMessage(""); // Clear the input after sending the message
  };

  const handleSelectReceiver = (receiverId) => {
    setReceiverKey(receiverId);
    const loadedMessages = loadMessages(userKey, receiverId);
    setMessages(loadedMessages); // Load tin nhắn từ localStorage
  };

  return (
    <>
      <ChatRoom
        userKey={userKey}
        receiverKey={receiverKey}
        message={message}
        messages={messages}
        setReceiverKey={handleSelectReceiver}
        setMessage={setMessage}
        sendMessage={sendMessage}
        connectedUsers={connectedUsers}
      />
    </>
  );
}

export default App;
