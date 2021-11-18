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
        ).catch(function error(){
            location.href = 'error404.html'
        }));
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
