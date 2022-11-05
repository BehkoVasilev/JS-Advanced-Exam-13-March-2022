const rentCar = require('./rentCar');
const {assert} = require('chai');

describe("Tests rent rentCar", function() {
    describe("test searchCar", function() {
        it("finded model", () => {
            let expectResult = rentCar.searchCar(["Volkswagen", "BMW", "Audi", "Audi"], 'Audi');
            assert.equal(expectResult, `There is 2 car of model Audi in the catalog!`);
        });
        
        it("wrong data", () => {
            assert.throw(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi", "Audi"], 5), "Invalid input!");
            assert.throw(() => rentCar.searchCar("test", "test"), "Invalid input!");
            assert.throw(() => rentCar.searchCar({}, "test"), "Invalid input!");
            assert.throw(() => rentCar.searchCar([], 2), "Invalid input!");
        });

        it("test when no match", () => {
            assert.throw(() => 
            rentCar.searchCar(["Volkswagen", "BMW", "Audi", "Audi"], "Shkoda"), 'There are no such models in the catalog!');
        })

     });

     describe("test calculatePriceOfCar", () =>{
        it ("not valid inputs", () =>{
            assert.throw(() => rentCar.calculatePriceOfCar([], "test"), "Invalid input!");
            assert.throw(() => rentCar.calculatePriceOfCar(3, ["test"]), "Invalid input!");
            assert.throw(() => rentCar.calculatePriceOfCar(3, 2), "Invalid input!");
            assert.throw(() => rentCar.calculatePriceOfCar('test', "2"), "Invalid input!");

        });

        it("no such a model", () =>{
            assert.throw(() => rentCar.calculatePriceOfCar('test', 2), 'No such model in the catalog!');
        });

        it("test when it has a match", () =>{
            assert.equal(rentCar.calculatePriceOfCar("Audi", 3), `You choose Audi and it will cost $108!`)
            assert.equal(rentCar.calculatePriceOfCar("BMW", 2), `You choose BMW and it will cost $90!`)
        })
     });

     describe("test checkBudget", () => {
        it ("test wrong inputs", () =>{
            assert.throw(() => rentCar.checkBudget("1", 2, 5), "Invalid input!");
            assert.throw(() => rentCar.checkBudget("1", "2", 5), "Invalid input!");
            assert.throw(() => rentCar.checkBudget(1, "2", 5), "Invalid input!");
            assert.throw(() => rentCar.checkBudget("1", 2, "5"), "Invalid input!");
            assert.throw(() => rentCar.checkBudget([], 2, 5), "Invalid input!");
            assert.throw(() => rentCar.checkBudget("1", [], "5"), "Invalid input!");
        });

        it ("test budget is enough", () =>{
            assert.equal(rentCar.checkBudget(50, 2, 100), `You rent a car!`);
            assert.equal(rentCar.checkBudget(50, 2, 120), `You rent a car!`);
        });

        it("test budget is not enough", () =>{
            assert.equal(rentCar.checkBudget(50, 2, 99), 'You need a bigger budget!');
            assert.equal(rentCar.checkBudget(50, 3, 120), 'You need a bigger budget!');
        })
     });

});
