// class CarDealership {
//     constructor(name){
//         this.name = name;
//         this.availableCars = [];
//         this.soldCars = [];
//         this.totalIncome = 0;  
//     }

//     addCar (model, horsepower, price, mileage){
//         if (model === "" || horsepower < 0 || price < 0 || mileage < 0){
//             throw Error ("Invalid input!");
//         }
//         let car = {
//             model,
//             horsepower,
//             price,
//             mileage
//         }
//         this.availableCars.push(car);
//         return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`
//     }

//     sellCar (model, desiredMileage){
//         let currentCar = this.availableCars.find(car => car.model === model);
//         if (!currentCar){
//             throw Error (`${model} was not found!`)
//         }
//         let horsepower = currentCar.horsepower;
//         let soldPrice = currentCar.price
//         if (currentCar.mileage > desiredMileage){
//             if ((currentCar.mileage - desiredMileage) <= 40000){
//                 soldPrice *= 0.95;
//             } else  {
//                 soldPrice *= 0.90;
//             }
//         }
//         this.availableCars.filter(car => car !== currentCar);    
//         this.soldCars.push({
//             model,
//             horsepower,
//             soldPrice
//         });
//         this.totalIncome += soldPrice;
//         return `${model} was sold for ${soldPrice.toFixed(2)}$`
//     }

//     currentCar () {
//         if (this.availableCars.length > 0){
//             let returnMsg = "-Available cars:";
//             for (let car of this.availableCars){
//                 returnMsg += `\n---${car.model} - ${car.horsepower} HP - ${car.mileage.toFixed(2)} km - ${car.price.toFixed(2)}$`
//             }
//             return returnMsg
//         }
//         return "There are no available cars"
//     }

//     salesReport (criteria){
//         if (criteria !== "horsepower" && criteria !== "model"){
//             throw Error ("Invalid criteria!");
//         }
//         if (criteria === "horsepower"){
//             this.soldCars.sort((a, b) => b.horsepower - a.horsepower);
//         } else {
//             this.soldCars.sort((a, b) => a.model.localeCompare(b.model));
//         }
//         let resultMsg = `-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`;
//         resultMsg += `\n-${this.soldCars.length} cars sold:`;

//         for (let car of this.soldCars){
//             resultMsg += `\n---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$`;
//         }
//         return resultMsg
//     }
// }

// let dealership = new CarDealership('SoftAuto');
// dealership.addCar('Toyota Corolla', 100, 3500, 190000);
// dealership.addCar('Mercedes C63', 300, 29000, 187000);
// dealership.addCar('Audi A3', 120, 4900, 240000);
// dealership.sellCar('Toyota Corolla', 230000);
// dealership.sellCar('Mercedes C63', 110000);
// console.log(dealership.salesReport('horsepower'));

// let dealership1 = new CarDealership('SofAuto');
// dealership.addCar('Toyota Corolla', 100, 3500, 190000);
// dealership.addCar('Mercedes C63', 300, 29000, 187000);
// dealership.addCar('Audi A3', 120, 4900, 240000);
// dealership.sellCar('Toyota Corolla', 230000);
// dealership.sellCar('Mercedes C63', 110000);
// console.log(dealership.salesReport('model'));


class CarDealership {
    constructor(name) {
        this.name = name;
        this.totalIncome = 0;
        this.soldCars = [];
        this.availableCars = [];
    }

    addCar(model, horsepower, price, mileage) {
        if (!model || horsepower < 0 || price < 0 || mileage < 0) {
            throw new Error("Invalid input!");
        }

        this.availableCars.push({
            model,
            horsepower,
            price,
            mileage
        })

        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`;
    }

    sellCar(model, desiredMileage) {
        let searchedCar = this.availableCars.find(c => c.model === model);
        if (!searchedCar) {
            throw new Error(`${model} was not found!`);
        }
        let carsMileage = searchedCar.mileage;
        let soldPrice = 0;
        if (carsMileage <= desiredMileage) {
            soldPrice = searchedCar.price;
        } else if (carsMileage - desiredMileage <= 40000) {
            soldPrice = searchedCar.price * 0.95;
        } else {
            soldPrice = searchedCar.price * 0.9;
        }
        this.availableCars = this.availableCars.filter(c => c.model !== model);
        this.soldCars.push({
            model: searchedCar.model,
            horsepower: searchedCar.horsepower,
            soldPrice
        })
        this.totalIncome += soldPrice;
        return `${model} was sold for ${soldPrice.toFixed(2)}$`
    }

    currentCar() {
        if (this.availableCars.length === 0) {
            return 'There are no available cars';
        }
        let formatedCars = this.availableCars.map(c => `---${c.model} - ${c.horsepower} HP - ${c.mileage.toFixed(2)} km - ${c.price.toFixed(2)}$`);
        formatedCars.unshift('-Available cars:');

        return formatedCars.join('\n');
    }

    salesReport(criteria) {
        if (criteria != 'model' && criteria != 'horsepower') {
            throw new Error('Invalid criteria!');
        }

        criteria == 'model'
            ? this.soldCars.sort((a, b) => a.model.localeCompare(b.model))
            : this.soldCars.sort((a, b) => b.horsepower - a.horsepower);

        let output = [`-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`];
        output.push(`-${this.soldCars.length} cars sold:`);

        this.soldCars.map(car => output.push(`---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$`));

        return output.join('\n');
    }
}

let dealership = new CarDealership('SoftAuto');
dealership.addCar('Toyota Corolla', 100, 3500, 190000);
dealership.addCar('Mercedes C63', 300, 29000, 187000);
dealership.addCar('Audi A3', 120, 4900, 240000);
dealership.sellCar('Toyota Corolla', 230000);
dealership.sellCar('Mercedes C63', 110000);
console.log(dealership.salesReport('horsepower'));

