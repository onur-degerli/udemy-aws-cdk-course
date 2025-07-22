export {};

// Generics are extra layer of abstraction on the top of types, functions, and classes.
// Generics is handy for
// - reducing the code duplication
// - increasing code resuability
// - building stronger types

type WithItems<T, G> = {
  items: T[];
  moreItems: G[];
};

const withItems: WithItems<number, string> = {
  items: [1, 2, 3],
  moreItems: [''],
};

const names: string[] = [];
const names2: Array<string> = [];

type Employee = {
  name: string;
  role: string;
};

async function getEmployees<T>(url: string): Promise<T[]> {
  const result = await fetch(url);
  const parsedResult = await result.json();
  return parsedResult;
}

async function wrapper() {
  const employees = await getEmployees<Employee>('employee-service.com');
  const firstEmployee = employees[0];
}
