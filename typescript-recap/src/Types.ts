type StringOrNumber = string | number;

type Position = 'Programmer' | 'HR';

type Colleague = {
  name: string;
  age: number;
  position: Position;
  greetBack?: Function;
};

const myColleague: Colleague = {
  name: 'John',
  age: 30,
  position: 'Programmer',
};

const myOtherColleague: Colleague = {
  name: 'Bill',
  age: 30,
  position: 'Programmer',
  greetBack: () => {
    console.log('Hello');
  },
};

function greetColleague(colleague: Colleague) {
  if (colleague.greetBack) {
    colleague.greetBack();
  }
}

greetColleague(myColleague);
greetColleague(myOtherColleague);
