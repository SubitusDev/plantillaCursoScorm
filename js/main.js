var currentPage = 0;
var connectionLMS = false;
var iconmenu = false;

var btnPrev = document.getElementById("btn-prev");
var content = document.getElementById("content");
var btnmenu = document.getElementById("menu-toggle");
var barprogress = document.getElementById("bar-progress");

btnmenu.addEventListener("click", toggleMenu);
btnmenu.addEventListener("touchstart", toggleMenu);

init();


function init(){
  checkConnectionLMS();
  loadMenu();

  changePage()
}

function checkConnectionLMS(){
  if(connectionLMS){
    window.addEventListener("load", function(event) {
        initSCORM();
      });

    window.addEventListener("unload", function(event) {
        endSCORM();
      })
  }
}

function setItemMenu(){
  var itemmenu = document.getElementsByClassName('list-group-item-action');
  for(imenu in itemmenu){
    itemmenu[imenu].onclick = function(){
      removeClassLink();
      console.log(this.getAttribute( "data-link"));
      goPage(this.getAttribute( "data-link"));
      this.classList.add("link-active");
    }
  }
}


function toggleMenu(){
  var detector = new MobileDetect(window.navigator.userAgent)
  if(detector.phone() != null){
    $('#modal-menu').modal('show');

  } else {
    
    var imenu = document.getElementById("ico-menu");
    if(!iconmenu){
      changeClassIe9(imenu, "bi-layout-sidebar-inset");
      changeClassIe9(imenu, "bi-layout-sidebar");
      iconmenu = true;
    } else {
      changeClassIe9(imenu, "bi-layout-sidebar");
      changeClassIe9(imenu, "bi-layout-sidebar-inset");
      iconmenu = false;
    }
    var wrapper = document.getElementById("wrapper");
    changeClassIe9(wrapper, "toggled");
  }

}



function changeClassIe9(element, class_){
  if (element.classList) {
    element.classList.toggle(class_);
  } else {
    // For IE9
    var classes = element.className.split(" ");
    var i = classes.indexOf(class_);

    if (i >= 0)
      classes.splice(i, 1);
    else
      classes.push(class_);
      element.className = classes.join(" ");
  }

}

function removeClassLink(){
  var itemmenu = document.getElementsByClassName('list-group-item-action');
  for(i = 0; i < itemmenu.length; i++){
    // console.log(itemmenu[i].classList);
    if (itemmenu[i].classList.contains("link-active")) {
      itemmenu[i].classList.remove("link-active");
    }
  }
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

function loadMenu(){
  var file = "./template/menu.html";
  var xhttp = new XMLHttpRequest();
  var menu = document.getElementById("menu");
  var menumob = document.getElementById("menu-mobile");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {menu.innerHTML = this.responseText;menumob.innerHTML = this.responseText;}
      if (this.status == 404) {menu.innerHTML = "Page not found.";menumob.innerHTML = "Page not found.";}
      setItemMenu();
    }
  }
  xhttp.open("GET", file, true);
  xhttp.send();
}

function nextPage(){
  if((currentPage + 1) < files.length){
    currentPage++;
    setProgress((currentPage+1)*100/files.length);
    readHtml(currentPage);
    checkBtnNav('next')
  } else {

  }
}

function prevPage(){
  if((currentPage - 1) >= 0){
    currentPage--;
    setProgress((currentPage+1)*100/files.length);
    readHtml(currentPage);
    checkBtnNav('prev');
  } else {

  }
}

function goPage(page){
  console.log("PAge: ",files.indexOf("./content/"+page));
  currentPage = files.indexOf("./content/"+page);
  changePage()
  closeModal();
}
function closeModal(){
  console.log("close Modal");
  $('#modal-menu').modal('hide');
}

function checkBtnNav(state){
  btnPrev.style.display = 'block';
  // btnNext.style.display = 'block';
  switch (state) {
    case 'prev':
        if((currentPage - 1) < 0){
          btnPrev.style.display = 'none';
        }
      break;
      case 'next':
        if((currentPage + 1) >= files.length){
          btnNext.style.display = 'none';
          //checkIsComplete();
        }
        break;
    default:

  }
}

function setProgress(progress){
  console.log("progress: ", progress);
  barprogress.style.width = progress+"%";
}

function changePage(){
  readHtml(currentPage);
  setProgress((currentPage+1)*100/files.length);
  checkBtnNav('prev');
}

function checkIsComplete(){
    next.innerHTML = `<button id="btn-eval" type="button" class="btn btn-primary">Evaluación</button>`;
    var eval = document.getElementById("btn-eval");
    eval.addEventListener("click", loadEval());
    //btnNext.style.display = 'block';
}
