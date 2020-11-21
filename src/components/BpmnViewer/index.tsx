import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Modeler from 'bpmn-js/lib/Modeler';
// Import Bpmn diagram styles
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import NamePanel from './panels/NamePanel';
import CustomRenderer from './customs/CustomRenderer';
import CustomPalette from './customs/CustomPallete';

interface IBpmnViewerPropTypes {
  url: string,
}


/**
 * Modeler
 */
let bpmnModeler: any | null = null;
const MODELER_CONFIG = {
  container: '#bpmn-container',
  additionalModules: [
    {
      __init__: [ 'customRenderer', 'customPallete' ],
      customRenderer: [ 'type', CustomRenderer ],
      customPallete: [ 'type', CustomPalette ],
    }
  ]
};

/**
 * Styles
 */
const ViewerWrapper = styled.div``;
const BpmnContainer = styled.div`
  .djs-container {
    width: 100vw;
    height: 100vh;
  }
`;
const PropertiesPanel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 10px;
  background-color: #FAFAFA;
  border-radius: 5px;
  min-width: 480px;
`;
const PropertiesPanelName = styled.h3``;

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
      bpmnModeler = new Modeler(MODELER_CONFIG);
      loadFromUrl(url);
    }
  }

  const setDiagram = (xml: string) => {
    if (bpmnModeler) {
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
      {bpmnModeler && (
        <PropertiesPanel id="bpmn-properties-panel">
          <PropertiesPanelName>Properties</PropertiesPanelName>
          <NamePanel modeler={bpmnModeler} />
        </PropertiesPanel>
      )}
    </ViewerWrapper>
  )
}

export default BpmnViewer;
