const fs = require("fs");
let raw = fs.readFileSync("BHR_adm1.kml", "utf-8");

let placemarkRegex = /<Placemark>([\s\S]*?)<\/Placemark>/gmi;
let nameRegex = /<name>([\s\S]*?)<\/name>/gmi;
let coordsRegex = /<coordinates>([\s\S]*?)<\/coordinates>/gmi;

let data = [];

let match;
while(match = placemarkRegex.exec(raw)){
  let placemark = match[1];
  nameRegex.lastIndex = 0;
  let name = nameRegex.exec(placemark)[1];
  console.log(name);
  console.log("\n\n\n");

  let coordinates = [];

  coordsRegex.lastIndex = 0;
  let cm;
  while(cm = coordsRegex.exec(placemark)){
    let coords = cm[1].trim();

    coords = coords.replace(/\r/gmi, "").split("\n")
    .map(line => line.split(",").reverse().join(" "))
    .join(" ");
    coordinates.push(coords);

    console.log(coords);
  }

  coordinates = coordinates.join(",");
  console.log(coordinates);

  data.push({
    area: name,
    geom: coordinates
  });
}

require("fs").writeFileSync("kml.json",
  JSON.stringify(data, null, 2));
