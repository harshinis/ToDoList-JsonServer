//app.js
$(document).ready(function(){
    var myul = $("#myUL");
    
    var myArray = [];

    var jsonData = function( form ) {
        var arrData = form.serializeArray(),
            objData = {};
         
        $.each( arrData, function( index, elem ) {
            objData[elem.name] = elem.value;
        });
         
        return JSON.stringify( objData );
    };



    // DISPLAYING list
    $.ajax({
        url: 'http://localhost:3000/TodoList',
        type: "GET",
        dataType: 'JSON',

        success: function(response){
            console.log("Sucess!!", response);
            if(response) {
                myArray = response;
                for(var i = 0; i < response.length; i++){
                    $("#myUL").append('<li id="items">'+response[i].name+'<span class="close" id="'+response[i].id+'">'+"\u00D7"+'</span>'+'<input type="button" value="Update" class="update" id="'+response[i].id+'">'+'</li>');
                }   
            }
        
        },
        error: function(err) {
            console.log('this is error: ', err);
        }
    });


    function display(Url){
        return $.ajax({
            url: Url,
            type: "GET",
            dataType: 'JSON',
    
            success: function(response){
                console.log("Sucess!!", response);
                if(response) {
                    myArray = response;
                    for(var i = 0; i < response.length; i++){
                        $("#myUL").append('<li id="items">'+response[i].name+'<span class="close" id="'+response[i].id+'">'+"\u00D7"+'</span>'+'<input type="button" value="Update" class="update" id="'+response[i].id+'">'+'</li>');
                    }   
                }
              
            },
            error: function(err) {
                console.log('this is error: ', err);
            }
        });    
    }
    
   
    // adding list
    $(".addBtn").on('click', function(){
        var name = $('#myInput').val();
        var id;

        $.ajax({
            url: 'http://localhost:3000/TodoList',
            type: "GET",
            dataType: 'JSON',
    
            success: function(response){
                console.log("Sucess!!", response);
                id = response.length;
              
            },
            error: function(err) {
                console.log('this is error: ', err);
            }
        });

        var dataVal = {
            id: id,
            name: name
        }
       
        $.ajax({
            url: 'http://localhost:3000/TodoList',
            data:dataVal,
            type: "POST", 
            dataType: 'JSON',

            success: function(data){
                console.log(data);
                $("#myUL").append('<li>'+ dataVal.name+'<span class="close">'+"\u00D7"+'</span>'+'</li>');
            },
        
            error: function(err) {
                console.log('this is error: ', err);
            }
        });
    }); 
      
      
    //deleting the item

    $("ul").on('click', 'span', function(){

        var id = $(this).attr('id');
        console.log('this id: ', id);
     
        var Url = 'http://localhost:3000/TodoList/' + id;
        $.ajax({
            url: Url,
            type: "DELETE", 
            dataType: 'JSON',
        
            success: function(data){
                console.log(data);
                
                $("#myUL").empty(); //removes child nodes and content from selected elements 
                
                display('http://localhost:3000/TodoList');
            },
        
            error: function(err) {
                console.log('this is error: ', err);
             }
        });
    }); 


    //Updating element

    $("ul").on('click', 'li .update', function(){

        var id = $(this).attr('id');
        console.log('this id: ', id);

        var Url = 'http://localhost:3000/TodoList/' + id;

        var txt = $(this).parent().text();
        var field = $(this).parent().text("");
        $('<li>'+"<input type='text' id='edit'>"+'</li>').appendTo(field).focus();
        
        //console.log("Name val: ", $("input:text").val());
        // $(this).parent().append("<input type='text'>").focus();
        // $('<input type="text" placeholder="' + text + '" />')

        var dataVal;
        $('#edit').keypress(function(e){
            if(e.which == 13){//Enter key pressed
                console.log("Right");
                var n = $("li #edit").val();
                dataVal = {
                    id: id,
                    name: n
                }


                console.log("Data val: ", dataVal);
                //$("#myUL").append('<li>'+ dataVal.name+'<span class="close">'+"\u00D7"+'</span>'+'</li>');

                $.ajax({
                    url: Url,
                    type: "DELETE", 
                    dataType: 'JSON',
                
                    success: function(data){
                        console.log(data);
                        
                        $.ajax({
                            url: 'http://localhost:3000/TodoList',
                            type: "POST", 
                            data: dataVal,
                            dataType: 'JSON',
                        
                            success: function(data){
                                console.log(data);
                                $("#myUL").append('<li>'+ dataVal.name+'<span class="close">'+"\u00D7"+'</span>'+'</li>');
                                $("#myUL").empty(); //removes child nodes and content from selected elements 
                        
                                display('http://localhost:3000/TodoList');
                            },
                        
                            error: function(err) {
                                console.log('this is error: ', err);
                            }
                        });
                    },
                
                    error: function(err) {
                        console.log('this is error: ', err);
                     }
                });
             
               
            }
        });
     
        
    }); 

});
        
        