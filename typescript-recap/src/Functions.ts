function greet(name: string) {
  return 'Hello' + name;
}

const johnGreet = greet('John');

function greetToUpperCase(name: string) {
  return 'Hello' + name.toUpperCase();
}

const greetToConsole = (name: string) => {
  console.log('Hello ' + name);
};

function greetMultiple(...names: string[]) {
  names.forEach((name) => {
    greetToConsole(name);
  });
}

greetMultiple('Onur', 'John');
