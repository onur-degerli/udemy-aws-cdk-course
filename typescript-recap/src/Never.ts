export {};

type CEO = 'jeff';
type Founder = 'Bill';
type CeoAndFounder = CEO & Founder;
type willNeverHappen = string & number;

function neverReturns(): never {
  while (true) {}
}

function doStuff(arg: string | number) {
  if (typeof arg === 'string') {
    console.log(arg);
    return;
  }

  if (typeof arg === 'number') {
    console.log(arg);
    return;
  }

  console.log(arg); // will never happen
}
