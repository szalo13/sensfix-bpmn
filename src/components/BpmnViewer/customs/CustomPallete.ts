import { BLUE_TASK_NAME, GREEN_TASK_NAME, RED_TASK_NAME } from "../const";

const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;

export default class CustomPalette {
  bpmnFactory: any;
  create: any;
  elementFactory: any;
  translate: any;

  constructor(bpmnFactory: any, create: any, elementFactory: any, palette: any, translate: any) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element: any) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    const createShape = (suitabilityScore: any, name: string) => {
      return (event: any) => {
        const businessObject = bpmnFactory.create('bpmn:Task');
        businessObject.suitable = suitabilityScore;
  
        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          name: name,
          businessObject: businessObject
        });
  
        create.start(event, shape); 
      }
    }

    return {
      'create.red-task': {
        group: 'activity',
        className: 'bpmn-icon-task red',
        title: translate('Create red task'),
        action: {
          dragstart: createShape(SUITABILITY_SCORE_LOW, RED_TASK_NAME),
          click: createShape(SUITABILITY_SCORE_LOW, RED_TASK_NAME)
        }
      },
      'create.yellow-task': {
        group: 'activity',
        className: 'bpmn-icon-task blue',
        title: translate('Create blue task'),
        action: {
          dragstart: createShape(SUITABILITY_SCORE_AVERGE, BLUE_TASK_NAME),
          click: createShape(SUITABILITY_SCORE_AVERGE, BLUE_TASK_NAME)
        }
      },
      'create.green-task': {
        group: 'activity',
        className: 'bpmn-icon-task green',
        title: translate('Create green task'),
        action: {
          dragstart: createShape(SUITABILITY_SCORE_HIGH, GREEN_TASK_NAME),
          click: createShape(SUITABILITY_SCORE_HIGH, GREEN_TASK_NAME)
        }
      }
    }
  }
}