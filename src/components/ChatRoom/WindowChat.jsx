import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import styled from "styled-components";
import Message from "./Message";

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  border-bottom: 1px solid;
  background-color: #92a0c7;

  .header {
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &-title {
      margin: 0;
      font-weight: bold;
    }
    &-description {
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
  background-color: #dbdfec;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 12px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid black;
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatRoom({
  userKey,
  receiverKey,
  message,
  messages,
  setMessage,
  sendMessage,
  connectedUsers,
  setReceiverKey,
}) {
  const handleSendMessage = () => {
    if (message?.trim() !== "") {
      sendMessage();
      setMessage(""); // Clear the input after sending the message
    }
  };

  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header-info">
          <p className="header-title">Chat</p>
          <span className="header-description">Receiver: {receiverKey}</span>
        </div>
        <ButtonGroupStyled>
          <Button type="text" icon={<UserAddOutlined />}>
            Invite
          </Button>
          <Avatar.Group size={40} maxCount={2}>
            {connectedUsers.map((user) => (
              <Tooltip title={user} key={user}>
                <Avatar>{user}</Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>

      <ContentStyled>
        <MessageListStyled>
          {messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.message}
              displayName={msg.userId === userKey ? "You" : msg.userId}
              isOwnMessage={msg.userId === userKey}
              UserMessage={msg.UserMessage}
              receiverId={msg.receiverId}
            />
          ))}
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input
              placeholder="Enter message"
              bordered={false}
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSendMessage}
            />
          </Form.Item>
          <Button onClick={handleSendMessage}>Send</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}
