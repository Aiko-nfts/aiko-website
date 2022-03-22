import { ReactNode } from "react";
import styled from "styled-components";
import leftEnd from "../assets/svgs/hex-left.svg";
import leftEndDark from "../assets/svgs/hex-left-dark.svg";
import rightEnd from "../assets/svgs/hex-right.svg";
import rightEndDark from "../assets/svgs/hex-right-dark.svg";

const Container = styled.div`
  position: relative;
  display: flex;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
`;

const BackgroundEnd = styled.img`
  height: 100%;
`;

interface HexifyProps {
  dark?: boolean;
}

const BackgroundMiddle = styled.div`
  height: 100%;
  flex: 1;
  background: ${(props: HexifyProps) =>
    props.dark
      ? "linear-gradient(to right, #42689A, #5B7BA3)"
      : "linear-gradient(to right, #748abd, #92a7c6)"};
`;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: ReactNode;
  dark?: boolean;
}

const Hexify = ({ children, dark }: Props) => {
  return (
    <Container>
      <BackgroundContainer>
        <BackgroundEnd
          src={dark ? leftEndDark : leftEnd}
          alt="Background asset"
        />
        <BackgroundMiddle dark={dark} />
        <BackgroundEnd
          src={dark ? rightEndDark : rightEnd}
          alt="Background asset"
        />
      </BackgroundContainer>
      <Content>{children}</Content>
    </Container>
  );
};

export default Hexify;
