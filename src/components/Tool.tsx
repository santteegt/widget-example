import * as React from "react";
import styled from "styled-components";
import { SSIcon, SSDescription, SSubtitle } from "./common";
import { IToolInfo } from "../helpers/types";
// @ts-ignore
// import ToolLogo from "../assets/web3-default.svg";
// @ts-ignore
import FaucetLogo from "../assets/faucet.svg";
// @ts-ignore
import BridgeLogo from "../assets/bridge.svg";
// @ts-ignore
import UniswapLogo from "../assets/uniswap.svg";
// @ts-ignore
import AirswapLogo from "../assets/airswap.png";
// @ts-ignore
import AssetLogo from "../assets/dataAssets.svg";
// @ts-ignore
import SettingsLogo from "../assets/settings.svg";

const tools: IToolInfo[] = [
    {
        name: "Faucet",
        description: "Get Network Tokens",
        logo: FaucetLogo
    },
    {
        name: "Token Bridge",
        description: "Move OCEAN Ethereum <==> POA",
        logo: BridgeLogo
    },
    {
        name: "Uniswap",
        description: "Decentralized tokens exchange",
        logo: UniswapLogo
    },
    {
        name: "Airswap Instant",
        description: "Instant token trading",
        logo: AirswapLogo
    },
    {
        name: "My Data Assets",
        description: "Your datasets in the marketplace",
        logo: AssetLogo
    },
    {
        name: "Settings",
        description: "Widget Settings",
        logo: SettingsLogo
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
  background-color: #1187c8;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  @media screen and (max-width: 768px) {
    padding: 0.5vw;
  }
`;

const STool = styled.div`
  width: 50%;
  padding: 5px;
  font-size: 11px;
  float: left;
  cursor: pointer;
  /* border: 1px solid rgba(195, 195, 195, 0.14); */
  @media (hover: hover) {
    &:hover ${SToolContainer} {
      background-color: #23a3ea;
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
