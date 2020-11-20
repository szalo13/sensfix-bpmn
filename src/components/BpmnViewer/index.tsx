import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Modeler from 'bpmn-js/lib/Modeler';
// Import Bpmn diagram styles
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

interface IBpmnViewerPropTypes {
  url: string,
}

const ViewerWrapper = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
`;

const BpmnContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const PropertiesPanel = styled.div``;

/**
 * Modeler config
 */
let bpmnModeler: any | null = null;

const BpmnViewer = ({
  url
}: IBpmnViewerPropTypes) => {
  const [viewerInitialized, setViewerInitialized] = useState(false);

  useEffect(() => {
    if (!viewerInitialized) {
      initViewer();
    }
  }, [viewerInitialized]);

  const initViewer = () => {
    if (!viewerInitialized) {
      setViewerInitialized(true);
      bpmnModeler = new Modeler({
        container: '#bpmn-container',
      });
      loadFromUrl(url);
    }
  }

  const setDiagram = (xml: string) => {
    if (bpmnModeler) {
      console.log('here');
      bpmnModeler.importXML(xml, (err: any) => {
        console.log(err);
      });
    }
  }

  const loadFromUrl = (url: string) => {
    fetch(url)
      .then(response => response.text())
      .then(text => setDiagram(text))
      .catch(err => console.log(err));
  }

  return (
    <ViewerWrapper>
      <BpmnContainer id="bpmn-container" />
      <PropertiesPanel id="bpmn-properties-panel" />
    </ViewerWrapper>
  )
}

export default BpmnViewer;
