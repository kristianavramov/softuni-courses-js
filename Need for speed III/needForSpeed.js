function needForSpeed(input) {
  let object = {};
  //We recieve the number of the cars that we can obtain, so I take it with shift() method. This method delete the first element of array
  let numberOfCars = input.shift(); 
  //I used for loop so I can loop through the number of cars that was given. I split every line so I can make a key in a object 
  //in which I can push milage and fuel
  for (let i = 0; i < numberOfCars; i++) { 
    let [typeOfCar, mileage, fuel] = input.shift().split("|");
    object[typeOfCar] = [];
    object[typeOfCar].push(Number(mileage));
    object[typeOfCar].push(Number(fuel));
  }
  
  //Used another for of loop to the rest of the array so i can take the command, type of car, milage, fuel
  for (const line of input) {
    let [command, typeOfCar, milage, fuel] = line.split(" : ");
    milage = Number(milage);
    fuel = Number(fuel);
    // I use if statement if the recieved command is "Stop" so I can stop the loop
    if (command === "Stop") {
      break;
    }
    //I switch commands and make every case of the given task using if/ else statement
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
  //When I loop throght the whole input I use For in loop which will loop through the whole object and print the message
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
