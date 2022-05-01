
const btn = document.getElementById("buttonDiv") ;
const btnDown = document.getElementById("btnDown");
const text = document.getElementById("name") ;
const lab = document.getElementById("lab");
const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");
const fourth = document.getElementById("fourth");
const nextButton = document.getElementById("nextButton");
const downloadButton = document.getElementById("downloadButton");
let myCanvasPng = null;

let data;
let step=1 ;
function stepChange(){
    if(text.value){
        data = text.value;
        let str = "bullet"+String(step);
        let bullet = document.getElementById(str) ;
        if(step!=4){
            bullet.classList.add("completed");
            step=step+1;        
            if(step==4){
                let str = "bullet"+String(step);
                let bullet = document.getElementById(str) ;
                bullet.classList.add("finish");
            }
        }
    }
    else{
        text.style.border = "3px solid red" ;
        
    }

}

function disAll(){
    if(step==2){
        first.style.display = "none" ;
        nextButton.disabled=true;
        //console.log(data);
        second.style.display="block";
    }
    else if(step==3){
        second.style.display="none";
        nextButton.disabled=true;
        third.style.display="block";
    }
    else if(step==4){
        third.style.display="none"; 
        btn.style.display="none" ;
        nextButton.disabled=true;
        fourth.style.display="block";
        btnDown.style.display="block" ;
        finalProcess() ;
    }
}
function radioNext(obj){
  
    let radioName="input[name="+obj.name+"]:checked";
    //console.log(radioName);
    
    
        if ($("radioName").length > 0 ){
            $("#nextButton").attr("disabled", true);
        }
        else{
            $("#nextButton").attr("disabled", false);
        }

}
function btnEnable(txt){
    if(txt.value.trim()==""){
        nextButton.disabled=true;
    }
    else{
        nextButton.disabled = false ;
    }
}
function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

function generateimage(source, para){
    myCanvasPng=document.getElementById("myCanvas");
    let ctx = setupCanvas(myCanvasPng);


   // console.log(source);
    let image = new Image();
    image.src = source ;
    //console.log("in generate imag "+data);

    ctx.font="bold 10px Verdana";
    ctx.fillStyle="black" ;
    ctx.drawImage(image,0,0);

    let str = ".para"+para;
    let textElem = document.querySelectorAll(str);
    let cntx = 20;
    let cnty = 50 ;
    for(let i=0;i<textElem.length;i++){
       let temp =  textElem[i].innerText ;
       //console.log("in for texElemloop"+temp);
       cnty = cnty + 30 ; 
       ctx.fillText(temp,cntx,cnty) ;
    }

    ctx.fillStyle = "black" ;
    cnty=cnty+45;
    cntx = cntx+70;
    let p = cntx-7 ;
    let q = cnty-15 ;
    ctx.fillRect(p,q,150,25);
    
    ctx.fillStyle = "white" ;
    ctx.font="bold 13px Verdana";
    finalName = "-  "+data;
    ctx.fillText(finalName,cntx,cnty);

}
function finalProcess(){
    let getpara = document.querySelector('input[name="para"]:checked');
    let getimage = document.querySelector('input[name="img"]:checked');
    
    //console.log(getimage.value);
    //console.log(getpara.value);
    let x = getimage.value;
    let imgDesc = document.getElementById(x);
    let pass = imgDesc.src ;
    let ht = imgDesc.height;
    let wd = imgDesc.width ;
    generateimage(pass,getpara.value);
    
}

function enableDownload(){
    let downloadName = data+".png";
    download(myCanvasPng,downloadName);
}

/* Canvas Donwload */
function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }
  