var Project = /** @class */ (function () {
    function Project(name, budget) {
        this.name = name;
        if (budget) {
            this.budget = budget;
        }
        else {
            this.budget = 1000;
        }
    }
    Project.prototype.printBudget = function () {
        console.log("".concat(this.name, " has budget of ").concat(this.budget));
    };
    return Project;
}());
var coolProject = new Project('Cool project', 2000);
coolProject.printBudget();
var defaultProject = new Project('Default project');
defaultProject.printBudget();
