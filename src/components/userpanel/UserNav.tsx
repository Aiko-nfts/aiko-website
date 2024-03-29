import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import UserProfile from "./UserProfile";

import UserNavIcon, { NavIconType } from "./UserNavIcon";

import logo2 from "../../assets/svgs/aikomeepologo.svg";

import map from "../../assets/svgs/map.svg";
import lobby from "../../assets/svgs/lobby.svg";
import lore from "../../assets/svgs/lore.svg";
import news from "../../assets/svgs/news.svg";

const navIcons: NavIconType[] = [
  {
    image: map,
    name: "A:\\Map",
    color: "#FCC453",
  },
  {
    image: lore,
    name: "A:\\Lore",
    color: "#F7E9A1",
  },
  {
    image: news,
    name: "A:\\News",
    color: "#FCC453",
  },
  {
    image: lobby,
    name: "A:\\Lobby",
    color: "#F7E9A1",
  },
];

const rotate = keyframes`
   0% { transform: rotateY(0deg) rotateX(0deg); }
   100% { transform: rotateY(360deg); }
`;

const NavContainer = styled.div`
  width: 100%;
  z-index: 2;
`;

const NavBackground = styled.div`
  background-color: #dfe7f4;
  height: 10%;
  width: 100%;
  position: absolute;
`;

const NavBackgroundDecor = styled.div`
  background-color: #dfe7f4;
  height: 10%;
  width: 20%;
  position: fixed;
`;

const Triangle = styled.span`
  position: absolute;
  top: 0;
  height: 20%;
  width: 13.333%;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: #dfe7f4;
  clip-path: polygon(
    0% 0px,
    /* top left */ 0% 0%,
    /* top right */ 100% 0%,
    /* bottom right */ 0% 100%,
    /* bottom left */ 0% 100% /* bottom left */
  );
`;

const Stripes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: #658ac7;
  clip-path: polygon(
    15% 0px,
    /* top left */ 70% 0%,
    /* top right */ 100% 100%,
    /* bottom right */ 100% 100%,
    /* bottom left */ 45% 100% /* bottom left */
  );

  &:before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: #f0a460;
    clip-path: polygon(
      30% 0px,
      /* top left */ 60% 0%,
      /* top right */ 92% 100%,
      /* bottom right */ 100% 100%,
      /* bottom left */ 50% 100% /* bottom left */
    );
  }
  &:after {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;

    background-color: #ffd36a;
    clip-path: polygon(
      0% 0,
      /* top left */ 35% 0%,
      /* top right */ 65% 100%,
      /* bottom right */ 45% 100%,
      /* bottom left */ 15% 0% /* bottom left */
    );
  }
`;

const NavLogo = styled.img`
  position: relative;
  padding-left: 2vh;
  margin-left: 1vh;
  margin-right: 2vh;
  top: 2rem;
  width: 12%;
  animation: ${rotate} 10s infinite;
`;

const NavIconContainer = styled.div`
  z-index: 1;
  display: inline-flex;
  position: absolute;
  justify-content: space-between;
  background-color: #729abf;
  width: 34vh;
  height: fit-content;
  top: 2.5vh;
  border-radius: 2rem;
`;

const NavWalletRewardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const HoverText = styled.div`
  white-space: nowrap;
  z-index: 2;
  position: absolute;
  color: #393939;
  padding: 1rem;
  background-color: #ffffff;
  font-size: 1.5vh;
  opacity: ${(props: NavProps) => (props.visible ? 1 : 0)};
  transition: opacity 0.25s ease;
  clip-path: var(--notched-sm);
  display: ${(props: NavProps) => (props.visible ? "static" : "none")};
`;

interface NavProps {
  active?: boolean;
  account?: any;
  visible?: any;
}

const UserNav = () => {
  const [pos, setPos] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const [visible, setVisible] = useState(false);

  const handleClick = (event: any) => {
    setPos({ left: event.clientX + 50, top: event.clientY });
    setVisible(true);
  };

  useEffect(() => {
    let timeoutId: any;
    if (visible) {
      timeoutId = setTimeout(() => setVisible(false), 3000);
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [visible]);

  const handleMouseMove = (event: any) => {
    const mouse_x = event.clientX;
    const mouse_y = event.clientY;
    const window_width = window.innerWidth;
    const is_on_right_edge = mouse_x > window_width - 320;

    if (is_on_right_edge) {
      setPos({ left: mouse_x - 250, top: mouse_y });
    } else {
      setPos({ left: mouse_x + 50, top: mouse_y });
    }
  };

  return (
    <NavContainer>
      <HoverText visible={visible} style={{ top: pos.top, left: pos.left }}>
        Currently a Work in Progress!
      </HoverText>

      <Triangle />
      <NavBackground>
        <NavBackgroundDecor>
          <Stripes />
        </NavBackgroundDecor>
      </NavBackground>

      <NavLogo src={logo2} />

      <NavIconContainer onClick={handleClick}>
        {navIcons.map((navIcon: NavIconType, id: number) => (
          <UserNavIcon key={id} navIcon={navIcon} />
        ))}
      </NavIconContainer>

      <NavWalletRewardsContainer>
        <UserProfile />
      </NavWalletRewardsContainer>
    </NavContainer>
  );
};

export default UserNav;
