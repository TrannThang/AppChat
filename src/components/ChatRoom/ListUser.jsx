import { PlusSquareFilled } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";

const { Panel } = Collapse;

const PannelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const RoomStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function ListUser({ connectedUsers, setReceiverKey }) {
  const handleSelectReceiver = (receiverId) => {
    setReceiverKey(receiverId);
  };
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PannelStyled header="User List" key="1">
        {connectedUsers?.map((user, index) => (
          <RoomStyled key={index} onClick={() => handleSelectReceiver(user)}>
            {user}
          </RoomStyled>
        ))}
        <Button type="text" icon={<PlusSquareFilled />} className="add-room">
          Add Room
        </Button>
      </PannelStyled>
    </Collapse>
  );
}
