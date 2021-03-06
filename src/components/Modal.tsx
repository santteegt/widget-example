import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import Providers from "./Providers";
import { Widget } from '../core/context';
import {
  SimpleFunction,
  // IProviderCallback
} from "../helpers/types";

declare global {
  // tslint:disable-next-line
  interface Window {
    ethereum: any;
    web3: any;
    updateModal: any;
  }
}

interface ILightboxStyleProps {
  show: boolean;
  offset: number;
  opacity?: number;
}

const SLightbox = styled.div<ILightboxStyleProps>`
  transition: opacity 0.1s ease-in-out;
  text-align: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin-left: -50vw;
  top: ${({ offset }) => (offset ? `-${offset}px` : 0)};
  left: 50%;
  z-index: 2;
  will-change: opacity;
  background-color: ${({ opacity }) => {
    let alpha = 0.4;
    if (typeof opacity === "number") {
      alpha = opacity;
    }
    return `rgba(0, 0, 0, ${alpha})`;
  }};
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    box-sizing: border-box !important;
  }
`;

interface IModalContainerStyleProps {
  show: boolean;
}

const SModalContainer = styled.div<IModalContainerStyleProps>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`;

const SHeader = styled.div`
  width: 100%;
  background-color: #2a2d47;
  padding: 10px;
  text-align: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  font-size: 12px;
  color: #fff;
`;

const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SClose = styled.a`
  position: absolute;
  top: 0px;
  right: 10px;
  color: #fff;
  margin: 8px auto;

  &:hover {
      color: #fff;
  }
`;

interface IModalCardStyleProps {
  show: boolean;
  maxWidth?: number;
}

const SModalCard = styled.div<IModalCardStyleProps>`
  position: absolute;
  width: 100%;
  background-color: #2d2b83;
  border-radius: 12px;
  margin: 10px;
  padding: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};

  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "320px")};
  min-width: fit-content;

  top: 0px;
  right: 0px;

  @media screen and (max-width: 768px) {
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "80%")};
  }
`;

interface IModalProps {
  // providers: IProviderCallback[];
  connectBurner?: () => any;
  connectWallet?: () => any;
  onClose: SimpleFunction;
  resetState: SimpleFunction;
  lightboxOpacity: number;
}

interface IModalState {
  show: boolean;
  lightboxOffset: number;
  loggedIn: boolean;
  loading: boolean;
  publishingStep: number;
}

const INITIAL_STATE: IModalState = {
  show: false,
  lightboxOffset: 0,
  loggedIn: false,
  loading: true,
  publishingStep: 0
};

export default class Modal extends React.Component<IModalProps, IModalState> {

  constructor(props: IModalProps) {
    super(props);
    this.logIn.bind(this);
    window.updateModal = async (state: IModalState) => {
      this.setState(state);
    };
  }
  public static propTypes = {
    // providers: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    lightboxOpacity: PropTypes.number.isRequired
  };

  public lightboxRef?: HTMLDivElement | null;
  public mainModalCard?: HTMLDivElement | null;

  public state: IModalState = {
    ...INITIAL_STATE
  };

  public componentDidMount() {
    console.log('CONTEXT on Modal', this.context)
  }

  public componentDidUpdate(prevProps: IModalProps, prevState: IModalState) {
    if (this.lightboxRef) {
      const lightboxRect = this.lightboxRef.getBoundingClientRect();
      const lightboxOffset = lightboxRect.top > 0 ? lightboxRect.top : 0;

      if (
        lightboxOffset !== INITIAL_STATE.lightboxOffset &&
        lightboxOffset !== this.state.lightboxOffset
      ) {
        this.setState({ lightboxOffset });
      }
    }
  }

  logIn = (loggedIn: boolean) => {
      // let interv;
      this.setState({loggedIn}, () => console.log('LogIn', this.state.loggedIn));
      if (!loggedIn) {
        this.context.logout();
      }
  }

  nextStep = () => {
      let next = this.state.publishingStep + 1
      this.setState({publishingStep: next})
  }

  connectWallet = () => {

  }

  public render = () => {
    const { show, lightboxOffset } = this.state;
    const { onClose, lightboxOpacity } = this.props;

    return (
      <SLightbox
        offset={lightboxOffset}
        opacity={lightboxOpacity}
        ref={c => (this.lightboxRef = c)}
        show={show}
      >
        <SModalContainer show={show}>
          <SHitbox onClick={onClose} />
          <SModalCard
            show={show}
            maxWidth={320}
            ref={c => (this.mainModalCard = c)}
          >
            <SHeader>Modal Widget Example</SHeader>
            <SClose onClick={onClose} href={"#"}>X</SClose>
            <Providers onLogIn={() => console.log('click')} connectBurner={() => {}} connectWallet={() => {}}/>


          </SModalCard>
        </SModalContainer>
      </SLightbox>
    );
  };


}

Modal.contextType = Widget;
