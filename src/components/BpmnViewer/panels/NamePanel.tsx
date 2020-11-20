import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Input } from 'antd';

interface INamePanelPropTypes {
  modeler: any,
}

const NamePanelWrapper = styled.div``;

const NamePanel = ({
  modeler
}: INamePanelPropTypes) => {
  const [value, setValue] = useState('');
  const [currentElement, setCurrentElement] = useState<any>(null);

  useEffect(() => {
    modeler.on('selection.changed', (e: any) => {
      if (e.newSelection[0]) {
        setCurrentElement(e.newSelection[0]);
        setValue(e.newSelection[0].businessObject.name);
      } else {
        setCurrentElement(null);
        setValue('');
      }
    });
  }, []);

  const handleTextChange = (e: any) => {
    setValue(e.target.value);
  }

  const handleEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      changeName(e);
    }
  }

  const changeName = (e: any) => {
    if (currentElement) {
      const modeling = modeler.get('modeling');
      modeling.updateLabel(currentElement, value);
    }
  }

  return (
    <NamePanelWrapper>
      <Input
        size="large"
        onBlur={changeName}
        onChange={handleTextChange}
        onKeyDown={handleEnterKey}
        placeholder={currentElement ? 'Name' : 'Element not selected'}
        value={value}
      />
    </NamePanelWrapper>
  )
}

export default NamePanel;
