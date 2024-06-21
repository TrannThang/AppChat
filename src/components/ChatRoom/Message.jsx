import { Avatar, Typography } from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: ${(props) => (props.isOwnMessage ? "row-reverse" : "row")};
  align-items: center;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 12px;
    color: black;
  }
`;
const MessageText = styled.p`
  margin: 0;
  background: ${(props) => (props.isOwnMessage ? "#d1ffc4" : "#ffffff")};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
`;

const DisplayName = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

export default function Message({
  text,
  displayName,
  photoURL,
  isOwnMessage,
  UserMessage,
  receiverId,
}) {
  return (
    <WrapperStyled isOwnMessage={isOwnMessage}>
      <Avatar size={"small"} src={photoURL}>
        {displayName ? displayName[0] : "Crush"}
      </Avatar>
      <div>
        <DisplayName className="author">
          {displayName} to {receiverId}:
        </DisplayName>
        <MessageText isOwnMessage={isOwnMessage}>
          {UserMessage || text}
        </MessageText>
      </div>
    </WrapperStyled>
  );
}
