import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { useEthers, useLookupAddress } from "@usedapp/core";

import { useBalanceOf } from "../../contracts/views";

import {
  setShowingNfts,
  selectGlobalNft,
  setGlobalAccount,
  selectHasAikos,
  setStampsHeld,
  selectStampsHeld,
  setMuteAudio,
  selectMuteAudio,
} from "../../state/uiSlice";

import check from "../../assets/placeholders/check.png";

import UserNavSocial, { SocialIconType } from "./UserNavSocial";

import JumboStampSystem from "./JumboStampSystem";

import meepocoin from "../../assets/userpanel/meepocoin.png";
import mute from "../../assets/userpanel/mute.png";
import unmute from "../../assets/userpanel/unmute.png";
import star from "../../assets/userpanel/stampstar.png";
import baseaiko from "../../assets/userpanel/aikopfp.gif";

import opensea from "../../assets/svgs/opensea.svg";
import twitter from "../../assets/svgs/twitter.svg";
import home from "../../assets/userpanel/homewebsiteicon.png";
import medium from "../../assets/svgs/medium.svg";

import cursorhover from "../../assets/userpanel/cursorhover.png";

import soundHoverTab from "../../assets/userpanel/Market_SFX_-_TAB_HOVER.wav";
import soundClickTab from "../../assets/userpanel/Market_SFX_-_TAB_PRESS.wav";

const socialIcons: SocialIconType[] = [
  {
    image: twitter,
    name: "Twitter",
    link: "https://twitter.com/aikovirtual",
  },
  {
    image: opensea,
    name: "OpenSea",
    link: "https://opensea.io/collection/aikovirtual",
  },
  {
    image: home,
    name: "Homepage",
    link: "https://aikovirtual.com/",
  },
  {
    image: medium,
    name: "Medium",
    link: "https://medium.com/@aikovirtual",
  },
];

const NavUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const NavUserWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  /* background-color: black; */
  align-items: flex-end;
`;

const NavUsernameContainer = styled.div`
  position: relative;
  top: 3rem;
  right: 2rem;
  background-color: #8ca3e7;
  clip-path: var(--notched-sm);
  padding: 1rem 3rem 1rem 1rem;
  text-align: left;
  width: fit-content;
  height: 4rem;
  overflow: visible;
  margin-left: auto;
  z-index: 1;
  opacity: ${(props: NavProps) => (props.active ? "1" : "0")};
  transition: all ease 0.3s;
`;

const PostNavUsername = styled.span`
  font-size: 2.5rem;
  color: white;
  text-shadow: -2px 2px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
  transition: all ease 0.3s;
`;

const PreNavWallet = styled.button`
  width: fit-content;
  cursor: url(${cursorhover}), auto;
  background-color: #fff4cb;
  clip-path: var(--notched-sm);
  padding: 4rem 4rem 1rem 2rem;
  transform: ${(props: NavProps) =>
    props.active ? "translate(10%, 0px)" : "translate(60%, 0)"};
  transition: all ease 0.3s;
`;

const PreNavWalletText = styled.p`
  transition: all ease 0.3s;
  font-size: 2rem;
  opacity: ${(props: NavProps) => (props.active ? "1" : "0")};
`;

const PostNavWallet = styled.button`
  cursor: url(${cursorhover}), auto;
  background-color: #fff4cb;
  clip-path: var(--notched-sm);
  padding: 4rem 4rem 1rem 2rem;
  transform: translate(10%, 0px);
  transition: all ease 0.3s;
`;

const PostNavWalletText = styled.p`
  transition: all ease 0.3s;
  font-size: 2rem;
`;

const MeeposCollected = styled.div`
  clip-path: var(--notched-sm);
  width: 100%;
  display: flex;
  background-color: #619ee2;
  justify-content: space-around;
  margin-top: 1rem;
  padding: 1rem 1rem 0.25rem 1rem;
`;

const MeeposCollectedStar = styled.img`
  position: relative;
  bottom: 0.5rem;
  width: 25px;
`;

const StampsCollected = styled.div`
  clip-path: var(--notched-sm);
  width: 100%;
  display: flex;
  background-color: #ffcb5a;
  justify-content: space-around;
  margin-top: 1rem;
  padding: 1rem 1rem 0.25rem 1rem;
`;

const StampsCollectedText = styled.p`
  font-size: 3rem;
  color: white;
  flex: 1 0;
`;

const StampsCollectedStar = styled.img`
  position: relative;
  bottom: 0.5rem;
  width: 25px;
`;

const DecorHorizontalContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const DecorHorizontalDots = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 30px;
  margin-right: 1rem;
  background-color: #b2bcc3;
`;

const DecorHorizontalDots2 = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 30px;
  margin-right: 1rem;
  background-color: #b2bcc3;
`;
const DecorHorizontalDots3 = styled.span`
  width: 100%;
  height: 1.5rem;
  border-radius: 30px;
  background-color: #b2bcc3;
`;

const NavUserPfpContainer = styled.div`
  margin-top: 2rem;

  cursor: url(${cursorhover}), auto;
  clip-path: var(--notched-md);
  background-color: #393939;
  padding: 0.25rem 0.25rem 1.25rem 0.25rem;
  transition: all ease 0.3s;
  position: relative;
`;

const Overlay = styled.div`
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(229, 255, 0, 0.5);
    transition: all 0.3s linear;
    opacity: ${(props: NavProps) => (props.active ? 1 : 0)};
    transition: 0.3s ease-in-out;
  }
`;

const NavUserPfp = styled.div`
  filter: opacity(90%);
  filter: hue-rotate(10deg);
  clip-path: var(--notched-md);
  background-image: url(${(props) => props.pfp});
  width: 150px;
  height: 150px;
  background-size: 150px 150px;
  transition: all cubic-bezier(0.16, -0.05, 0.83, 1.06) 0.3s;

  &:hover {
    border: ${(props: NavProps) =>
      props.active ? "2px solid white" : "2px solid transprent"};
  }
`;

const NavUserStats = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavUserSocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: drop-shadow(1px 1px 3px #f1e64f) drop-shadow(-1px 1px 3px #f1e64f)
    drop-shadow(1px -1px 3px #f1e64f) drop-shadow(-1px -1px 3px #f1e64f);
  opacity: ${(props: NavProps) => (props.active ? 1 : 0)};
  transition: 0.3s ease-in-out;
  opacity: ${(props: NavProps) => (props.active ? 1 : 0)};
  transform: ${(props: NavProps) =>
    props.active ? "translate(0, 0)" : "translate(0, 40px)"};
`;

const OverlayCheck = styled.img`
  transform: translate(0, 40px);
  transition: all 0.2s cubic-bezier(1, 0, 0, 1);
  width: 50px;
  width: 50px;
  margin-bottom: 6px;
  filter: invert(1) drop-shadow(1px 1px 0 black) drop-shadow(-1px 1px 0 black)
    drop-shadow(1px -1px 0 black) drop-shadow(-1px -1px 0 black);
  opacity: ${(props: NavProps) => (props.active ? 1 : 0)};
  opacity: ${(props: NavProps) => (props.active ? 1 : 0)};
  transition: 0.3s ease-in-out;
  opacity: ${(props: NavProps) => (props.active ? 1 : 0)};
  transform: ${(props: NavProps) =>
    props.active ? "translate(0, 0)" : "translate(0, 40px)"};
`;

const OverlayText = styled.div`
  transform: translate(0, 40px);
  transition: all 0.2s cubic-bezier(1, 0, 0, 1);
  opacity: ${(props: NavProps) => (props.active ? 1 : 0)};
  transform: ${(props: NavProps) =>
    props.active ? "translate(0, 0)" : "translate(0, 40px)"};
  &:before {
    content: "Change NFT";
    font-size: 2.25rem;
    text-shadow: -3px -3px 0 #000, 0 -3px 0 #000, 3px -3px 0 #000, 3px 0 0 #000,
      3px 3px 0 #000, 0 3px 0 #000, -3px 3px 0 #000, -3px 0 0 #000;
    color: white;
    position: relative;
    z-index: 100;
  }
`;

const NavUserPfpOverall = styled.div`
  position: relative;
`;

const MuteContainer = styled.div`
  background-color: #363636;
  padding: 0.25rem;
  clip-path: var(--notched-xsm);
  bottom: 0;
  position: absolute;
  margin-left: -55px;
  margin-bottom: 30px;
  cursor: url(${cursorhover}), auto;
`;

const MuteButton = styled.img`
  clip-path: var(--notched-xsm);
  width: 35px;
  height: 35px;
  padding: 0.75rem;
  transition: all 0.3s ease;
  background-color: ${(props: NavProps) =>
    props.muted ? "#fcea9e" : "#b2bcc3"};
  &:hover {
    opacity: 0.5;
  }
`;

const HoverText = styled.div`
  white-space: nowrap;
  z-index: 2;
  position: absolute;
  color: #2a2a2a;
  padding: 1rem;
  background-color: #ffcb5a;
  font-size: 1.5rem;
  opacity: ${(props: NavProps) => (props.visible ? 1 : 0)};
  transition: opacity 0.25s ease;
  clip-path: var(--notched-sm);
  display: ${(props: NavProps) => (props.visible ? "static" : "none")};
`;

interface NavProps {
  active?: boolean;
  ens?: boolean;
  account?: any;
  pfp?: string;
  muted?: boolean;
  visible?: any;
}

const UserProfile = () => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [visible, setVisible] = useState(false);

  const [hoverActive, setHoverActive] = useState(false);
  const [pfpHoverActive, setPfpHoverActive] = useState(false);
  const nftPfp = useSelector(selectGlobalNft);
  const hasAikos = useSelector(selectHasAikos);
  const stampsNum = useSelector(selectStampsHeld);
  const muteAudio = useSelector(selectMuteAudio);

  const { activateBrowserWallet, account } = useEthers();
  const { ens } = useLookupAddress(account);
  const dispatch = useDispatch();

  const [stampsHeld, setStampsNum] = useState(0);

  const audioHoverTab = useRef<HTMLAudioElement>(null);
  const audioClickTab = useRef<HTMLAudioElement>(null);

  const handleClick = (event: any) => {
    setLeft(event.clientX - 490);
    setTop(event.clientY - 40);
    setVisible(true);
    console.log(event.clientX + 50, event.clientY);
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
    const mouse_x = event.clientX - 540;
    const mouse_y = event.clientY - 40;
    const window_width = window.innerWidth;
    const is_on_right_edge = mouse_x > window_width - 320;

    if (is_on_right_edge) {
      setLeft(mouse_x - 650);
      setTop(mouse_y);
    } else {
      setLeft(mouse_x + 50);
      setTop(mouse_y);
    }
  };

  const stamps = useBalanceOf();

  useEffect(() => {
    try {
      if (stamps) {
        const stampsNums = stamps
          ? stamps.reduce((total, current) => total + current, 0)
          : 0;
        dispatch(setStampsHeld(stampsNums));
        setStampsNum(stampsNum);
      }
    } catch (err) {
      console.log(err, "UserProfile");
    }
  }, [stamps]);

  const playHoverAudio = () => {
    if (audioHoverTab.current && muteAudio) {
      audioHoverTab.current.currentTime = 0;
      audioHoverTab.current.play();
    }
  };

  const playClickAudio = () => {
    if (audioClickTab.current && muteAudio) {
      audioClickTab.current.currentTime = 0;
      audioClickTab.current.play();
    }
  };

  useEffect(() => {
    if (account) {
      dispatch(setGlobalAccount(account));
    }
  }, [account]);

  return (
    <NavUserContainer>
      <audio ref={audioHoverTab} src={soundHoverTab}>
        <track kind="captions" />
      </audio>
      <audio ref={audioClickTab} src={soundClickTab}>
        <track kind="captions" />
      </audio>
      <HoverText visible={visible} style={{ top, left }}>
        Looks like you don't own an Aiko!
      </HoverText>

      <NavUserWalletContainer>
        {ens ? (
          <NavUsernameContainer active={!!ens}>
            <PostNavUsername
              onError={(e) => {
                const target = e.target as HTMLSpanElement;
                target.textContent = "Generating User...";
              }}
            >{`A:\\ ${ens.substr(0, ens.length - 4)}`}</PostNavUsername>
          </NavUsernameContainer>
        ) : (
          <NavUsernameContainer active={hoverActive}>
            <PostNavUsername>A:\Welcome</PostNavUsername>
          </NavUsernameContainer>
        )}

        {!account && (
          <PreNavWallet
            onMouseEnter={() => {
              setHoverActive(true);
              playHoverAudio();
            }}
            onMouseLeave={() => setHoverActive(false)}
            active={hoverActive}
            onClick={() => {
              activateBrowserWallet();

              playClickAudio();
            }}
          >
            {/* 0x1205...2aF4D */}
            <PreNavWalletText active={hoverActive}>
              Connect Wallet
            </PreNavWalletText>
          </PreNavWallet>
        )}

        {account && (
          <PostNavWallet>
            <PostNavWalletText>
              {`${account.substr(0, 6)}\u2026${account.substr(
                account.length - 5
              )}`}
            </PostNavWalletText>
          </PostNavWallet>
        )}

        <JumboStampSystem />
      </NavUserWalletContainer>

      <NavUserStats>
        <NavUserPfpOverall>
          <NavUserPfpContainer>
            {!account && (
              <NavUserPfp
                active={!!account}
                onMouseEnter={() => {
                  setHoverActive(true);
                  playHoverAudio();
                }}
                onMouseLeave={() => setHoverActive(false)}
                onClick={() => {
                  activateBrowserWallet();

                  playClickAudio();
                }}
                pfp={baseaiko}
                // src={baseaiko}
              />
            )}
            {account && (
              <NavUserPfp
                active={!account}
                onClick={(e) => {
                  if (hasAikos) {
                    dispatch(setShowingNfts(true));
                    playClickAudio();
                  } else {
                    handleClick(e);
                    playClickAudio();
                  }
                }}
                pfp={nftPfp}
                // src={nftPfp}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = baseaiko;
                }}
                onMouseEnter={() => {
                  setPfpHoverActive(true);
                  playHoverAudio();
                }}
                onMouseLeave={() => {
                  setPfpHoverActive(false);
                }}
              >
                <Overlay active={pfpHoverActive} />
                <OverlayContainer active={pfpHoverActive}>
                  <OverlayCheck src={check} active={pfpHoverActive} />
                  <OverlayText active={pfpHoverActive} />
                </OverlayContainer>
              </NavUserPfp>
            )}
          </NavUserPfpContainer>
          <MuteContainer>
            <MuteButton
              muted={muteAudio}
              src={muteAudio === false ? mute : unmute}
              onClick={() => dispatch(setMuteAudio(!muteAudio))}
            />
          </MuteContainer>
        </NavUserPfpOverall>

        <MeeposCollected>
          {account && <StampsCollectedText>0</StampsCollectedText>}
          <MeeposCollectedStar src={meepocoin} />
        </MeeposCollected>

        <StampsCollected>
          {account && (
            <StampsCollectedText>{`${stampsHeld}/12`}</StampsCollectedText>
          )}

          <StampsCollectedStar src={star} />
        </StampsCollected>

        <DecorHorizontalContainer>
          <DecorHorizontalDots />
          <DecorHorizontalDots2 />
          <DecorHorizontalDots3 />
        </DecorHorizontalContainer>

        <NavUserSocialsContainer>
          {socialIcons.map((socialIcon: SocialIconType) => (
            <UserNavSocial key={socialIcon.name} socialIcon={socialIcon} />
          ))}
        </NavUserSocialsContainer>
      </NavUserStats>
    </NavUserContainer>
  );
};

export default UserProfile;