var data_All = '', data_Question = '', query_string = '';



function getData(type) {
  data_All = null;
  if (type == null) {
    url = 'http://localhost:3000/task/galeria/';
  } else {
    url = 'http://localhost:3000/task/galeria/' + type;
  }
  fetch(url).then(res => res.json().then(
    function data(data) {
      data_All = data;
      console.log(data_All);
      showData(data_All);
    }
  ).catch(function error() {
    alert('Fallo *getData()*');
  }));
}

function showData(data) {
  document.getElementById('cards').innerHTML = '';
  for (n = 0; n < data.length; n++) {
    type_Data = (data[n].tipo == 0) ? 'Arbutus' : 'Comarostaphylis';
    document.getElementById('cards').innerHTML += '<li>' +
      '<a href="#" class="card">' +
      '<img src="img/madroños/' + data[n].especie + '.jpg" class="card__image" alt="' + data[n].especie + '" />' +
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
      '</a>' +
      '</li>';

    for (m = 0; m < data[n].estado.length; m++) {
      document.getElementById('estado' + n + '_Fill').innerHTML += '<span class="dot">' + data[n].estado[m] + '</span>'
    }
  }
}

function filterData() {


  //showData(filtered_Data);
}

function selectFilters() {

}

function getGalleryReady() {
  query_string = QueryStringToJSON();
  type = query_string['tipo'];
  filter = (type == 'Arbutus') ? 1 : 2;
  getFilter(filter);
  activeLink(type);
  getData(type);
  console.log(type);
  console.log(query_string);
  console.log(data_Question);
  filterData();
}

function QueryStringToJSON() {
  var pairs = location.search.slice(1).split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
}

function activeLink(type){
  if(type == 'Arbutus'){
    document.getElementById('nav_Arbutus').classList.add('active-link');
  }else if(type == 'Comarostaphylis'){
    document.getElementById('nav_Comarostaphylis').classList.add('active-link');
  }
}

function getFilter(type) {
  url = 'http://localhost:3000/task/buscar/' + type;
  fetch(url).then(res => res.json().then(
    function data(data) {
      data_Question = data;
      for (n = 0; n < data.length; n++) {
        document.getElementById('fill_Filter').innerHTML += '<form class="form-container" id="' + data[n].pregunta + n + '">' +
          '<h3 class="subtitle__main" >' + data[n].pregunta + '</h3>' +
          '</form>';
        for (m = 0; m < data[n].result.length; m++) {
          document.getElementById(data[n].pregunta + n).innerHTML += '<label class="checkbox" id="' + data[n].result[m] + '">' +
            '<input type="checkbox">' + data[n].result[m] +
            '<span class="check"></span>' +
            '</label>';
        }
      }
    }
  ).catch(function error() {
    alert('Fallo *getFilter()*');
  }));
}
