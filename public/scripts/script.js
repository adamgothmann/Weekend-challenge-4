console.log('sourced');

$(document).ready(function(){
  console.log('jquery');
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
      data: inputObject
    }); //end addItem ajax
    $.ajax({
      type: 'GET',
      url: '/getItem',
      success: function(data){
        console.log(data);
        showItem(data);

      } //end success
    }); //end retrieveItem ajax
  }); //end button click
  function showItem(users){
    console.log(users);
  }
}); //end jQuery function
