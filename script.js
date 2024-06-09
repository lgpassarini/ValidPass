const $eyeIcon = $('#view-pass');
const $passInput = $('#pass_txt');
const $resultBar = $('.result');
const $resultTxt = $('.result-txt');


$eyeIcon.on('click', function(){
    const element = $(this);

    if (element.hasClass('active')){
        element.removeClass('active');
        $passInput.attr('type', 'password');
    } else {
        element.addClass('active');
        $passInput.attr('type', 'text');
    }
})

$passInput.on('keyup', function() {

    var value = $(this).val();
    $(this).val(value.replace(/\s/g, ''));
    
    const password = $passInput.val();
    handlePasswordValidation(password);
})

function handlePasswordValidation(password) {

    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isValidLength = password.length >= minLength;

    handleIconByValidation('item-lenght', isValidLength);
    handleIconByValidation('item-upper', hasUpperCase);
    handleIconByValidation('item-special', hasSpecialChar);
    handleIconByValidation('item-numeric', hasNumber);
    handleIconByValidation('item-lower', hasLowerCase);

    const activeItens = $('.fa-check').length;
    handleResultLength(activeItens);
}

function handleIconByValidation(identifier, boolValue){

    const element = $('#' + identifier);
    const iconElement = element.find('i');

    if (boolValue){
        iconElement.removeClass();
        iconElement.addClass('fa-solid');
        iconElement.addClass('fa-check');
    } else{
        iconElement.removeClass();
        iconElement.addClass('fa-regular');
        iconElement.addClass('fa-circle-xmark');
    }
}

function handleResultLength(activeItems){

    $resultTxt.text('');

    var totalItems = 5;

    var hasLenght = $('#item-lenght i').hasClass('fa-check');
    if (!hasLenght && activeItems >= 3) activeItems = 3;

    var percentage = (activeItems / totalItems) * 100;

    $resultBar.css('width', percentage + '%');

    if (percentage <= 20){
        $resultBar.css('width', '10%');
        $resultBar.css('background-color', 'grey');
    } else if (percentage > 20 && percentage <= 40){
        $resultBar.css('background-color', '#D37676');
        $resultTxt.text('Muito Fraca');
    } else if (percentage > 40 && percentage <= 60){
        $resultBar.css('background-color', '#F1EF99');
        $resultTxt.text('Fraca');
    } else {
        $resultBar.css('background-color', '#B0C5A4');
        $resultTxt.text('Forte');
    }
}