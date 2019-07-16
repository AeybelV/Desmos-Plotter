const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const path = require('path');
const url = require('url');
const fs = require('fs');

var getPixels = require("get-pixels");
var _ = require('lodash');
const rgbHex = require('rgb-hex');

let mainWindow;

app.on('ready',function(){
    createMainWindow();
});

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        allowRunningInsecureContent: true,
        webSecurity: false,
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        mainWindow = null;
    })
}
ipcMain.on('parse', (event, arg) => {
    parseImage("C:/Users/aeybe/Desktop/Untitled.png");
})

function parseImage(selectedImage){
    var dimensions;
    var points = [];
    if(selectedImage !== null){
        getPixels(selectedImage, function(err, pixels) {
            if(err) {
              console.log("Bad image path")
              return
            }
            dimensions = pixels.shape.slice()
            console.log(dimensions);
            for(var x = 0; x < dimensions[0]; x++){
                for(var y = 0; y < dimensions[1]; y++){
                    var inputR = Math.floor(pixels.get(x,y,0)*15 /255);
                    var inputG = Math.floor(pixels.get(x,y,1)*15 /255);
                    var inputB = Math.floor(pixels.get(x,y,2)*15 /255);
                    
                    var r = 255 / 15 * inputR;
                    var g = 255 / 15 * inputG;
                    var b = 255 / 15 * inputB;
                    var hex = rgbHex(r,g,b);
                    points.push({x: x, y: y, color: hex});
                }
            }
            sortColors(points);
            // console.log(points);
          })
    }
}

function sortColors(p){
    var pointGroups = [];
    var uniqueColors = _.uniq(_.map(_.flatten(p), function(point) {
        return point.color;
    }));

    for(i=0;i<uniqueColors.length;i++){
        var points = _.filter(p, {color: uniqueColors[i]});
        points = _.map(points,function(x){
            return _.pick(x, ['x','y']);
        })
        pointGroups.push({color: uniqueColors[i], points: points});
    }
    // console.log(pointGroups);
    writeFile(pointGroups)
}

function writeFile(pGroup){
    let data = JSON.stringify(pGroup,null,2);  
    fs.writeFileSync('data.json', data);  
}