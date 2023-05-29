function activationKey(array) {
  let text = array.shift(); // I take the raw data which is given in first element of the array. With the shift() method it get removed from the array
  let line = array.shift();
  while (line !== "Generate") { //after I take the first line of the text I start while loop, which will continue through the receiving of command "Generate"
    let lineWithCommand = line.split(">>>");
    switch (lineWithCommand[0]) { //After the line gets splited I use switch case from the first element of the splited line
      case "Contains": //in this case I use includes() method which will return true or false
        if (text.includes(lineWithCommand[1])) { 
          console.log(`${text} contains ${lineWithCommand[1]}`);
        } else {
          console.log("Substring not found!");
        }
        break;
      case "Slice": //In this case we have start and end indexes. I use slice() method so i can slice the part of the text i need.
        let startIndex = Number(lineWithCommand[1]);
        let endIndex = Number(lineWithCommand[2]);
        text = text.slice(0, startIndex) + text.slice(endIndex);
        console.log(text);
        break;
      case "Flip": //In this case I use if else statement so I can see if the case is to upper cases or to lower cases. 
        let caseUpperOrLower = lineWithCommand[1];
        let startingIndex = Number(lineWithCommand[2]);
        let endingIndex = Number(lineWithCommand[3]);
        let newString = "";
        let partToManipulate = text.substring(startingIndex, endingIndex);
        if (caseUpperOrLower === "Upper") { 
          //Afterwards I use for loop and slice method, so i can change the type of the letters.
          for (let i = 0; i < partToManipulate.length; i++) {
            newString += partToManipulate[i].toUpperCase();
          }
          text =
            text.slice(0, startingIndex) + newString + text.slice(endingIndex);
        } else {
          for (let i = 0; i < partToManipulate.length; i++) {
            newString += partToManipulate[i].toLowerCase();
          }
          text =
            text.slice(0, startingIndex) + newString + text.slice(endingIndex);
        }
        console.log(text);
        break;
    }
    // I use shift() method so i can take the next line. Thats how the loop will not be infinite
    line = array.shift();
  }
  //I print the result
  console.log(`Your activation key is: ${text}`);
}
activationKey([
  "abcdefghijklmnopqrstuvwxyz",
  "Slice>>>2>>>6",
  "Flip>>>Upper>>>3>>>14",
  "Flip>>>Lower>>>5>>>7",
  "Contains>>>def",
  "Contains>>>deF",
  "Generate",
]);
