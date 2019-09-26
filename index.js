var request =  new XMLHttpRequest();

request.onreadystatechange = function(){
    if(request.readyState == 4){
        console.log("Success!");
    }
    else if(request.onreadystatechange == 200 ){
        console.log("Something went wrong with the request!")
    } else if(request.onreadystatechange == 405){
        console.log("Something went wrong with the request!")
    }
}

const URL = "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable";

request.open('POST',URL)

function processForm(e){
    if (e.cancelable) e.preventDefault;
     

}

var form = document.getElementById('UPFORM');
form.addEventListener("submit",processForm);