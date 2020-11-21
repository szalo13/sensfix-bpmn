import {
  attr as svgAttr,
  create as svgCreate,
  append as svgAppend,
} from 'tiny-svg';

export const drawCircle = (parentNode: any, size: number, color: string) => {
  const rect = svgCreate('rect');
  svgAttr(rect, {
    width: size,
    height: size,
    stroke: color,
    rx: size,
    ry: size,
    strokeWidth: 2,
    fill: color
  });
  svgAppend(parentNode, rect);

  return rect;
}
