'use strict';

//creates constructor function

function Horn(horn) {
  this.name = horn.name;
  this.image_url = horn.image_url;
  this.hobbies = horn.hobbies;
}

// creates array with all objects from the constructor function

Horn.allHorns =[];

// declares function that clones the empty div elements, populates it with properties from each object, and deletes the emplty div. 

Horn.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let hornClone = $ ('div[class="clone"]');

  let hornHtml = $('#horn-template').html();

  hornClone.html(hornHtml)

  hornClone.find('h2').text(this.name);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.hobbies);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.name);
}

// creates a promise that once the json file is read, data from each object will be populated into the new div template.

Horn.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horn.allHorns.push(new Horn(item));
      });

      // .then(Horn.loadHorns)

      Horn.allHorns.forEach (horn => {
        $('main').append(horn.render());
      });
    })
    .then(Horn.populateFilter)
    .then(Horn.handleFilter);
};

// creates function that iterates through the horns array and renders each object to the page.

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render())
}

Horn.populateFilter = () => {
  let filterKeywords = [];
  $('option').not(':first').remove();
  Horn.all.forEach(horn => {
    if (!filterKeywords.includes(horn.keyword))
    filterKeywords.push(horn.keyword);
  });

  filterKeywrods.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">
    ${keyword}</option>`;
    $('select').append(optionTag);
  });
};

Horn.handleFilter = () => {
  $('select').on('change',function () {
    let $selected = $(this).val();
    if ($slected !== 'default') {
      $(div).hide();

      Horn.all.forEach(horn =>{
        if ($selected === horn.keyword) {
          $(`div[class="${$selected}"`).addClass
          ('filtered').fadeIn();
        }
      });

      $(`option[value="${selected}]`).fadeIn();
    } else {
      $('div').removeClass('filtered').fadeIn();
      $(`option[value=${selected}]`).fadeIn();
    }
  });
}

//Loads the json data

$(() => Horn.readJson());

// $('select[name="animals"]').on('change', function () {
//   let $selection = $(this).val();
//   $('data/page-1.json').hide()
//   $(`data/page-1.json[keyword="${selection}"]`).show()
// })
