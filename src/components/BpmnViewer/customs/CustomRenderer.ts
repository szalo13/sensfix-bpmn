import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { BLUE_TASK_NAME, GREEN_TASK_NAME, RED_TASK_NAME } from '../const';
import { drawBlueTask, drawGreenTask, drawRedTask } from '../utils/draw';

export default class CustomRenderer extends BaseRenderer {
  bpmnRenderer: any;
  
  constructor(eventBus: any, bpmnRenderer: any) {
    super(eventBus, 1500)

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element: any) {
    return true;
  }

  drawShape(parentNode: any, element: any) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);

    switch (element.name) {
      case BLUE_TASK_NAME:
        console.log(element);
        return drawBlueTask(shape);
      
      case GREEN_TASK_NAME:
        return drawGreenTask(shape);
      
      case RED_TASK_NAME:
        return drawRedTask(shape);
    
      default:
        return shape;
    }
  }
}
