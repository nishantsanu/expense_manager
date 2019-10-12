//function for transfer tab
function toggle(val){
    if(val.value == 'trf'){    
        document.getElementById('catogery-div').style.display='none';
        document.getElementById('trf-div').style.display='block';
    }else{
        document.getElementById('catogery-div').style.display='block';
        document.getElementById('trf-div').style.display='none';
    }

}

if(document.getElementById('src-div').value==document.getElementById('dest-div').value){
    document.getElementById('src-dest-comp').innerText="Source and Destination cant be same";
}else{
    document.getElementById('src-dest-comp').innerText="";
}

//category status 






let submitCheck=false;

function srcdest(){
    if(document.getElementById('src-div').value==document.getElementById('dest-div').value){
        document.getElementById('src-dest-comp').innerText="Source and Destination cant be same";
    }else{
        document.getElementById('src-dest-comp').innerText="";
        submitCheck=true;
    }

}


$('#sub-form').on('submit', function(){
    var i= !document.getElementById('catOptions').value;
    console.log(i);
    if(trftab==true){
        if(document.getElementById('src-div').value==document.getElementById('dest-div').value){
            alert("Source and Destination cant be same");
            return false;
        }else{
            return true;
        }
    }else if(document.getElementById('catOptions').value===""){
        document.getElementById('categoryStatus').style.color="red";
        document.getElementById('categoryStatus').innerText="Please Select a Catogery.";
        return false;
    }else{
        console.log('true hai');
        return true;
    }
});

//create new catogery
function categoryFunction(val){
    if(val.value=='createNewCategory'){
     console.log('inside it');        
     document.getElementById('newCategoryDiv').style.display="block";
     }else{
     document.getElementById('newCategoryDiv').style.display="none";
     }

     if(document.getElementById('catOptions').value===""){
        document.getElementById('categoryStatus').style.color="red";
        document.getElementById('categoryStatus').innerText="Please Select a Catogery.";
    }else{
        document.getElementById('categoryStatus').style.color="red";
        document.getElementById('categoryStatus').innerText="";
    }

}

//function for tansMode

function tansModeFunction(val){
    document.getElementById('finalTansMode').value=val.value;
}

function hello(val){
    var buttons=document.getElementsByClassName('addButton');
    for(button of buttons){
        button.style.boxShadow="";
    }
    
    val.style.boxShadow="0 0 0 0.2rem rgba(0,123,255,.25)";


    if(val.value == 'Transfer'){    
        document.getElementById('catogery-div').style.display='none';
        document.getElementById('trf-div').style.display='block';
        document.getElementById('accountType').style.display='none';
    }else{
        document.getElementById('catogery-div').style.display='block';
        document.getElementById('trf-div').style.display='none';
        document.getElementById('accountType').style.display='block';
    }
}
 