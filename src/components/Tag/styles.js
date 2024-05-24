import styled from "styled-components"

export const Container = styled.span`
  font-size: 12px;
  padding: 12px;
  border-radius: 5px;
  margin-right: 6px;
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
`
