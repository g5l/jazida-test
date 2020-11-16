export default class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }

  age(x) {
    return x - this.year;
  }
}
