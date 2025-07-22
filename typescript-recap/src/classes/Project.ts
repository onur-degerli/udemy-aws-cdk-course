class Project {
  private name: string;
  private budget: number;

  constructor(name: string, budget?: number) {
    this.name = name;

    if (budget) {
      this.budget = budget;
    } else {
      this.budget = 1000;
    }
  }

  setBudget(budget: number) {
    this.budget = budget;
  }

  printBudget() {
    console.log(`${this.name} has budget of ${this.budget}`);
  }
}

const coolProject = new Project('Cool project', 2000);
coolProject.printBudget();
const defaultProject = new Project('Default project');
defaultProject.printBudget();
