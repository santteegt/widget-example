import * as React from "react";
import styled from "styled-components";
import { SSIcon, SSDescription, SSubtitle } from "./common";
// @ts-ignore
import ToolLogo from "../assets/web3-default.svg";
import { IToolInfo } from "../helpers/types";

const tools: IToolInfo[] = [
    {
        name: "Faucet",
        description: "Get Network Tokens",
        logo: ToolLogo
    },
    {
        name: "Bridge",
        description: "Move your OCEAN tokens back and forth Ethereum and POA",
        logo: ToolLogo
    },
    {
        name: "Uniswap",
        description: "Decentralized tokens exchange",
        logo: ToolLogo
    },
    {
        name: "Airswap Instant",
        description: "Intuitive token trading with instant access to liquidity",
        logo: ToolLogo
    },
    {
        name: "Publish Dataset",
        description: "Make your data available in the marketplace",
        logo: ToolLogo
    },
    {
        name: "Settings",
        description: "Widget Settings",
        logo: ToolLogo
    },
]

export function getToolInfoByName(name: string | null): IToolInfo {
  let result;

  if (name) {
    const matches = tools.filter(tool => tool.name === name);
    if (matches.length) {
      result = matches[0];
    }
  }
  return result;
}

const SToolContainer = styled.div`
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  @media screen and (max-width: 768px) {
    padding: 0.5vw;
  }
`;

const STool = styled.div`
  width: 50%;
  padding: 8px;
  font-size: 11px;
  float: left;
  cursor: pointer;
  /* border: 1px solid rgba(195, 195, 195, 0.14); */
  @media (hover: hover) {
    &:hover ${SToolContainer} {
      background-color: rgba(255, 255, 255, .9);;
    }
  }
`;


interface IToolProps {
  name: string | null;
  onClick: () => void;
}

const Tool = (props: IToolProps) => {
  const { name, onClick } = props;
  const toolInfo = getToolInfoByName(name);
  return (
    <STool onClick={onClick} >
      <SToolContainer>
        <SSIcon>
          <img src={toolInfo.logo} alt={toolInfo.name} />
        </SSIcon>
        <SSubtitle>{toolInfo.name}</SSubtitle>
        <SSDescription>{toolInfo.description}</SSDescription>
      </SToolContainer>
    </STool>
  );
};

export default Tool;
