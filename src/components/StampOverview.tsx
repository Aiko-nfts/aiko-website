import styled from "styled-components";
import StampPopup from "./StampPopup";

import header from "../assets/stamps/header.svg";
import Hexify from "./Hexify";
import Stamp, { StampType } from "./Stamp";

const stamps: StampType[] = [
  {
    name: "1",
    stars: 1,
  },
  {
    name: "2",
    stars: 2,
  },
  {
    name: "3",
    stars: 3,
  },
  {
    name: "4",
    stars: 4,
  },
];

const StyledStampOverview = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const HeaderIcon = styled.img`
  height: 5.7rem;
`;

const RewardsButton = styled.button`
  height: 5.7rem;
  margin: 0 1.5rem;
  color: #9b8321;
  font-weight: 500;
  font-size: 3.5rem;
  line-height: 50px;
  text-transform: uppercase;
  cursor: pointer;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: #567ca1;
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: 0em;
  margin-bottom: 3.8rem;
`;

const StampContainer = styled.div`
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 3.8rem;
  grid-gap: 2.7rem;
`;

const RedeemButton = styled.button`
  height: 7.9rem;
  font-family: Video;
  font-size: 6.4rem;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  margin: 0 2.5rem;
  cursor: pointer;
`;

const ButtonDescription = styled.div`
  color: #567ca1;
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1.8rem;
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
            <RewardsButton onClick={() => alert("Not implemented yet")}>
              rewards
            </RewardsButton>
          </Hexify>
        </Header>
        <SubHeader>You have collected XX/YY stamps this season</SubHeader>
        <StampContainer>
          {stamps.map((stamp) => (
            <Stamp stamp={stamp} selectStamp={() => setStamp(stamp.name)} />
          ))}
        </StampContainer>
        <Hexify dark>
          <RedeemButton onClick={() => alert("Not implemented yet")}>
            redeem
          </RedeemButton>
        </Hexify>
        <ButtonDescription>
          Redeem only will be available on: XX/XX/XXXX
        </ButtonDescription>
      </StyledStampOverview>
    </StampPopup>
  );
};

export default StampOverview;
