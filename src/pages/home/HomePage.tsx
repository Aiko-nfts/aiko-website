import styled from "styled-components";
import StickySocials from "../../components/StickySocials";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import RoadmapSection from "./RoadmapSection";
import StorySection from "./StorySection";
import TeamSection from "./TeamSection";

const StyledHomePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const HomePage = () => {
  return (
    <StyledHomePage>
      <StickySocials />
      <HeroSection />
      <GallerySection />
      <StorySection />
      <RoadmapSection />
      <TeamSection />
    </StyledHomePage>
  );
};

export default HomePage;
