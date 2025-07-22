export {};

type Employe = {
  name: string;
  position: string;
  [key: string]: string | number;
};

const john: Employe = {
  name: 'John',
  position: 'Developer',
  email: 'john@test.com',
  age: 30,
};

const jeff: Employe = {
  name: 'Jeff',
  position: 'CEO',
  email: 'jeff@test.com',
  age: 54,
};

const employeeRecords: Record<string, Employe> = {
  coolEmployees: john,
  uncoolEmployees: jeff,
};

type Positions = 'Programmer' | 'Manager' | 'HR' | 'Scrum Master';
type PositionSalaries = Record<Positions, { sallary: number }>;
