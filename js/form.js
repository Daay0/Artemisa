var data_All = [], data_Answer = [], n_Question = 0, q_Question = 0, type_General = '';
const lbl_Question = document.getElementById('lbl_Question'), lbl_Desc = document.getElementById('lbl_Desc'), div_Option = document.getElementById('div_Option');

// Loader
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});

function getData(type){
    type_General = type;
    res = (type == 'Arbutus') ? 1 : 2;
    url = 'http://localhost:3000/task/buscar/' + res;
    fetch(url).then(res => res.json().then(
        function data(data){
            q_Question = data.length;
            n_Question = 0;
            temp = json2array(data);
            for(n = 0; n < temp.length; n++){
                data_All.push(temp[n]);
            }
            setQuestion(0);
        }
        ));
}

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

function setQuestion(data){
    lbl_Question.innerHTML = data_All[data].pregunta;
    lbl_Desc.innerHTML = data_All[data].descripcion;
    div_Option.innerHTML = '';
    for(n = 0; n < data_All[data].result.length; n++){
        div_Option.innerHTML += '<button href="#" class="button" id="' + data_All[data].result[n] + '" value="' + data_All[data].result[n] + '" onclick="selectAnswer(this.value)">' + data_All[data].result[n] + '</button>'
    }
    n_Question++;
}

function selectAnswer(data){
    if(n_Question < q_Question){
        data_Answer.push(data);
        setQuestion(n_Question);
    } else{
        console.log(data)
        data_Answer.push(data);
        sendData();
    }
}

function sendData(){
    url = 'galeria.html?tipo='+type_General;
    for (m = 0; m < data_All.length; m++) {
            url += '&' + data_All[m].pregunta + '=' + data_Answer[m];
      }
    location.href = url;
}

// function cambio(res){
//     if (n_Pregunta != 0) {
//         if (n_Pregunta < n_Tipo) {
//             document.getElementById('pregunta' + n_Pregunta).classList.remove('d-none');
//             document.getElementById('pregunta' + (n_Pregunta - 1)).classList.add('d-none');
//         }
//         if (n_Pregunta < n_Tipo) {
//             resp.push(res);
//         } else {
//             resp.push(res);
//             console.log(resp)
//             send += "tipo=" + resp[0] + "&";
//             //enviar datos a galeria
//             for (var j = 0; j < data.length; j++) {
//                 send += data[j].pregunta + "=" + resp[j + 1] + "&";

//             }
//             location.href = 'galeria.html' + send;
//         }
//     } else {
//         resp.push(res);
//         document.getElementById('pregunta' + (n_Pregunta)).classList.remove('d-none');
//     }
//     n_Pregunta++;
// }

// function pregunta(tipo) {
//     res = (tipo == 1) ? 'Arbutus' : 'Comarostaphylis';
//     url = 'http://localhost:3000/task/buscar/' + tipo;
//     fetch(url).then(Response => Response.json()).then(
//         function content(info){
//             console.log(info)
//             data = info;
//             for (var i = 0; i < info.length; i++) {
//                 document.getElementById('main').innerHTML += '<div class="card d-none" id="pregunta' + i + '">' +
//                     '<div class="section__title">' + info[i].pregunta + '</div>' +
//                     '<p class="form__description">' +
//                     info[i].descripcion +
//                     '</p>' +
//                     '<div id="respuestas' + i + '"></div>' +
//                     '</div>'
//                 for (var j = 0; j < info[i].result.length; j++) {
//                     document.getElementById('respuestas' + i).innerHTML += '<button href="#" class="button" onclick="cambio(this.value)" id="' + info[i].result[j] + '" value="' + info[i].result[j] + '">' +
//                         info[i].result[j] +
//                         '</button>';
//                 }
//             }
//             n_Tipo = info.length;
//             document.getElementById('pregunta').classList.add('d-none');
//             cambio(res);
//         }).catch(function Error() {
//             alert('Fallo');
//         })
// }