/*
files: Arreglo de paginas a mostrar en el curso, se debe cargar desde la carpeta content:
Ejemplo ["./content/pagina1.html",
"./content/pagina2.html"...]
 */

var files = [
'./content/1.html',
'./content/2.html',
'./content/3.html'
];


/*
template: Configuración para los elementos del template, sin necesidad de ir al css.
Loaders: default, circle, ring, dual-ring, ellipsis, facebook, grid, heart, hourglass, ripple, roller, spinner
*/

var template = {
  course: "Plantilla Scorm",
  image: "./img/logo.png",
  loader: "ellipsis",
  color_loader_bg: "#dea478",
  color_loader: "#fed",
  color_nav: "transparent",
  color_nav_text: "#fff",
  color_menu: "#fff",
  color_menu_text: "#000",
  color_bar_progress: "red",
  color_link_menu_active: "#fed",
  color_border_menu_active: "#000",
};

/*
connectionLMS: habilita la comunicación SCORM enla Plantilla.
showLoader: Habilita el loader en cada cambio de página.
*/
var connectionLMS = false;
var showLoader = true;
