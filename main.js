
// An array is defined to store the skills and levels
let skillsArray = [];

// Function for add skill with level
function addMore(){

    document.getElementById('addError').innerHTML = "";

    let skill = document.querySelector('#skills-name').value;
    let level = document.querySelector('#levels').value;

    if(skill == 'select-skill' || skill == '-1' || level == 'select-level'){
        alert("Please Select both Skill & level", "warning");               // use swal instead of alert to use sweet alert
    }
    else{

        //Store the skill and level in the skillsArray
        skillsArray.push({
            skill: skill,
            level: level
        });

        let box = document.getElementById('written-box');

        let li = document.createElement('li');
        li.textContent = skill + " - " + level;

        // Creating 'delete' button to remove the mistakenly selected skill
        let a = document.createElement('a');
        a.textContent = "delete";
        a.href = "javascript:void(0)";
        a.className = "remove";
        li.appendChild(a);

        let pos = box.firstElementChild;

        if(pos == null)
            box.appendChild(li);
        else
            box.insertBefore(li, pos);

        box.appendChild(li);
    }

    /* 
     * This is when we want to make fields empty after submission

     * document.getElementById('skill').value = "";
     * document.getElementById('level').value = "";
    */
}

var row = 1;
// If any field is blank, then this error will pop-up
function submit(){

    document.getElementById('submitError').innerHTML = "";

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let skillss = document.querySelector('#skills-name').value;
    let levelss = document.querySelector('#levels').value;

    if(name == '' || email == '' || skillss == 'select-skill' || levelss == 'select-level'){
        alert("One or more field is blank! Fill all details", "warning");   // use swal instead of alert to use sweet alert
        return;
    }
    else{
        alert("Success", "Submitted successfully!", "success");
    }

    let skill, level;
    for (let i = 0; i < skillsArray.length; i++) {
        skill = skillsArray[i].skill;
        level = skillsArray[i].level;
    }

    var display = document.getElementById("submit-box");
    var newRow = display.insertRow(row);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.innerHTML = name;
    cell2.innerHTML = email;

    for (var i = 0; i < skillsArray.length; i++) {
        cell3.innerHTML += skillsArray[i].skill+ " - " + skillsArray[i].level + "<br>";
    }
    cell4.innerHTML = 'delete';
    row++;

    while(skillsArray.length > 0){
        skillsArray.pop();
    }

    var index;
    for(var i = 0; i < display.rows.length; i++){

        display.rows[i].cells[3].onclick = function(){

            index = this.parentElement.rowIndex;
            display.deleteRow(index);
            row--;
        }
    }
    // console.log(skillsArray);
}


// =====  delete button for selected skills and level in the form =====
let btn = document.querySelector('ul');
btn.addEventListener('click', function(e){
    let box = document.getElementById('written-box');
    let li = e.target.parentNode;
    box.removeChild(li);
});


// ======== M2 - AJAX call ==========

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/data.json",
        ata: "{}",
        success: function (data){
            var s = '<option value="-1">Select skill</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].name + '">' + data[i].name + '</option>';
            }
            $("#skills-name").html(s);
        }
    });
});