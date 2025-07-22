export {};

async function getEmployees() {
  return Promise.resolve([
    {
      name: 'John',
      postion: 'Developer',
      salary: 2000,
    },
  ]);
}

async function wrapper() {
  const employees = await getEmployees();
}

type EmployeeServiceReturnType = Awaited<ReturnType<typeof getEmployees>>;

function getService() {
  return Promise.resolve('www.mycompany.com');
}

async function resolveServiceFirst<T>(service: Promise<T>) {
  const result = await service;
  console.log(result);
}

resolveServiceFirst(getService());

type NestedPromise<T> = Promise<Promise<Promise<T>>>;
type InsidePromise<T> = Awaited<NestedPromise<T>>;
