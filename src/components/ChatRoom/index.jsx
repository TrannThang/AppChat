import { Col, Row } from "antd";
import WindowChat from "./WindowChat";
import SideBar from "./SideBar";
import { useEffect } from "react";
import generateRandomUserKey from "../../utils/generateRandom";

export default function ChatRoom({
  userKey,
  receiverKey,
  message,
  messages,
  setReceiverKey,
  setMessage,
  sendMessage,
  connectedUsers,
}) {
  return (
    <Row>
      <Col span={6}>
        <SideBar
          connectedUsers={connectedUsers}
          setReceiverKey={setReceiverKey}
        />
      </Col>
      <Col span={18}>
        <WindowChat
          userKey={userKey}
          receiverKey={receiverKey}
          message={message}
          messages={messages}
          setReceiverKey={setReceiverKey}
          setMessage={setMessage}
          sendMessage={sendMessage}
          connectedUsers={connectedUsers}
        />
      </Col>
    </Row>
  );
}
