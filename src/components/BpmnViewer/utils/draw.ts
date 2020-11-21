import { attr as svgAttr } from 'tiny-svg';

export const drawBlueTask = (shape: any) => {
  svgAttr(shape, { stroke: 'blue' })
  return shape;
}

export const drawRedTask = (shape: any) => {
  svgAttr(shape, { stroke: 'red', fill: 'red', color: 'white' })
  return shape;
}

export const drawGreenTask = (shape: any) => {
  svgAttr(shape, { stroke: 'green' })
  return shape;
}
