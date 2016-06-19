$(document).ready(function(){
  console.log('jquery');
  // updateDom();
  $('#addItem').on('click', function(){
    var input = $('#listInput').val();
    //generating object
    var inputObject = {
      "input": input,
      "status": false
    };
    console.log(inputObject);
    $.ajax({
      type: 'POST',
      url: '/addItem',
      data: inputObject,
      success: function() {
      } //end success
    }); //end addItem ajax
    $('#listInput').val('');
    updateDom();
  }); //end addItem click


}); //end jQuery function
var updateDom = function(){
  $('#outputDiv').empty();
  $.ajax({
    type: 'GET',
    url: '/getItem',
    success: function(data){
      showItem(data);
      console.log('something');
    } //end success
  }); //end retrieveItem ajax
};

  function showItem(users){
    console.log(users);
    for( i = 0; i < users.length; i++) {
    var output = document.createElement('div');
    var text = "<p>" + users[i].list_item + " status: " + "</p><button id='statusButton'class='statusButton' data-id='" + users[i].id + "'>incomplete</button><button id='deleteButton' class='delete' data-id='" + users[i].id + "'>delete</button>";
    output.textContent = text;
    $('body').append(output);
    } //end for loop
  } //end showItem

$(document).ready(function(){
  $('#outputDiv').on('click', '#deleteButton', function(){
    console.log('delete button');
    var deleteById = $(this).attr('data-id');
    console.log(deleteById);
    var deleteUser = {
      'id': deleteById
    };
    $.ajax({
      type: 'POST',
      url: '/deleteItem',
      data: deleteUser
    });

  });
});
