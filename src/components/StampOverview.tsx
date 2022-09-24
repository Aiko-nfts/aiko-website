import styled from "styled-components";
import StampPopup from "./StampPopup";

const StyledStampOverview = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: yellow;
`;

interface Props {
  show: boolean;
  close: () => void;
  setStamp: (stamp: string) => void;
}

const StampOverview = ({ show, close, setStamp }: Props) => {
  return (
    <StampPopup show={show} close={close}>
      <StyledStampOverview onClick={() => setStamp("meow")}>
        meow
      </StyledStampOverview>
    </StampPopup>
  );
};

export default StampOverview;
