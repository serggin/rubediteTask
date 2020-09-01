import webcolors from './webcolors.json';

export const HOST = 'rubedite.com/';

const errorProbability = 0.3;
const serverDelay = 2000;

export const fetch = (path) => {
  const searchString = path.substr(HOST.length).toLowerCase();
  console.log('searchString=', searchString);

  return new Promise((resolve, reject) => {
    if (Math.random() < errorProbability) {
      reject('Some network error');
    }
    const result = webcolors.filter(
      (color) => color.name.toLowerCase().indexOf(searchString) > -1,
    );
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      resolve(new Response(JSON.stringify(result), {status: 200}));
    }, serverDelay);
  });
};
