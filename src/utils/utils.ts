export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
export const customAxisLabel = (value: number, axisBase: number): string =>{
  let axisLabel = axisBase + '{title|' + Math.log(value) / Math.log(axisBase) + '}';
  return axisLabel;
} 