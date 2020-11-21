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
  width: 100vw;
  height: 100vh;

  .bjs-container {
    width: 100vw;
    height: 100vh;
  }

  .bjs-powered-by {
    display: none;
  }
`;
const PropertiesPanel = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  background-color: #FAFAFA;
  border-radius: 5px;
  min-width: 480px;
`;
const PropertiesPanelName = styled.h3``;

const BpmnViewer = ({
  url
}: IBpmnViewerPropTypes) => {
  const [modelerInitialized, setViewerInitialized] = useState(false);
  const [diagramLoaded, setDiagramLoaded] = useState(false);

  useEffect(() => {
    if (!modelerInitialized) {
      initViewer();
    }
  }, [modelerInitialized]);

  const initViewer = () => {
    if (!modelerInitialized) {
      setViewerInitialized(true);
      bpmnModeler = new Modeler(MODELER_CONFIG);
      loadFromUrl(url);
    }
  }

  const setDiagram = (xml: string) => {
    if (bpmnModeler) {
      setDiagramLoaded(true);
      bpmnModeler.importXML(xml, (err: any) => {
        console.log(err);
      });
    }
  }

  const loadFromUrl = (url: string) => {
    fetch(url)
      .then(response => response.text())
      .then(setDiagram)
      .catch(err => console.log(err));
  }

  return (
    <ViewerWrapper>
      <BpmnContainer id="bpmn-container" />
      {diagramLoaded && bpmnModeler && (
        <PropertiesPanel id="bpmn-properties-panel">
          <PropertiesPanelName>Properties</PropertiesPanelName>
          <NamePanel modeler={bpmnModeler} />
        </PropertiesPanel>
      )}
    </ViewerWrapper>
  )
}

export default BpmnViewer;
