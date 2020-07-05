let weather;
let apiurl = "http://api.openweathermap.org/data/2.5/weather?q=";
let apikey = "&appid=8fe943273eb528945c40773f4fb73497";
let units = "&units=imperial";

let deg = 0;
let windspeed = 0;
let userinput;


let yoffset = 0.0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let button = select("#submit");
  button.mousePressed(searchCity);
  userinput = select("#city");

  let lawind = select("#la");
  lawind.mousePressed(getLa);

  let nywind = select("#ny");
  nywind.mousePressed(getNy);

  let chwind = select("#ch");
  chwind.mousePressed(getCh);

  let sfwind = select("#sf");
  sfwind.mousePressed(getSf);

}


function searchCity() {

clear();
  let search = apiurl + userinput.value() + apikey + units;
  loadJSON(search, fetchData, "jsonp");
}

function getLa() {
  clear();
  let la = apiurl + "los angeles" + apikey + units;
  loadJSON(la, fetchData, "jsonp");
}

function getNy() {
  clear();
  let ny = apiurl + "new york" + apikey + units;
  loadJSON(ny, fetchData, "jsonp");
}

function getCh() {
  clear();
  let ch = apiurl + "chicago" + apikey + units;
  loadJSON(ch, fetchData, "jsonp");
}

function getSf() {
  clear();
  let sf = apiurl + "san francisco" + apikey + units;
  loadJSON(sf, fetchData, "jsonp");
}


function fetchData(data) {
  deg = data.wind.deg;
  windspeed = data.wind.speed;
}

function draw() {
  //leave bg as slpha so it imprints last iteration
  background(1, 1, 1, 1);
  calcWave();
  windinfo();
}


function windinfo() {
  document.getElementById("windDirection").innerHTML = "Wind Direction: " + deg + "°";
  document.getElementById("wspeed").innerHTML = "Wind Speed: " + windspeed + " m/s";
}

function calcWave() {

  let r = random(0, 20);
  let g = random(100, 200);
  let b = random(220, 255);

  //sets color and weight
  strokeWeight(2);
  stroke(r, g, b);

  // draw wave
  beginShape(0);

  let xoffset = 0;
  yoffset += 0.005;

  for (let x = 0; x <= width; x++) {
    //last two numbers takes in deg and wind
    let y = map(noise(xoffset, yoffset), 0.5, .8, deg, windspeed);
    xoffset += 0.010;
    vertex(x, y * 1.5);
  }

  yoffset += 0.005;
  //moves wave to have room for peaks
  translate(0, height / 8);
  //shape of of where the peaks will start and end
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}