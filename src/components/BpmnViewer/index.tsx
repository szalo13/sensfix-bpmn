import React from 'react'
import styled from 'styled-components';
import ReactBpmn from 'react-bpmn';

interface IBpmnViewerPropTypes {
  
}

const ViewerWrapper = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;

  .react-bpmn-diagram-container {
    width: 100%;
    height: 100%;
  }
`;

const BpmnViewer = ({
  
}: IBpmnViewerPropTypes) => {

  const onShown = () => {
    console.log('diagram shown');
  }

  const onLoading = () => {
    console.log('diagram loading');
  }

  const onError = () => {
    console.log('failed to show diagram');
  }

  return (
    <ViewerWrapper>
      <ReactBpmn
        url="diagrams/example.bpmn"
        onShown={ onShown }
        onLoading={ onLoading }
        onError={ onError }
      />
    </ViewerWrapper>
  )
}

export default BpmnViewer;
