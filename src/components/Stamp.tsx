import styled from "styled-components";

import background from "../assets/stamps/background.svg";

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
  justify-content: space-between;
  align-items: center;
  padding: 3.1rem 1.2rem; ;
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
    <StyledStamp>
      <Background src={background} alt="Stamp background" />
      <Content>{stamp.stars}</Content>
    </StyledStamp>
  );
};

export default Stamp;
