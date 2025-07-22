function greet(name) {
    return 'Hello' + name;
}
var johnGreet = greet('John');
function greetToUpperCase(name) {
    return 'Hello' + name.toUpperCase();
}
var greetToConsole = function (name) {
    console.log('Hello ' + name);
};
function greetMultiple() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    names.forEach(function (name) {
        greetToConsole(name);
    });
}
greetMultiple('Onur', 'John');
