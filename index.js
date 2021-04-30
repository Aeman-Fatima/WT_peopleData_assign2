$(function(){
    $("#add").click(handleAdd);
});

function handleAdd(){
    $('#error').empty();

    if(!checkInput()){
        return
    };
  
    $("#addEle").append(
    '<tr>'+
    '<td>'+$("#name").val()+'</td>'+
    '<td>'+$('input[name="gender"]:checked').val()+'</td>'+
    '<td>'+$("#age").val()+'</td>'+
    '<td>'+$('#city').find(":selected").text()+'</td>'+
    '<td><a onclick="remove(event)")>Delete</a> / <a id="update">update</a></td>'+
    '</tr>'
    );
    $('#form').trigger("reset");
    
}

function checkInput(){
    var regName = new RegExp('^[a-zA-Z]+$');

    if(!$("#name").val()){
        $('#name').addClass("error");
        return false;
    }
    $("#name").removeClass("error");
    if(!$("#age").val()){
        $('#age').addClass("error");
        return false;
    }
    $("#age").removeClass("error");
    if(!$('input[name="gender"]:checked').val()){
        $('#error').append("Please select Gender")
        return false;
    }
    else if(!regName.test($('#name').val()))
        $('#error').append("Name sould only contain letters");
    else if($('#age').val()<10 || $('#age').val()>50)
        $('#error').append("Age must between 10 and 50");
    else    return true;

    return false;
}

function remove(e){
    e.target.parentNode.parentNode.remove();
        console.log("removed");
}

$(function(){
    $("#addEle").on('click','#update',function(){
        $('#add').prop('disabled', true);
        $('#updateb').prop('disabled', false)
         var currentRow=$(this).closest("tr"); 
         
         var col1=currentRow.find("td:eq(0)").text(); 
         var col2=currentRow.find("td:eq(1)").text(); 
         var col3=currentRow.find("td:eq(2)").text(); 
         var col4=currentRow.find("td:eq(3)").text(); 
     
         $('#name').val(col1);
         $("input[name='gender'][value='"+col2+"']").prop('checked', true);         
         $('#age').val(col3);
         $('#city option').filter(function() {
            return this.textContent == col4;
        }).prop('selected', true);
        
        $(function(){
            $('#updateb').click(function(){
                $('#error').empty();
                if(!checkInput()){
                    return
                };
                currentRow.find("td:eq(0)").html($('#name').val());
                currentRow.find("td:eq(1)").html($('input[name="gender"]:checked').val());
                currentRow.find("td:eq(2)").html($('#age').val());
                currentRow.find("td:eq(3)").html($('#city').find(":selected").val());
            });

        });
    });
});

$(function(){
    $('#reset').click(function(){
        $('#add').prop('disabled', false);
        $('#form').trigger("reset");
        $('#updateb').prop('disabled', true);
        $('#error').empty();
    });
})


