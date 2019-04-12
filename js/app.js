'use strict';

function Horn(horn) {
  this.name = horn.name;
  this.image_url = horn.image_url;
  this.hobbies = horn.hobbies;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.allHorns =[];

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

Horn.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(horn => {
        Horn.allHorns.push(new Horn(horn));
      });
      Horn.allHorns.forEach(horn => {
        $('main').append(horn.render());
      });
    })
    .then(Horn.filter)
    .then(Horn.handlefilter);
};

Horn.filter = () => {
  let filterKeyword = [];

  $('option').not(':first').remove();

  Horn.allHorns.forEach(horn => {
    if(!filterKeyword.includes(horn.keyword))
      filterKeyword.push(horn.keyword);
  });

  filterKeyword.sort();

  filterKeyword.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
};

Horn.handlefilter = () => {
  $('select'). on('change', function () {
    let $selected = $(this).val();
    if ($selected !== 'default') {
      $('div').hide();

      Horn.allHorns.forEach(horn => {
        $($selected === horn.keyword) {
          $(`div[class="${selected}"]`).addClass('filtered').fadeIn();
        }
      });

      $(`option[value]=${$selected}`).fadeIn();
    } else {
      $('div').removeClass('filtered').fadeIn();
      $(`option[value=${$selected}]`).fadeIn();
    }
  })
};


$(() => Horn.readJson());

