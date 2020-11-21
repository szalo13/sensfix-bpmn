import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { BLUE_TASK_NAME, GREEN_TASK_NAME, RED_TASK_NAME } from '../const';
import { drawCircle } from '../utils/draw';
import {
  attr as svgAttr,
} from 'tiny-svg';
export default class CustomRenderer extends BaseRenderer {
  bpmnRenderer: any;
  
  constructor(eventBus: any, bpmnRenderer: any) {
    super(eventBus, 1500)

    this.bpmnRenderer = bpmnRenderer;
  }

  drawBlueTask(parentNode: any, element: any) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    svgAttr(shape, { stroke: 'blue' })
    return shape;
  }

  drawRedTask(parentNode: any, element: any) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    svgAttr(shape, { stroke: 'red' })
    return shape;
  }

  drawGreenTask(parentNode: any, element: any) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    const point = drawCircle(parentNode, 10, 'green');
    svgAttr(point, { transform: 'translate(-10, -10)' });
    svgAttr(shape, { stroke: 'green' });
    
    return shape;
  }

  canRender() {
    return true;
  }

  drawShape(parentNode: any, element: any) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);

    switch (element.name) {
      case BLUE_TASK_NAME:
        return this.drawBlueTask(parentNode, element);
      
      case GREEN_TASK_NAME:
        return this.drawGreenTask(parentNode, element);
      
      case RED_TASK_NAME:
        return this.drawRedTask(parentNode, element);
    
      default:
        return shape;
    }
  }
}
