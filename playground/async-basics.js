console.log('Starting app');

setTimeout(() => {
  console.log('First setTimeout');
}, 2000);

setTimeout(() => {
  console.log('Second setTimeout');
}, 0);

console.log('Finishing app');