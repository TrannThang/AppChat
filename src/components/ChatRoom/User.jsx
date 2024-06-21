import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid;

  .username {
    color: white;
    margin-left: 10px;
  }
`;

export default function User() {
  return (
    <WrapperStyled>
      <div>
        <Avatar>A</Avatar>
        <Typography.Text className="username">Trần Ngọc Thắng</Typography.Text>
      </div>
      <Button>Leave Room</Button>
    </WrapperStyled>
  );
}
