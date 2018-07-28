$(document).ready(function() {
  //GET/READ
  $('.getAll').on('click', e => {
    $.ajax({
      url: '/lists',
      contentType: 'application/json',
      success: (res) => {
        let ul = $('#list');
        ul.html('');
        res.lists.forEach(list => {
          ul.append('<li id="'+list.id+'">'+
                      '<input type="checkbox" class="status">'+
                      list.id+
                      '<input type="text" class="list-name" value="'+list.name+'">'+
                      '<button class="update">UPDATE</button>'+
                      '<button class="delete">DELETE</button>'+
                    '</li>'
                    )
        })
      }
    });
  });

  //CREATE/post
  $('#form').on('submit', e => {
    e.preventDefault();

    let createBtn = $('.submitBtn');
    let createInput = $('#input')

    $.ajax({
      url: '/lists',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ name: createInput.val() }),
      success: (res) => {
        console.log(res);
        createInput.val('');
        $('.getAll').click();
      }
    });
  });

  //UPDATE/PUT
  $('ul').on('click', '.update', e => {
    let li = $(this.activeElement).closest('li');
    let id = li.text().slice(0, 1);
    let newName = li.find('.list-name').val();

    $.ajax({
      url: '/lists/' + id,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ newName: newName }),
      success: (res) => {
        console.log(res);
        $('.getAll').click();
      }
    });
  });

  //DELETE
  $('ul').on('click', '.delete', e => {
    let li = $(this.activeElement).closest('li');
    let id = li.text().slice(0, 1);

    $.ajax({
      url: '/lists/' +id,
      method: 'DELETE',
      contentType: 'application/json',
      success: (res) => {
        console.log(res);
        $('.getAll').click();
      }
    });
  });

  //complete
  $('ul').on('click', '.status', e => {
    let status = $(this.activeElement).prop('checked');
    if(status == true){
      $(this.activeElement).parent().css({'text-decoration': 'line-through','color': '#a0a0a0'})
    }else if(status == false){
      $(this.activeElement).parent().css({'text-decoration': 'none','color': 'black'})
    }
  });

});
