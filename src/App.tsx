import React from 'react';
import './App.css';
import BpmnViewer from './components/BpmnViewer';
import styled from 'styled-components';

const AppContainer = styled.div``;

const App = () => {
  return (
    <AppContainer className="app-container">
      <BpmnViewer />
    </AppContainer>
  );
}

export default App;
