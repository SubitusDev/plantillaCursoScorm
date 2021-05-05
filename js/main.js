var currentPage = 0;
var iconmenu = false;

var btnPrev = document.getElementById("btn-prev");
var content = document.getElementById("content");
var btnmenu = document.getElementById("menu-toggle");
var barprogress = document.getElementById("bar-progress");
var loaderDisplayer = document.getElementById("loader-content");

btnmenu.addEventListener("click", toggleMenu);
btnmenu.addEventListener("touchstart", toggleMenu);

init();

/****
init()
Funcion iniciadora de configuraciones y carga de primera página.
****/

function init(){
  loadConfig();
  checkConnectionLMS();
  loadMenu();
  changePage()
}

/****
loadConfig: Carga la configuración del template contenida en config.js, se auxilia de las sig funciones:
  setTemplateColors: Configura los colores de la configuracion del template.
  setLoader: Configura los colores y estilos para el loader.

****/

function loadConfig(){
  document.getElementById("name_course").innerHTML = template.course;
  document.getElementById("name_course_mob").innerHTML = template.course;
  document.getElementById("img_logo_course").src = template.image;
  document.getElementById("img_logo_course_mob").src = template.image;
  setTemplateColors();
  if(showLoader){
    setLoader(template.loader,template.color_loader,template.color_loader_bg);
  } else {
    loaderDisplayer.style.display = "none";
  }
}

function setTemplateColors(){
  var root = document.documentElement;
  if(template.color_nav != "")root.style.setProperty('--colornav',template.color_nav);
  if(template.color_menu != "")root.style.setProperty('--colorwrap',template.color_menu);
  if(template.color_bar_progress != "")root.style.setProperty('--colorbarprogress',template.color_bar_progress);
  if(template.color_link_menu_active != "")root.style.setProperty('--colorlinkactive',template.color_link_menu_active);
  if(template.color_border_menu_active != "")root.style.setProperty('--colorborderleft',template.color_border_menu_active);

}

function setLoader(loader,colorLoader,colorLoaderBg){
  var root = document.documentElement;
  root.style.setProperty('--colorbgloader',colorLoaderBg);
  root.style.setProperty('--colorloader',colorLoader);
  var containerLoader = document.getElementById("loader-center-absolute");
  //Loaders: default, circle, ring, dual-ring, ellipsis, facebook, grid, heart, hourglass, ripple, roller, spinner
  switch (loader) {
    case 'default':
        containerLoader.innerHTML = '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
      break;
    case 'circle':
        containerLoader.innerHTML = '<div class="lds-circle"></div>';
      break;
    case 'ring':
        containerLoader.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
      break;
    case 'dual-ring':
        containerLoader.innerHTML = '<div class="lds-dual-ring"></div>';
      break;
    case 'ellipsis':
        containerLoader.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
      break;
    case 'facebook':
        containerLoader.innerHTML = '<div class="lds-facebook"><div></div><div></div><div></div></div>';
      break;
    case 'grid':
        containerLoader.innerHTML = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
      break;
    case 'heart':
        containerLoader.innerHTML = '<div class="lds-heart"><div></div></div>';
      break;
    case 'hourglass':
        containerLoader.innerHTML = '<div class="lds-hourglass"></div>';
      break;
    case 'ripple':
        containerLoader.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
      break;
    case 'roller':
        containerLoader.innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
      break;
    case 'spinner':
        containerLoader.innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
      break;
    default:

  }

}

/****
checkConnectionLMS: Funcion para checar si esta habilitada la comunicación SCORM
****/
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

/*****
Funciones del menu
setItemMenu: agrega funcionalidad a cada item del menu para cuando se le da click
toggleMenu: Cambia el icono del menu al abrir/cerrar el menu
changeClassIe9: función para manejar el cambio de clases.
removeClassLink: quita la clase de menu activo en los items del menu
****/

function setItemMenu(){
  var itemmenu = document.getElementsByClassName('list-group-item-action');
  for(imenu in itemmenu){
    itemmenu[imenu].onclick = function(){
      removeClassLink();
      //console.log(this.getAttribute( "data-link"));
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


/****
Funciones de carga de Contenido y navegación:
readHtml: lee desde xml el contenido de las paginas basadas en el indice del arreglo files.
loadMenu: lee desde xml el contenido del menu.
nextPage
prevPage
goPage
changePage: Ejecuta varias funciones de cambio de pagina para evitar repetir código
checkPageMenu: Revisa si la pagina actual esta en el menu y la marca como visitada.
*****/


function readHtml(currentPage_){
  if(showLoader)loaderDisplayer.style.display = "block";
  var file = files[currentPage_];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {content.innerHTML = this.responseText;}
      if (this.status == 404) {content.innerHTML = "Page not found.";}
      if(showLoader)setTimeout(function(){ loaderDisplayer.style.display = "none"; }, 1000);


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
    checkBtnNav('prev');
    checkPageMenu();
  }
}

function prevPage(){
  if((currentPage - 1) >= 0){
    currentPage--;
    setProgress((currentPage+1)*100/files.length);
    readHtml(currentPage);
    checkBtnNav('prev');
    checkPageMenu();
  }
}

function goPage(page){
  //console.log("PAge: ",files.indexOf("./content/"+page));
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
  checkPageMenu();
  checkBtnNav('prev');
}

function checkPageMenu(){
  var page = files[currentPage];
  var itemmenu = document.getElementsByClassName('list-group-item-action');
  for(i = 0; i < itemmenu.length; i++){
    if(itemmenu[i].getAttribute( "data-link") == page){
      removeClassLink();
      itemmenu[i].classList.add("link-active");
    }
  }
}

function checkIsComplete(){
    next.innerHTML = `<button id="btn-eval" type="button" class="btn btn-primary">Evaluación</button>`;
    var eval = document.getElementById("btn-eval");
    eval.addEventListener("click", loadEval());
    //btnNext.style.display = 'block';
}
