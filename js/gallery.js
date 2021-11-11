var data_All = [], data_Question = '', query_string = '', type = '', filters = [], asd = [];

function loader(){
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
}

//Obtener datos de los arbutus a buscar
function getData(type) {
  if (type == null) {
    url = 'http://localhost:3000/task/galeria/';
  } else {
    url = 'http://localhost:3000/task/galeria/' + type;
  }
  fetch(url).then(res => res.json().then(
    function data(data) {
      temp = json2array(data);
            for(n = 0; n < temp.length; n++){
                data_All.push(temp[n]);
            }
            showData(data_All);
            filterData();
    }
  ).catch(function error() {
    alert('Fallo *getData()*');
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

//Muestra todos los datos seleccionados ingrsandolos en trajetas
function showData(data) {
  document.getElementById('cards').innerHTML = '';
  for (n = 0; n < data.length; n++) {
    type_Data = (data[n].tipo == 'Arbutus') ? 'Arbutus' : 'Comarostaphylis';
    document.getElementById('cards').innerHTML += '<li>' +
      '<div href="#" class="card">' +
      '<img src="img/madroños/' + data[n].especie + '.jpg" class="card__image  img-fluid" alt="' + data[n].especie + '" />' +
      '<div class="card__overlay">' +
      '<div class="card__header">' +
      '<img class="card__thumb" src="img/madroños/' + data[n].especie + '.jpg" alt="' + data[n].especie + '" />' +
      ' <div class="card__header-text">' +
      '<h3 class="card__title">' + data[n].especie + '</h3>' +
      '<span class="card__status">' + type_Data + '</span>' +
      '</div>' +
      '</div>' +
      '<div id="scroll">' +
      '<p class="card__description" id="estado' + n + '_Fill"><b>Estado: </b></p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>';
    for (m = 0; m < data[n].estado.length; m++) {
      document.getElementById('estado' + n + '_Fill').innerHTML += '<span class="dot">' + data[n].estado[m] + '</span>'
    }
  }
}

//Filtra los datos obtenidos en base a las caracteristicas seleccionadas
function filterData() {
    for (m = 0; m < filters.length; m++) {
      if (query_string[filters[m]]) {        
        for (n = 0; n < query_string[filters[m]].length; n++) {
          console.log(query_string[filters[m]][n]);
        }
      }
    }
  //showData(filtered_Data);
}

//Verifica que opciones hay en query string y las selecciona
function selectFilters() {
  for (m = 0; m < filters.length; m++) {
    if (query_string[filters[m]]) {
      for (n = 0; n < query_string[filters[m]].length; n++) {
        document.getElementById(query_string[filters[m]][n]).checked = true;
      }
    }
  }
}

//Inicializacion del documento
function getGalleryReady() {
  query_string = QueryStringToArray();
  type = query_string['tipo'][0];
  filter = (type == 'Arbutus') ? 1 : 2;
  getFilter(filter);
  activeLink(type);
  getData(type);
  loader();
}

//Obtener Query String de la direccion
function QueryStringToArray() {
  var pairs = location.search.slice(1).split('&');
  var result = {};
  var tri = [];
  pairs.forEach(function (pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
    var temp = pair[0];
    if (tri[temp]) tri[temp].push(decodeURIComponent(pair[1] || ''));
    else {
      tri[temp] = [];
      tri[temp].push(decodeURIComponent(pair[1] || ''));
    }
  });
  return tri;
}

//seleccion que tipo de Madroño esta buscando (Solo decorativo)
function activeLink(type) {
  if (type == 'Arbutus') {
    document.getElementById('nav_Arbutus').classList.add('active-link');
  } else if (type == 'Comarostaphylis') {
    document.getElementById('nav_Comarostaphylis').classList.add('active-link');
  }
}

//Obtener filtro segun el tipo de Madroño
function getFilter(type) {
  url = 'http://localhost:3000/task/buscar/' + type;
  fetch(url).then(res => res.json().then(
    function data(data) {
      data_Question = '1';
      for (n = 0; n < data.length; n++) {
        filters.push(data[n].pregunta);
        document.getElementById('fill_Filter').innerHTML += '<form class="form-container" id="' + data[n].pregunta + '">' +
          '<h3 class="subtitle__main" >' + data[n].descripcion + '</h3>' +
          '</form>';
        for (m = 0; m < data[n].result.length; m++) {
          document.getElementById(data[n].pregunta).innerHTML += '<label class="checkbox">' +
            '<input type="checkbox" class="chk_All" id="' + data[n].result[m] + '" name="' + data[n].pregunta + '" value="' + data[n].result[m] + '">' + data[n].result[m] +
            '<span class="check"></span>' +
            '</label>';
        }
      }
      console.log(filters)
      selectFilters();
    }
  ).catch(function error() {
    alert('Fallo *getFilter()*');
  }));
}

//revisar que opciones estan seleccionadas y enviar a query string
function checkFilter() {
  var chk_All = document.querySelectorAll('.chk_All');
  var enabledSet =
    Array.from(chk_All) 
    .filter(i => i.checked) 
    .map(i => [i.name + '=' + i.value])
  var send = '';
  for (var j = 0; j < enabledSet.length; j++) {
    send += enabledSet[j] + '&'
  }
  location.href = 'galeria.html?tipo=' + type + '&' + send;
}

//limpiar todas las opciones y query string
function cleanFilter() {
  location.href = 'galeria.html?tipo=' + type;
}