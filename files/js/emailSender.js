//email details 
Securetoken = "7e009d9e-d98e-4dae-8c0b-f6199e4dfc26"
from_emails = "dinesh.arumugam@cdatechindia.com"
to_emails = "sudharshan.karnati@cdatechindia.com,martin@cdaitsolutions.com,dinesh.arumugam@cdatechindia.com"


//create captcha
var code;

function createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 150;
    canv.height = 30;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 30, 20);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}

//send email for contact us
function contactUsSendEmail(data) {
    event.preventDefault();
    console.log(data)
    Email.send({
            SecureToken: Securetoken,
            From: from_emails,
            To: to_emails,
            Subject: "Jacaranda Const Inc: " + data["subject"],
            Body: "<table><tr><td>Full Name</td><td>" + "<strong>" + data["name"] + "</strong></td></tr>\
          <tr><td>Email</td><td>" + "<strong>" + data["email"] + "</strong></td></tr>\
          <tr><td>Phone Number</td><td>" + "<strong>" + data["subject"] + "</strong></td></tr>\
          <tr><td>Message</td><td>" + "<strong>" + data["message"] + "</strong></td></tr>"
        })
        .then(function (response) {
            console.log(response);
            if (response == 'OK') {
                $("#contactusmessageid").hide();
            } else {
                alert(response);
                throw new Error("Error: " + response)
            }

        });
}

//compare contact us captcha
function contactUsValidateCaptcha() {
    event.preventDefault();
    if (document.getElementById("cpatchaTextBox").value == code) {
        message = "Your message has been sent. Thank you!";
        document.getElementById("contactusmessageid").innerHTML = message;
        $("#contactusmessageid").show();
        createCaptcha();
        var data = {
            "name": document.getElementById("name").value,
            "email": document.getElementById("email").value,
            "subject": document.getElementById("subject").value,
            "message": document.getElementById("message").value,
        }
        contactUsSendEmail(data);
        document.getElementById("contactUsForm").reset();
    } else {
        alert("Invalid Captcha. try Again");
        $("#contactusmessageid").hide();
        createCaptcha();
    }
}
