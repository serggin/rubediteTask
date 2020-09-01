import webcolors from './webcolors.json';

export const colors = () => {
  return webcolors.map((color) => color.name).sort();
};
