import styled from "styled-components";
import { CircleChart } from "../components/CircleChart";

export function UserTopTags() {
  return (
    <UserTopTagsWrapper>
      <CircleChart progress={80} size={88} caption={"Java"} theme="primary" />
      <CircleChart progress={24} size={88} caption={"JavaScript"} />
      <CircleChart progress={30} size={88} caption={"Scrum"} />
    </UserTopTagsWrapper>
  );
}

const UserTopTagsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`;
