import styled from "styled-components";
import Header from "../../components/Header";

import Section from "../../components/Section";
import RoadmapSeason, { RoadmapSeasonType } from "./RoadmapSeason";

import girl from "../../assets/illustrations/roadmap-girl.png";
import charity from "../../assets/svgs/charity.svg";
import airdrop from "../../assets/svgs/airdrop.svg";
import headquarters from "../../assets/svgs/headquarters.svg";
import merch from "../../assets/svgs/merch.svg";
import artists from "../../assets/svgs/artists.svg";
import events from "../../assets/svgs/events.svg";

const roadmap: RoadmapSeasonType[] = [
  {
    number: 1,
    name: "Temporis",
    items: [
      {
        icon: charity,
        header: "Charity",
        body: "Holders will decide between 3 charities to donate for amount of volume traded, charity auctions will continue every season.",
      },
      {
        icon: airdrop,
        header: "Airdrop",
        body: "Will be airdroping exclusing Aiko's for holders.",
      },
      {
        icon: headquarters,
        header: "Headquarters",
        body: "We gonna be creating a space for our team work together full time in Aiko, and preparing the deliveres for Season 2.",
      },
    ],
  },
  {
    number: 2,
    name: "Solutum",
    items: [
      {
        icon: merch,
        header: "Official Merch",
        body: "We gonna be launching our ecommerce for Public and Holders buy our merch and more. Merch will be unique and exclusive such an Aiko is / Holders gonna be receiving exclusive pieces and unique collections.",
      },
      {
        icon: artists,
        header: "Supporting artists",
        body: "We gonna be showing new artists for our community and every single artist we going support will be airdropped for holders.",
      },
      {
        icon: events,
        header: "Events",
        body: "The Aiko brand will be propagated around the world and our community will be a part of this.",
      },
    ],
  },
  {
    number: 3,
    name: "Exodus",
    items: [
      {
        icon: events,
        header: "????",
        body: "??????????",
      },
    ],
  },
];

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 2vw;
  height: 105%;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const RoadmapContainer = styled.div`
  position: relative;
  width: 80rem;
  margin-left: 42vw;
`;

const RoadmapSection = () => {
  return (
    <Section socials logo index={3} bottomPlus>
      <Container>
        <Background src={girl} alt="Roadmap Aiko" />
        <Header>A:\Roadmap</Header>
        <ContentContainer>
          <RoadmapContainer>
            {roadmap.map((season) => (
              <RoadmapSeason season={season} />
            ))}
          </RoadmapContainer>
        </ContentContainer>
      </Container>
    </Section>
  );
};

export default RoadmapSection;
