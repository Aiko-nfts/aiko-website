import styled from "styled-components";
import Socials from "./Socials";

const StyledStickySocials = styled.div`
  display: flex;
  position: fixed;
  top: 7rem;
  left: 7rem;
  z-index: 30;
`;

const StickySocials = () => {
  return (
    <StyledStickySocials>
      <Socials index={1} />
    </StyledStickySocials>
  );
};

export default StickySocials;
