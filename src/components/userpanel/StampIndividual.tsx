import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { useEthers } from "@usedapp/core";
import {
  selectShowingRewards,
  setShowingRewards,
  selectShowingStamp,
  setShowingStamp,
} from "../../state/uiSlice";
import star from "../../assets/placeholders/star.png";
import arrow from "../../assets/userpanel/arrow.png";

import holder from "../../assets/userpanel/holder.png";
import creator from "../../assets/userpanel/creator.png";
import supporter from "../../assets/userpanel/supporter.png";
import cursorhover from "../../assets/userpanel/cursorhover.png";
import explorer from "../../assets/userpanel/explorer.png";
import explorer1 from "../../assets/userpanel/explorer1.png";
import explorer2 from "../../assets/userpanel/explorer2.png";
import explorer3 from "../../assets/userpanel/explorer3.png";

import ButtonBlue from "./ButtonBlue";
import StampEdition, { EditionType } from "./StampEdition";
import StampEditionJumbo, { EditionJumboType } from "./StampEditionJumbo";

export interface IndividualStampType {
  name: string;
  image: string;
  id: number;
  character: string;
  required: number;
  edition: [
    {
      image: string;
      name: string;
      collected: boolean;
    },
    {
      image: string;
      name: string;
      collected: boolean;
    },
    {
      image: string;
      name: string;
      collected: boolean;
    }
  ];
  tier1: boolean;
  tier2: boolean;
  tier3: boolean;
  visible: boolean;
  show?: () => void;
}

const editionJumbo: EditionJumboType[] = [
  {
    image: explorer,
    name: "Mimi",
    character: "Mini",
    required: 3,
    tier1: true,
    tier2: false,
    tier3: false,
  },
];

const edition: EditionType[] = [
  {
    image: "",
    name: "",
    collected: false,
  },
  {
    image: "",
    name: "",
    collected: false,
  },
  {
    image: "",
    name: "",
    collected: false,
  },
];

const Container = styled.div`
  z-index: 2;
  display: ${(props: StampIndividualProps) => (props.show ? "" : "none")};

  /* display: ${(props: StampIndividualProps) => (props.show ? "" : "none")}; */
`;

const IndividualStampTab = styled.div`
  background-color: blue;
  clip-path: var(--notched-md-tp);
`;

const StampTabRow = styled.div`
  display: flex;
  align-items: center;
`;

const StampTitle = styled.h1`
  font-size: 4rem;
  font-weight: 400;
  color: white;
  margin-left: 4rem;
  text-shadow: -3px 3px 0 #000, 2px 2px 0 #000, 2px -2px 0 #000,
    -2px -2px 0 #000;
  text-transform: uppercase;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const IndividualStampContainer = styled.div`
  background-color: #d8dbe0;
  padding-bottom: 1rem;
  clip-path: var(--notched-md-bt);
`;
const IndividualStampRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StampEditionCol = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;
const StampEditionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
// const StampEdition = styled.div``;

const TextContainer = styled.div`
  clip-path: var(--notched-md);
  background-color: white;
  width: 625px;
  margin: auto;

  &after: {
  }
`;

const TextShadow = styled.div`
  background-color: #494a4b;
  padding: 0.25rem 0.25rem 0.25rem 0.25rem;
`;

const StampText = styled.p`
  font-family: video-cond, serif;
  font-weight: 400;
  font-style: normal;
  background-color: white;
  position: relative;
  font-size: 2.25rem;
  letter-spacing: 0;
  padding: 1.5rem 1.5rem;
  clip-path: var(--notched-md);
  line-height: 1.25;
  overflow: hidden;
  font-weight: 400;
  color: #4a4b4c;
`;

interface StampIndividualProps {
  active?: boolean;
  show: boolean;
}

interface Props {
  stampIndividual: IndividualStampType;
}

const StampIndividual = ({ stampIndividual }: Props) => {
  const dispatch = useDispatch();
  const [hoverActive, setHoverActive] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <Container show={stampIndividual.visible}>
      <IndividualStampTab>
        <StampTabRow>
          <StampTitle>{stampIndividual.name}</StampTitle>
          <ButtonContainer>
            <ButtonBlue
              content="Rewards"
              close={() => dispatch(setShowingRewards(true))}
            />
            <ButtonBlue
              content="<"
              close={() => {
                dispatch(setShowingStamp(false));
                stampIndividual.visible = false;
              }}
            />
          </ButtonContainer>
        </StampTabRow>
      </IndividualStampTab>
      <IndividualStampContainer>
        <IndividualStampRow>
          {editionJumbo.map((editionJumbo: EditionJumboType) => (
            <StampEditionJumbo
              key={editionJumbo.name}
              editionJumbo={stampIndividual}
            />
          ))}
          <StampEditionCol>
            <TextContainer>
              <TextShadow>
                <StampText>
                  It's easy to find the Explorer Stamps, but not easy to collect
                  them, you need to be an active member through our community,
                  and explore the events, contests, and much more with youir
                  adventurer friends! <br /> A:\Stay Virtuyal! -Mimi
                </StampText>
              </TextShadow>
            </TextContainer>
            <StampEditionRow>
              {stampIndividual.edition.map((edition: EditionType) => (
                <StampEdition key={edition.name} edition={edition} />
              ))}
            </StampEditionRow>
          </StampEditionCol>
        </IndividualStampRow>
      </IndividualStampContainer>
    </Container>
  );
};

export default StampIndividual;
