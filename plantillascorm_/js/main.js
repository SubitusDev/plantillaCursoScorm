var currentPage = 0;
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var btnNext = document.getElementById("btn-next");
var btnPrev = document.getElementById("btn-prev");
var content = document.getElementById("content");

next.addEventListener("click", nextPage);
prev.addEventListener("click", prevPage);


init();

function init(){
  readHtml(currentPage);
  checkBtnNav('prev');

}

function readHtml(currentPage_){
  var file = files[currentPage_];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {content.innerHTML = this.responseText;}
      if (this.status == 404) {content.innerHTML = "Page not found.";}
    }
  }
  xhttp.open("GET", file, true);
  xhttp.send();
}

function nextPage(){
  if((currentPage + 1) < files.length){
    currentPage++;
    readHtml(currentPage);
    checkBtnNav('next')
  } else {

  }
}

function prevPage(){
  if((currentPage - 1) >= 0){
    currentPage--;
    readHtml(currentPage);
    checkBtnNav('prev');
  } else {

  }
}

function checkBtnNav(state){
  btnPrev.style.display = 'block';
  btnNext.style.display = 'block';
  switch (state) {
    case 'prev':
        if((currentPage - 1) < 0){
          btnPrev.style.display = 'none';
        }
      break;
      case 'next':
        if((currentPage + 1) >= files.length){
          btnNext.style.display = 'none';
          checkIsComplete();
        }
        break;
    default:

  }
}

function checkIsComplete(){
    next.innerHTML = `<button id="btn-eval" type="button" class="btn btn-primary">Evaluación</button>`;
    var eval = document.getElementById("btn-eval");
    eval.addEventListener("click", loadEval());
    //btnNext.style.display = 'block';
}
