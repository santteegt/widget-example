import * as React from "react";
import styled from "styled-components";
// @ts-ignore
import LoadingGif from "../assets/loading.gif";

const SContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 50px 0;
`;

class Loading extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { setLoading } = this.props;
        setTimeout(() => setLoading(false), 1500)
    }

    render() {
        return (
            <SContainer>
                <img src={LoadingGif} />
            </SContainer>
        )
    }
}


export default Loading;
