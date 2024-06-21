import { Col, Row } from "antd";
import User from "./User";
import ListUser from "./ListUser";
import styled from "styled-components";

const SideBarStyled = styled.div`
  background-color: #2c3a61;
  color: white;
  height: 100vh;
`;

export default function SideBar({ connectedUsers, setReceiverKey }) {
  return (
    <SideBarStyled>
      <Row>
        <Col span={24}>
          <User />
        </Col>
        <Col span={24}>
          <ListUser
            connectedUsers={connectedUsers}
            setReceiverKey={setReceiverKey}
          />
        </Col>
      </Row>
    </SideBarStyled>
  );
}
