let electrons = [];
let atoms = [];
let electrodes;
let volt;
let temp;
let shooting = false;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  textSize(30);
  textAlign(RIGHT);
  
  volt = createSlider(0,10, 1, 0.5);
  volt.position(50, 50);
  temp = createSlider(20, 400, 200, 1);
  temp.position(250, 50);
  
  //build the atom grid
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 5; j++){
      atoms.push(new Atom(width/7 + i*70, height/4 + j*70));
    }
  }
  
  //build the electrodes
  electrodes = new Electrodes();
  
  //start one electron
  electrons.push(new Electron(50, height/2 + random(-100, 100)));
}

//_/_/_/_/_/_/_/_/_/---DRAW---_/_/_/_/_/_/_/_/_/_/_/_/_/_/

function draw() {
  heat_col = map(temp.value(), 20, 400, 190, 255);
  background(heat_col, 190, 190);
  showBottom();
  
  
  //electrodes charge, force all electrons and show up
  if(shooting){
    electrodes.charge(3, electrons);
  }
  electrodes.applyForceTo(electrons);
  electrodes.show();
  
  //all atoms attract all electrons and show up
  for(let a of atoms){
    //a.checkCharge();
    a.applyForceTo(electrons);
    a.move();
    a.show();
  }
  
  //all electrons move and show up
  for(let i = 0; i < electrons.length; i++){
    electrons[i].move();
    electrons[i].show();
  }
  //not too many electrons at once
  //cleanElectrons();
  
  //print("amount electrons: " + electrons.length);
  
}

function showBottom(){
  textSize(20);
  textAlign(RIGHT);
  text('U in Volt', 160, 50);
  text('0                 10', 180, 90);
  text('Temp in K', 360, 50);
  text('0                 400', 390, 90);
  text('Ampere', 650, 70);
  
  noStroke();
  if(shooting){
    fill(0);
    textSize(20);
    text('ON', 463, 58);
    fill(250, 250, 20, 100);
  }else{
    fill(0);
    text('OFF', 468, 58);
    fill(250, 250, 20, 70);
  }
  circle(450, 50, 50);
  
  circle(520, 50, 50);
  fill(0);
  textSize(14);
  text('CLEAR', 543, 55);
}

function cleanElectrons(){
  let max_elec_amount = map(volt.value(), 0, 10, 0, 400);
  if(electrons.length > max_elec_amount){
    electrons.splice(0, 1);
  }
}

function mousePressed(){
  if(mouseY < height/4 + 320 && mouseY > height/4 - 34){
    electrons.push(new Electron(mouseX, mouseY));
  }
  if(dist(450,50,mouseX, mouseY) < 50){
    if(shooting){
      shooting = false;
    }else{
      shooting = true;
    }
  }else if(dist(520 ,50,mouseX, mouseY) < 50){
    for(let i = 0; i < electrons.length; i++){
      electrons.splice(i, 1);
    }
  }
}