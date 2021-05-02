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
    '<td><button class="update"  id="update">Update</button>  /  <button class="delete" onclick="remove(event)")>Remove</button></td>'+
    '</tr>'
    );
    $('#form').trigger("reset");
    
}

function checkInput(){
    var regName = new RegExp('(^[a-zA-Z]{1,10})+$');

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
        $('#error').append("Name sould only contain letters, length[min 1, max 10]");
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
    $("#addEle").on('click', '#update', function(){
        $('#add').prop('disabled', true);
        disableDelete();
        $('#updateb').prop('disabled', false)
        var currentRow = null;
        // console.log(currentRow);
        currentRow=$(this).closest("tr"); 
        //  console.log(currentRow);
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
            $('#updateb').unbind().click(function(){
                $('#error').empty();
                console.log("updates");
                if(!checkInput()){
                    return
                }
                currentRow.find("td:eq(0)").html($('#name').val());
                currentRow.find("td:eq(1)").html($('input[name="gender"]:checked').val());
                currentRow.find("td:eq(2)").html($('#age').val());
                currentRow.find("td:eq(3)").html($('#city').find(":selected").val()); 
            });
        });
    });    
});       
   
function disableDelete(){
    $('.delete').prop('disabled', true);
}

$(function(){
    $('#reset').click(function(){
        $('#add').prop('disabled', false);
        $('#form').trigger("reset");
        $('#updateb').prop('disabled', true);
        $('.delete').prop('disabled', false);
        $('#error').empty();
    });
})

