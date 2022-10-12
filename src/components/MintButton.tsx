import styled from "styled-components";
import Hexify from "./Hexify";

const ButtonArea = styled.button`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.7rem;
`;

const Countdown = styled.div`
  font-size: 3.7vh;
  font-weight: 500;
  color: white;
  margin: 0 1.327vh;
  display: flex;
  align-items: center;
`;

interface Props {
  action: () => void;
}

const MintButton = ({ action }: Props) => {
  return (
    <Hexify>
      <ButtonArea onClick={() => action()}>
        <Countdown>A:\Stamps</Countdown>
      </ButtonArea>
    </Hexify>
  );
};

export default MintButton;
