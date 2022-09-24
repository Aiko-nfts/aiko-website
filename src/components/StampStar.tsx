import styled from "styled-components";

import onStar from "../assets/stamps/on-star.svg";
import offStar from "../assets/stamps/off-star.svg";

const StyledStampStar = styled.img`
  display: flex;
  height: 3.1rem;
`;

interface Props {
  on: boolean;
}

const StampStar = ({ on }: Props) => {
  return <StyledStampStar src={on ? onStar : offStar} />;
};

export default StampStar;
