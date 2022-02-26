import { useState } from "react";
import styled from "styled-components";

import chase from "../../assets/team-members/chase.jpg";
import AikoHex from "../../components/AikoHex";

const aikos: string[] = [
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
  chase,
];

const StyledGallerySlide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  /* overflow: hidden; */
`;

const Aiko = styled.div`
  position: absolute;
  top: ${(props: AikoProps) =>
    props.index % 3 === 0
      ? "0"
      : (props.index + 2) % 3 === 0
      ? "calc((100vh - 18rem - 27rem) / 4)"
      : "calc((100vh - 18rem - 27rem) / 2)"};
  left: ${(props: AikoProps) =>
    `calc(((100vh - 18rem - 27rem) / 2) * ${Math.floor(props.index / 3)} - ${
      (props.index + 2) % 3 === 0 ? "((100vh - 18rem - 27rem) / 4)" : "0px"
    })`};
  height: calc((100vh - 18rem - 27rem) / 2);
  width: calc((100vh - 18rem - 27rem) / 2);
  cursor: pointer;
`;

const AikoShadow = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: blur(35px);
`;

interface AikoProps {
  index: number;
  active: boolean;
}

const AikoContainer = styled.div`
  height: 100%;
  transition: all 0.5s;
  filter: ${(props: AikoProps) =>
    props.active ? "none" : "saturate(0) contrast(0.2) brightness(1.8)"};

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, white, transparent, transparent);
    z-index: 300;
    opacity: ${(props: AikoProps) => (props.active ? "0" : "1")};
    clip-path: var(--hex);
  }
`;

const GallerySlide = () => {
  const [active, setActive] = useState(6);

  return (
    <StyledGallerySlide>
      {aikos.map((aiko: string, index: number) => (
        <Aiko
          index={index}
          active={index === active}
          onMouseEnter={() => setActive(index)}
          style={{ zIndex: index === active ? 20 : index }}
        >
          <AikoShadow />
          <AikoContainer active={index === active} index={index}>
            <AikoHex image={aiko} />
          </AikoContainer>
        </Aiko>
      ))}
    </StyledGallerySlide>
  );
};

export default GallerySlide;