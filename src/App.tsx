import React from 'react';
import './App.css';
import BpmnViewer from './components/BpmnViewer';
import styled from 'styled-components';
// AndDesign styles
import 'antd/dist/antd.css';

const AppContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  .djs-palette {
    .bpmn-icon-task {
      &.red {
        color: red;
      }

      &.blue {
        color: blue;
      }

      &.green {
        color: green;
      }
    }
  }
`;

const App = () => {
  return (
    <AppContainer className="app-container">
      <BpmnViewer url="diagrams/example.bpmn" />
    </AppContainer>
  );
}

export default App;
