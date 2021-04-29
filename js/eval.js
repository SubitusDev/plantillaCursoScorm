var corrects = [];
var answers = [];
var rate = 0;

function loadEval() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    printEval(this);
    }
  };
  xhttp.open("GET", "./xml/quiz.xml", true);
  xhttp.send();
}
function printEval(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var html = `<div id="header" class="jumbotron text-center">
                <h1>Evaluación</h1>
              </div>
              <div id="content" class="container mb-5">
                `;
  var x = xmlDoc.getElementsByTagName("QUESTION");
  for (i = 0; i <x.length; i++) {
    corrects.push(  x[i].getElementsByTagName("CORRECT")[0].childNodes[0].nodeValue);
    answers.push('-');
    html+="<div class='row mt-3'><div class='card' style='width:100%'>";
    html += "<div class='card-header'>" +
    x[i].getElementsByTagName("TEXT")[0].childNodes[0].nodeValue +
    "</div><div class='card-body'><p>"+
    "<input type='radio' id='"+ i +"_a' onclick='checkOption(this)' name='question" + i + "' value='a'><label class='ml-2' for='"+ i +"_a'>" +
    x[i].getElementsByTagName("OPTION__A")[0].childNodes[0].nodeValue +"</label><br>" +
    "<input type='radio' id='"+ i +"_b' onclick='checkOption(this)' name='question" + i + "' value='b'><label class='ml-2' for='"+ i +"_b'>" +
    x[i].getElementsByTagName("OPTION__B")[0].childNodes[0].nodeValue +"</label><br>" +
    "<input type='radio' id='"+ i +"_c' onclick='checkOption(this)' name='question" + i + "' value='c'><label class='ml-2' for='"+ i +"_c'>" +
    x[i].getElementsByTagName("OPTION__C")[0].childNodes[0].nodeValue +"</label><br>" +
    "</p></div></div></div>";
  }
  html += "<br><input id='send_eval' onclick='rateEval()' class='btn btn-primary' type='submit' value='Enviar Respuestas'></div>"
  document.getElementById("content").innerHTML = html;

  var eval = document.getElementById("btn-eval");
  eval.style.display = 'none';
  document.getElementById("btn-prev").style.display = 'none';
}

function rateEval(){
  for(var i = 0; i < corrects.length; i++){
    if(corrects[i] == answers[i]){
      rate++;
    }
  }
  var newScore = rate * 20;
  var setScoreFinal, setStatusFinal;
  setScoreFinal = set("cmi.core.score.raw",newScore);
  if(rate >= 4){
    alert("¡Felicidades! has aprobado el curso");
    setStatusFinal = set("cmi.core.lesson_status","passed");
   } else {
    alert("Lo sentimos, no has logrado la calificación mínima aprobatoria");
    setStatusFinal = set("cmi.core.lesson_status","failed");
  }
  save();
}

function checkOption(elem){

  var id = elem.getAttribute("id");
  var idArr = id.split('_');
  answers[idArr[0]] = elem.getAttribute("value");
  console.log(answers);
}
