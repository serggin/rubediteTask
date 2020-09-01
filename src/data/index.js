import webcolors from './webcolors.json';

export const colorNames = () => {
  return webcolors.map((color) => color.name).sort();
};
