import { ReactNode } from "react";
import styled from "styled-components";

const StyledStampPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const Background = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Content = styled.div`
  position: relative;
  width: 93%;
  height: 90%;
  max-width: 151rem;
  max-height: 89.5rem;
  background: pink;
  display: flex;
  flex-direction: column;
  clip-path: polygon(
    1% 0%,
    99% 0%,
    100% 2%,
    100% 98%,
    99% 100%,
    1% 100%,
    0% 98%,
    0% 2%
  );
`;

const Header = styled.div`
  width: 100%;
  height: 4.2rem;
  background: #87b2df;
`;

const Container = styled.div`
  width: 100%;
  flex: 1;
  background: #d0e1f3;
  padding: 3rem 3.5rem;
`;

interface Props {
  children: ReactNode;
  show: boolean;
  close: () => void;
}

const StampPopup = ({ children, show, close }: Props) => {
  if (!show) return null;

  return (
    <StyledStampPopup>
      <Background onClick={() => close()} />
      <Content>
        <Header />
        <Container>{children}</Container>
      </Content>
    </StyledStampPopup>
  );
};

export default StampPopup;
