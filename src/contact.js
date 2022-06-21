function validate(event) {
    event.preventDefault();
    clearMessageDiv();
    clearErrorDiv();
    let firstNameError = [], lastNameError = [], emailError = [], phoneError = [], messageError = [];
    const firstName = form.firstName;
    const lastName = form.lastName;
    const email = form.email;
    const phone = form.phone;
    const message = form.message;

    validateName(firstName, firstNameError);
    validateName(lastName, lastNameError);
    validateEmail(email, emailError);
    validatePhone(phone, phoneError);
    validateMessage(message, messageError);

    if (firstNameError.length === 0 && lastNameError.length === 0
        && emailError.length === 0 && phoneError.length === 0 && messageError.length === 0) {
        SubForm();
    }

    if (firstNameError.length > 0) {
        document.getElementById('firstNameError').innerHTML = firstNameError[0];
    }
    if (lastNameError.length > 0) {
        document.getElementById('lastNameError').innerHTML = lastNameError[0];
    }
    if (emailError.length > 0) {
        document.getElementById('emailError').innerHTML = emailError[0];
    }
    if (phoneError.length > 0) {
        document.getElementById('phoneError').innerHTML = phoneError[0];
    }
    if (messageError.length > 0) {
        document.getElementById('messageError').innerHTML = messageError[0];
    }
}

//To not redirect to web3forms after submitting
function SubForm(){
    $.ajax({
        url: 'https://api.web3forms.com/submit',
        type: 'POST',
        data: $('#form').serialize(),
        success: function() {
            document.getElementById('successMessage').innerHTML = "Message has been sent successfully to my inbox!";
        },
        error: function () {
            document.getElementById('failureMessage').innerHTML = "Error. Something wrong happens, that message didn't go through";
        }
    });
}

function validateName(name, error) {
    if (name === null || name.value.length < 2) {
        error.push('Minimum name length is 2')
    } else if (!name.value.match(textOnlyPattern)) {
        error.push('Only letters are allowed')
    }
}

function validateEmail(email, errors) {
    if (email === null) {
        errors.push('Email is required')
    }
    if (!email.value.match(emailPattern)) {
        errors.push('Email is invalid')
    }
}

function validatePhone(phone, errors) {
    if (!phone.value.match(phonePattern)) {
        errors.push('Phone number is invalid')
    }
}

function validateMessage(message, errors) {
    if (message.value === null || message.value.length === 0) {
        errors.push('Message is required')
    }
}

function clearErrorDiv() {
    document.getElementById('firstNameError').innerHTML = null;
    document.getElementById('lastNameError').innerHTML = null;
    document.getElementById('emailError').innerHTML = null;
    document.getElementById('phoneError').innerHTML = null;
    document.getElementById('messageError').innerHTML = null;
}

function clearMessageDiv() {
    document.getElementById('successMessage').innerHTML = null;
    document.getElementById('failureMessage').innerHTML = null;
}

let textOnlyPattern = /^[a-zA-Z]+$/
let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let phonePattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
let form = document.forms['mainForm']
form.addEventListener('submit', validate)
