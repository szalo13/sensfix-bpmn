import React from 'react'
import styled from 'styled-components';
import ReactBpmn from 'react-bpmn';

interface IBpmnViewerPropTypes {
  
}

const ViewerWrapper = styled.div``;

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
