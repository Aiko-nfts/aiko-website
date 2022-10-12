import styled from "styled-components";

import background from "../assets/stamps/background.svg";
import StampStar from "./StampStar";

const StyledStamp = styled.button`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 3.1rem 1.2rem;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: #567ca1;
  margin-bottom: 1.4rem;
`;

const Stars = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.1rem;
`;

export interface StampType {
  name: string;
  stars: number;
}

interface Props {
  stamp: StampType;
  selectStamp: () => void;
}

const Stamp = ({ stamp, selectStamp }: Props) => {
  return (
    <StyledStamp onClick={() => selectStamp()}>
      <Background src={background} alt="Stamp background" />
      <Content>
        <Line />
        <Stars>
          <StampStar on={stamp.stars > 0} />
          <StampStar on={stamp.stars > 1} />
          <StampStar on={stamp.stars > 2} />
        </Stars>
      </Content>
    </StyledStamp>
  );
};

export default Stamp;
