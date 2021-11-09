var data_All,
  data_Question = '',
  query_string = '',
  type = '',
  filters = [];

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
      showData(data_All);
    }
  ).catch(function error() {
    alert('Fallo *getData()*');
  }));
}

function showData(data) {
  document.getElementById('cards').innerHTML = '';
  for (n = 0; n < data.length; n++) {
    type_Data = (data[n].tipo == 'Arbutus') ? 'Arbutus' : 'Comarostaphylis';
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
  for(m = 0; m < filters.length; m++){
    if(query_string[filters[m]]){
      for(n = 0; n < query_string[filters[m]].length; n++){
        document.getElementById(query_string[filters[m]][n]).checked = true;
      }
    }
  }
}

function getGalleryReady() {
  query_string = QueryStringToJSON();
  type = query_string['tipo'][0];
  filter = (type == 'Arbutus') ? 1 : 2;
  getFilter(filter);
  activeLink(type);
  getData(type);
  filterData();
}

function QueryStringToJSON() {
  var pairs = location.search.slice(1).split('&');
  var result = {};
  var tri = [];
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    // if (result[pair[0]]) result[pair[0]] += ';' + decodeURIComponent(pair[1] || '');
    // else result[pair[0]] = decodeURIComponent(pair[1] || '');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
    var temp = pair[0];
    if(tri[temp]) tri[temp].push(decodeURIComponent(pair[1] || ''));
    else {
      tri[temp] = [];
      tri[temp].push(decodeURIComponent(pair[1] || ''));
    }
  });
  return tri;
}

function activeLink(type) {
  if (type == 'Arbutus') {
    document.getElementById('nav_Arbutus').classList.add('active-link');
  } else if (type == 'Comarostaphylis') {
    document.getElementById('nav_Comarostaphylis').classList.add('active-link');
  }
}

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
      selectFilters();
    }

  ).catch(function error() {
    alert('Fallo *getFilter()*');
  }));
}


function checkFilter() {
  var chk_All = document.querySelectorAll('.chk_All');
  var enabledSet =
    Array.from(chk_All) // Convert checkboxes to an array to use filter and map.
    .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
    .map(i => [i.name + '=' + i.value]) // Use Array.map to extract only the checkbox values from the array of objects.
  var send = '';
  for (var j = 0; j < enabledSet.length; j++) {
    send += enabledSet[j] + '&'
  }
  location.href = 'galeria.html?tipo=' + type + '&' + send;
}

function cleanFilter() {
  location.href = 'galeria.html?tipo=' + type;
}