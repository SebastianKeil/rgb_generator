//this is a generator of nice color themes. it generates a new theme by clicking and shows the rgb values for both colors.

let r;
let g;
let b;
let c1;
let c2;
let c3;
let strokeBotton = true;
var angle = 0;
var branches;

function setup() {
  createCanvas(windowWidth, windowHeight);
  branches = createSlider(1, 100, 30, 10);
  branches.position(100, 100);
  
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
}


function draw() {
  c1 = color(r, g, b);
  c2 = color(g, b, r);
  c3 = color(255-r, 255-g, 255-b);
  
//sky
  background(c2);
  
//sun 
  /*
  let r_sun = map(mouseY, 0, height, 250, 200);
  let g_sun = map(mouseY, 0, height/2 + 100, 250, 160);
  let b_sun = map(mouseY, 0, height/2 + 100, 250, 160);
  
  fill(r_sun, g_sun, b_sun);
  */
  noStroke();
  fill(250);
  ellipse(mouseX, mouseY, 250);
  
  
  
//land
  fill(c1);
  rect(0, height/2 + 100, width, height - height/2 + 100);
  noStroke();
  ellipse(width/2+260, height/2 + 240, 500);
  ellipse(width/2+570, height/2 + 200, 700);
  
  translate(0, 250);
  
//shadow
  mouse_vec = createVector(mouseX, mouseY);
  let pole_vec = createVector(575, 500);
  let v = p5.Vector.sub(mouse_vec, pole_vec);
  
  
  let shadow = p5.Vector.add(pole_vec, v.mult(-1));
  //shadow.setMag(1);
  
  stroke(g-20, b-20, r-20);
  strokeWeight(45);
  line(pole_vec.x, pole_vec.y, shadow.x-70, shadow.y+300);
  line(pole_vec.x, pole_vec.y, shadow.x-40, shadow.y+300);
  line(pole_vec.x, pole_vec.y, shadow.x, shadow.y+300);
  line(pole_vec.x, pole_vec.y, shadow.x+40, shadow.y+300);
  line(pole_vec.x, pole_vec.y, shadow.x+70, shadow.y+300);
  
//pole
  noStroke();
  //stroke(0);
  //strokeWeight(2);
  fill(c3);
  rect(70, 50, 550, 30, 20);
  rect(550, 50, 50, 450, 20);
  
//textboxes
  stroke(0);
  strokeWeight(2);
  fill(g + 50, b + 50, r + 50, 200);
  rect(100, 210, 160, 160);
  
  textSize(40);
  stroke(0);
  strokeWeight(5);
  fill(250);
  text('R: ' + round(g), 110, 260);
  text('G: ' + round(b), 110, 300);
  text('B: ' + round(r), 110, 340);
  translate(-100, -210);
  
//other textbox
  stroke(0);
  strokeWeight(2);
  fill(r + 50, r + 50, b + 50, 100);
  rect(300, 700, 160, 160);
  textSize(40);
  fill(250);
  text('R: ' + round(r), 310, 750);
  text('G: ' + round(g), 310, 790);
  text('B: ' + round(b), 310, 830);
  
  
  if(strokeBotton){
    noStroke();
  }
  
/*tree
  stroke(0);
  strokeWeight(6);
  let angle = branches.value();
  translate(470, height/2 + 310);
  
  for(let i = 0; i < branches.value(); i = i + 10){
    translate(i, 0);
    branch(80 + i);
  }
*/ 
  
  
}

function mousePressed(){
    r = random(0,255);
    g = random(0,255);
    b = random(0,255);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  
  if (len > 10) {
    push();
    rotate(PI/5);
    branch(len * 0.60);
    pop();
    push();
    rotate(-PI/4);
    branch(len * 0.67);
    pop();
  }
}
