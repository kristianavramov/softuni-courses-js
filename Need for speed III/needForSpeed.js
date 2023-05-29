function needForSpeed(input) {
  let object = {};
  let numberOfCars = input.shift();
  for (let i = 0; i < numberOfCars; i++) {
    let [typeOfCar, mileage, fuel] = input.shift().split("|");
    object[typeOfCar] = [];
    object[typeOfCar].push(Number(mileage));
    object[typeOfCar].push(Number(fuel));
  }
  for (const line of input) {
    let [command, typeOfCar, milage, fuel] = line.split(" : ");
    milage = Number(milage);
    fuel = Number(fuel);
    if (command === "Stop") {
      break;
    }
    switch (command) {
      case "Drive":
        if (object[typeOfCar][1] < fuel) {
          console.log("Not enough fuel to make that ride");
        } else {
          object[typeOfCar][1] = object[typeOfCar][1] - fuel;
          object[typeOfCar][0] = object[typeOfCar][0] + milage;
          console.log(
            `${typeOfCar} driven for ${milage} kilometers. ${fuel} liters of fuel consumed.`
          );
        }
        if (object[typeOfCar][0] >= 100000) {
          console.log(`Time to sell the ${typeOfCar}!`);
          delete object[typeOfCar];
        }
        break;
      case "Refuel":
        let oldFuel = object[typeOfCar][1];
        object[typeOfCar][1] += milage;
        if (object[typeOfCar][1] > 75) {
          object[typeOfCar][1] = 75;
        }
        console.log(
          `${typeOfCar} refueled with ${object[typeOfCar][1] - oldFuel} liters`
        );
        break;
      case "Revert":
        object[typeOfCar][0] -= milage;

        if (object[typeOfCar][0] < 10000) {
          object[typeOfCar][0] = 10000;
        } else {
          console.log(`${typeOfCar} mileage decreased by ${milage} kilometers`);
        }
        break;
    }
  }
  for (const car in object) {
    console.log(
      `${car} -> Mileage: ${object[car][0]} kms, Fuel in the tank: ${object[car][1]} lt.`
    );
  }
}
needForSpeed([
  "3",
  "Audi A6|38000|62",
  "Mercedes CLS|11000|35",
  "Volkswagen Passat CC|45678|5",
  "Drive : Audi A6 : 543 : 47",
  "Drive : Mercedes CLS : 94 : 11",
  "Drive : Volkswagen Passat CC : 69 : 8",
  "Refuel : Audi A6 : 50",
  "Revert : Mercedes CLS : 500",
  "Revert : Audi A6 : 30000",
  "Stop",
]);
