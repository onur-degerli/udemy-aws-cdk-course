export {};

type Employe = {
  name: string;
  position: string;
};

type ReadonlyEmployee = Readonly<Employe>;

const someEmploye: ReadonlyEmployee = {
  name: 'Jeff',
  position: 'HR',
};

// someEmploye.position = 'IT'; // not possible

const CEO = 'Jeff';

const ceoObject = {
  name: 'Jeff',
  company: 'Amazon',
} as const;

// ceoObject.name = 'Onur'; // not possible
