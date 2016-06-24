$(document).ready(function(){
  updateDom();
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
}; //end updateDom

  function showItem(users){
    console.log(users);
    for( i = 0; i < users.length; i++) {
      var something;
      var output;
      var pTag = '<p>' + users[i].list_item + '</p>';
      // output += pTag;
      var button1 = '<button id="statusButton">complete</button>';
      // output += button1;
      var button2 = '<button id="deleteButton">delete</button>';
      // output += button2;
      something = pTag + button1 + button2;
      output = '<div id="' + users[i].id + '">' + something + '</div>';
    // var output = "<div data-id='" + users[i].id + "'><p class='" + users[i].id + "'>" + users[i].list_item + " status: " + "</p><button id='statusButton' class='" + users[i].id + "' data-id='" + users[i].id + "'>incomplete</button><button id='deleteButton' class='" + users[i].id + "' data-id='" + users[i].id + "'>delete</button></div>";
    $('#outputDiv').append(output);
    } //end for loop
  } //end showItem



$(document).ready(function(){
  $('#outputDiv').on('click', '#deleteButton', function(){
    console.log('delete button');
var id = $(this).parent().attr('id');
    console.log(id);
    var deleteUser = {
      'id': id
    };
    $.ajax({
      type: 'POST',
      url: '/deleteItem',
      data: deleteUser
    });
    $(this).parent().remove();
  });
});

$(document).ready(function(){
  $('#outputDiv').on('click', '#statusButton', function(){
    changeColor();
    console.log('status button');
    var id = $(this).parent().attr('id');
    var changeStatus = {
      "status": false,
      "id": id
    };
    $.ajax({
      type: 'POST',
      url: '/updateStatus',
      data: changeStatus
    });
    $.ajax({
      type: 'GET',
      url: '/getStatus',
      success: function(data){
        console.log(data);
      }
    });
  });
  function changeColor(){
    $(this).parent().css('background-color', 'purple');

  }
});
