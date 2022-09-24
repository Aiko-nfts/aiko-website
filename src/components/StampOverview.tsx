import styled from "styled-components";
import StampPopup from "./StampPopup";

import header from "../assets/stamps/header.svg";
import Hexify from "./Hexify";

const StyledStampOverview = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
`;

const HeaderIcon = styled.img`
  height: 5.7rem;
`;

const Button = styled.button`
  height: 5.7rem;
  margin: 0 1.5rem;
  color: #9b8321;
  font-weight: 500;
  font-size: 3.5rem;
  line-height: 50px;
`;

interface Props {
  show: boolean;
  close: () => void;
  setStamp: (stamp: string) => void;
}

const StampOverview = ({ show, close, setStamp }: Props) => {
  return (
    <StampPopup show={show} close={close}>
      <StyledStampOverview>
        <Header>
          <HeaderIcon src={header} alt="Stamp header icon" />
          <Hexify yellow>
            <Button onClick={() => alert("Not implemented yet")}>
              REWARDS
            </Button>
          </Hexify>
        </Header>
      </StyledStampOverview>
    </StampPopup>
  );
};

export default StampOverview;
