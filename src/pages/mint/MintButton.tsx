import styled from "styled-components";
import Hexify from "../../components/Hexify";

const Container = styled.div`
  width: 100%;
  max-width: 50rem;
`;

const StyledMintButton = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 6.6rem;
  padding: 6px;
  justify-content: space-between;
`;

const TextArea = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 4rem;
`;

const TextItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TextHeader = styled.div`
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
`;

const TextValue = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
`;

const Button = styled.button`
  background: #f7d173;
  height: 100%;
  width: 17rem;
  color: #b7944e;
  font-size: 2.6rem;
  font-weight: 400;
  clip-path: polygon(
    8% 0%,
    92% 0%,
    100% 25%,
    100% 75%,
    92% 100%,
    8% 100%,
    0% 75%,
    0% 25%
  );
`;

const MintButton = () => {
  return (
    <Container>
      <Hexify dark>
        <StyledMintButton>
          <TextArea>
            <TextItem>
              <TextHeader>Price</TextHeader>
              <TextValue>0.09E</TextValue>
            </TextItem>
            <TextItem>
              <TextHeader>Aikos</TextHeader>
              <TextValue>2</TextValue>
            </TextItem>
            <TextItem>
              <TextHeader>Total</TextHeader>
              <TextValue>0.18E</TextValue>
            </TextItem>
          </TextArea>
          <Button>{"<mint.exe>"}</Button>
        </StyledMintButton>
      </Hexify>
    </Container>
  );
};

export default MintButton;
