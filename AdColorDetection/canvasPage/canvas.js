const APP = {
  canvas: null,
  ctx: null,
  data: [],
  img: null,
  init() {
    APP.canvas = document.querySelector('main canvas');
    APP.ctx = APP.canvas.getContext('2d');
    APP.canvas.width = 1888;
    APP.canvas.height = 1080;
    APP.img = document.createElement('img');
    APP.img.src = APP.canvas.getAttribute('data-src');
    //once the image is loaded, add it to the canvas

    APP.img.onload = function (ev) {
      APP.ctx.drawImage(APP.img, 0, 0);
      //call the context.getImageData method to get the array of [r,g,b,a] values
      let imgDataObj = APP.ctx.getImageData(
        0,
        0,
        APP.canvas.width,
        APP.canvas.height
      );
      APP.data = imgDataObj.data; //data prop is an array
      //console.log(APP.data.length, 1933 * 944 * 4); //  has 7,299,008 elements
      APP.canvas.addEventListener('mousemove', APP.getPixel);
      APP.canvas.addEventListener('click', APP.addBox);
    };
  },
  getPixel(ev) {
    //as the mouse moves around the image
    // let canvas = ev.target;
    let cols = APP.canvas.width;
    // let rows = canvas.height;
    let { offsetX, offsetY } = ev;
    //call the method to get the r,g,b,a values for current pixel
     window.c = APP.getPixelColor(cols, offsetY, offsetX);
    //build a colour string for css
    let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`;//${c.alpha / 255}
    document.getElementById('pixelColor').style.backgroundColor = clr;
    //save the string to use elsewhere
    APP.pixel = clr;
    //now get the average of the surrounding pixel colours
    APP.getAverage(ev);
  },
  getAverage(ev) {
    //create a 41px by 41px average colour square
    //replace everything in the canvas with the original image
    // let canvas = ev.target;
    let cols = APP.canvas.width;
    let rows = APP.canvas.height;
    //remove the current contents of the canvas to draw the image and box again
    APP.ctx.clearRect(0, 0, cols, rows);
    //add the image from memory
    APP.ctx.drawImage(APP.img, 0, 0);
    let { offsetX, offsetY } = ev;
    const inset = 20;
    //inset by 20px as our workable range
    offsetX = Math.min(offsetX, cols - inset);
    offsetX = Math.max(inset, offsetX);
    offsetY = Math.min(offsetY, rows - inset);
    offsetY = Math.max(offsetY, inset);
    //create a 41 x 41 pixel square for the average
    let reds = 0; //total for all the red values in the 41x41 square
    let greens = 0;
    let blues = 0;
    //for anything in the range (x-20, y-20) to (x+20, y+20)
    for (let x = -1 * inset; x <= inset; x++) {
      for (let y = -1 * inset; y <= inset; y++) {
        let c = APP.getPixelColor(cols, offsetY + y, offsetX + x);
        reds += c.red;
        greens += c.green;
        blues += c.blue;
      }
    }
    let nums = 41 * 41; //total number of pixels in the box
    let red = Math.round(reds / nums);
    let green = Math.round(greens / nums);
    let blue = Math.round(blues / nums);
    //create a colour string for the average colour
    let clr = `rgb(${red}, ${green}, ${blue})`;
    //now draw an overlaying square of that colour
    //make the square twice as big as the sample area
    APP.ctx.fillStyle = clr;
    APP.ctx.strokeStyle = '#FFFFFF';
    APP.ctx.strokeWidth = 2;
    //save the average colour for later
    APP.average = clr;
    APP.ctx.strokeRect(offsetX - inset, offsetY - inset, 41, 41);
    APP.ctx.fillRect(offsetX - inset, offsetY - inset, 41, 41);
  },
  getPixelColor(cols, x, y) {
    //see grid.html as reference for this algorithm
    let pixel = cols * x + y;
    let arrayPos = pixel * 4;
    return {
      red: APP.data[arrayPos],
      green: APP.data[arrayPos + 1],
      blue: APP.data[arrayPos + 2],
      alpha: APP.data[arrayPos + 3],
    };
  },
  addBox(ev) {

    //user clicked. Let's add boxes below with the pixel and the average
    let colours = document.querySelector('.colours');
    let pixel = document.createElement('span');
    pixel.className = 'box';
    pixel.setAttribute('data-label', 'Exact pixel');
    pixel.setAttribute('data-color', APP.pixel);
    let r = c.red;
    let g = c.green;
    let b = c.blue;
    APP.r = r;
    APP.g = g;
    APP.b = b;
    let average = document.createElement('span');
    // average.className = 'box';
    average.setAttribute('data-label', 'Average');
    average.setAttribute('data-color', APP.average);

    pixel.style.backgroundColor = APP.pixel;
    // average.style.backgroundColor = APP.average;
    colours.append(pixel, average);
    // Save the clicked rgb values to list of arrays
    window.num = 0;
    window.rlist = [];
    window.glist = [];
    window.blist = [];
    // click the screen 4 times to get the rgb values
    APP.canvas.addEventListener('click', () =>{
      window.num += 1;
      window.rlist.push(r);
      window.glist.push(g);
      window.blist.push(b);

    if (window.num === 4) {

      // Calculate the average value from the array
      window.ravg = sumOfRvalues(rlist)/4;
      window.gavg = sumOfGvalues(glist)/4;
      window.bavg = sumOfBvalues(blist)/4;
      // calcu;ate total average of the RGB values
      window.tavg = (ravg + gavg + bavg) /12;

      // r values and average save
      localStorage.setItem("rValue", rlist.join(";"));
      localStorage.setItem("ravg", ravg);
      // g values and average save
      localStorage.setItem("gValue", glist.join(";"));
      localStorage.setItem("gavg", gavg);
      // b values and average save
      localStorage.setItem("bValue", blist.join(";"));
      localStorage.setItem("bavg", bavg);
      localStorage.setItem("tavg", tavg.toFixed(2));

      console.log(rlist);
      console.log(glist);
      console.log(blist);
      console.log(num);
      window.location.href = ("http://localhost:63342/AdColorDetection/exportCSVfile/saveddata.html");
      addData();
    }
    });
  },
};
document.addEventListener('DOMContentLoaded', APP.init);

function  sumOfRvalues (arr) {
         return arr.reduce((
             acc, curr
         ) => acc + curr)
       }
function  sumOfGvalues (arr) {
         return arr.reduce((
             acc, curr
         ) => acc + curr)
       }
function  sumOfBvalues (arr) {
         return arr.reduce((
             acc, curr
         ) => acc + curr)
       }

//https://adcolordetection.000webhostapp.com/saveddata.html
//https://adcolordetection.000webhostapp.com/canvas.html
//https://adcolordetection.000webhostapp.com/