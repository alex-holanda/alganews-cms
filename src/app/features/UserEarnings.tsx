import Skeleton from "react-loading-skeleton";

import { useAuth } from "core/hooks";

import { ValueDescriptor } from "../components/ValueDescriptor";

import styled from "styled-components";

export function UserEarnings() {
  const { user } = useAuth();

  if (!user) {
    return (
      <UserEarningsWrapper style={{ height: 123 }}>
        <Skeleton width={150} height={40} />
        <Skeleton width={150} height={40} />
        <Skeleton width={150} height={40} />
        <Skeleton width={150} height={40} />
      </UserEarningsWrapper>
    );
  }

  return (
    <UserEarningsWrapper>
      <ValueDescriptor
        color="primary"
        description="ganhos no mês"
        value={user.metrics.monthlyEarnings}
        isCurrency
      />
      <ValueDescriptor
        color="primary"
        description="ganhos na semana"
        data-testid={"weeklyEarnings"}
        value={user.metrics.weeklyEarnings}
        isCurrency
      />
      <ValueDescriptor
        color="default"
        description="ganhos de sempre"
        value={user.metrics.lifetimeEarnings}
        isCurrency
      />
      <ValueDescriptor
        color="default"
        description="total de palavras"
        value={user.metrics.lifetimeWords}
      />
    </UserEarningsWrapper>
  );
}

const UserEarningsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
