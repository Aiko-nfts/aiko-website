import styled from "styled-components";
import Social from "./Social";
import twitter from "../assets/svgs/twitter.svg";
import discord from "../assets/svgs/discord.svg";
import opensea from "../assets/svgs/opensea.svg";
import { openseaLink, discordLink, twitterLink } from "../app/globals";

interface SocialType {
  icon: string;
  link?: string;
}

const socials: SocialType[] = [
  {
    icon: opensea,
    link: openseaLink,
  },
  {
    icon: discord,
    link: discordLink,
  },
  {
    icon: twitter,
    link: twitterLink,
  },
];

const StyledSocials = styled.div`
  position: fixed;
  transform: translate(0, 0);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
  z-index: 3;

  top: 7rem;
  left: 7rem;

  @media only screen and (max-width: 1400px) {
    top: 3rem;
    left: 3rem;
  }

  @media only screen and (max-width: 600px) {
    top: 1.5rem;
    left: 1.5rem;
  }
`;

const Socials = () => {
  return (
    <StyledSocials>
      {socials.map((social: SocialType, index) => (
        <Social key={index} icon={social.icon} link={social.link} />
      ))}
    </StyledSocials>
  );
};

export default Socials;
