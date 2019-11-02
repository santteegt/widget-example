import styled from "styled-components";

interface IIconStyleProps {
  noShadow?: boolean;
}

export const SIcon = styled.div<IIconStyleProps>`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 50%;
  overflow: ${({ noShadow }) => (noShadow ? "visible" : "hidden")};
  box-shadow: ${({ noShadow }) =>
    noShadow
      ? "none"
      : "0 4px 6px 0 rgba(50, 50, 93, 0.11), 0 1px 3px 0 rgba(0, 0, 0, 0.08), inset 0 0 1px 0 rgba(0, 0, 0, 0.06)"};
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 8.5vw;
    height: 8.5vw;
  }
`;

export const SSIcon = styled.div<IIconStyleProps>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  & img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 8.5vw;
    height: 8.5vw;
  }
`;

export const STitle = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  margin-top: 0.5em;
  color: #fff;
`;

export const SSubtitle = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  margin-top: 0.2em;
`;

export const SDescription = styled.div`
  width: 100%;
  font-size: 14px;
  margin: 0.333em 0;
  color: #eee;
  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
`;

export const SSDescription = styled.div`
  width: 100%;
  font-size: 10px;
  margin: 0.1em 0;
  color: #eee;
  min-height: 30px;
  @media screen and (max-width: 768px) {
    font-size: 2vw;
  }
`;
