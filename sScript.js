
// Select all input elements for varification
let sdata

// function for form varification
function formValidation() {
    const id = document.getElementById("id").value;
    const sname = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const gender = document.getElementById("gender").value;
    const language = document.getElementById("language").value;
    const zipcode = document.getElementById("zipcode").value;
    sdata = {
        id,
        sname,
        email,
        phonenumber,
        gender,
        language,
        zipcode
    }
  // checking name length
  if (sname.length < 2 || sname.length > 20) {
    alert("Name length should be more than 2 and less than 21");
    sname.focus();
    return false;
  }
  // checking email
  if (email.match(/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/)) {
    alert("Please enter a valid email!");
    email.focus();
    return false;
  }
  // checking phone number
  if (!phonenumber.match(/^[1-9][0-9]{9}$/)) {
    alert("Phone number must be 10 characters long number and first digit can't be 0!");
    phonenumber.focus();
    return false;
  }
  // checking gender
  if (gender.gender === "") {
    alert("Please select your gender!");
    return false;
  }
  // checking language
  if (language === "") {
    alert("Please select your language!")
    return false;
  }
  // checking zip code
  if (!zipcode.match(/^[0-9]{6}$/)) {
    alert("Zip code must be 6 characters long number!");
    zipcode.focus();
    return false;
  }
  return true;
}




let url = 'http://localhost:3000/students'
function LOAD() {
    $.ajax({
        url: url,
        type: "GET",
        success: (posRes) => {
            console.log(posRes)
            let x = ``
            x = x + `<table border = 1px    
                            cellspacing = 10px
                            cellpadding = 10px
                            align = center>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Language</th>
                            <th>Zipcode</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            for (let i = 0; i < posRes.length; i++) {
                x = x + `
                    <tr>
                        <td>${posRes[i].id}</td>
                        <td>${posRes[i].sname}</td>
                        <td>${posRes[i].email}</td>
                        <td>${posRes[i].phonenumber}</td>
                        <td>${posRes[i].gender}</td>
                        <td>${posRes[i].language}</td>
                        <td>${posRes[i].zipcode}</td>
                    </tr>
                `
            }
            x = x + `</tbody>
                </table>`
            document.getElementById('op').innerHTML = x
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })
}
//LOAD()
$(document).ready(() => {
    $('#getData').click(() => {
        LOAD()
    })
    $('#send').click((e) => {
        e.preventDefault();  //preventing default behaviour of browser
        //////////////////////
        if(formValidation())
        { 
        $.ajax({
            url: url,
            type: 'POST',
            data: sdata,
            success: (posRes) => {
                console.log(posRes)
            },
            error: (errRes) => {
                console.log(errRes)
            }
        })
        LOAD()
        }
    })
    $('#update').click((e) => {
        e.preventDefault()
        //////////////////////
        $.ajax({
            url: url + '/' + id,
            type: 'PUT',
            data: sdata,
            success: (posRes) => {
                console.log(posRes)
            },
            error: (errRes) => {
                console.log(errRes)
            }
        })
    })
    $('#delete').click((e) => {
        e.preventDefault()
        let id = parseInt(document.getElementById('id').value)
        $.ajax({
            url: url + '/' + id,
            type: 'DELETE',
            success: (posRes) => {
                console.log(posRes)
            },
            error: (errRes) => {
                console.log(errRes)
            }
        })
    })
})
