const dialog = require('electron').remote.dialog ;
const { ipcRenderer } = require('electron')

var selectedImage = null;

document.getElementById("file_upload").addEventListener("click",function(){
    const options = {
        title: 'Select a Image to plot',
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] },
        ]
    };
    var selectedPaths = dialog.showOpenDialog(null,options);
    if(selectedPaths !== null){
        selectedImage = selectedPaths[0];
        document.getElementById("filename").innerText = selectedImage;
    }
});

document.getElementById("plot").addEventListener('click',function(){
    ipcRenderer.send('parse', 'ping')
});
