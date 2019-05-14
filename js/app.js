// Sets date input date
var datePicker  = document.getElementById('dateCountdown'),
    today       = new Date(),
    tomorrow    = new Date();  

// sets tomorrow's date
tomorrow.setDate(today.getDate()+1);

var yyyy            = tomorrow.getFullYear(),
    mm              = getMonth(tomorrow.getMonth() + 1),
    dd              = getDay(tomorrow.getDate()),
    tomorrowFormat  = yyyy+'-'+mm+'-'+dd;

// Sets datepicker defaults
datePicker.valueAsDate  = tomorrow;
datePicker.min          = tomorrowFormat;



function getMonth(monthNo){
    return monthNo < 10 ? ('0'+monthNo) : monthNo;
}

function getDay(dayNo){
    return dayNo < 10 ? ('0'+dayNo) : dayNo;
}

function generateCountdown(timeLeft){
    document.getElementById('Days2go').querySelector('h3').innerText = timeLeft.days;
    document.getElementById('Hours2go').querySelector('h3').innerText = timeLeft.hours;
    document.getElementById('Minutes2go').querySelector('h3').innerText = timeLeft.minutes;
    document.getElementById('Seconds2go').querySelector('h3').innerText = timeLeft.seconds;
}

function resetCountdown(){
    document.getElementById('Days2go').querySelector('h3').innerText = 0;
    document.getElementById('Hours2go').querySelector('h3').innerText = 0;
    document.getElementById('Minutes2go').querySelector('h3').innerText = 0;
    document.getElementById('Seconds2go').querySelector('h3').innerText = 0;
}

function flip() {
    return Math.random() >= 0.5;
}

function generateRandomNumber(number){
    
    if (number == 1){
        return 0;
    } else {

        var maxNumber       = number-1,
            maxNumberBinary = maxNumber.toString(2),
            randomBinary    = '',
            generatedNumber = maxNumber+1,
            count = 1;

        while (generatedNumber > maxNumber) {
            randomBinary = '';
            for (var x = 0; x < maxNumberBinary.length; x++){
                randomBinary += flip() ? '1' : '0';
            }

            generatedNumber = parseInt(randomBinary,2);
        }

        return generatedNumber;
    }
}

// Events
function onStartCountdown(){
    var datepicker  = document.getElementById('dateCountdown');

    if (datepicker.countdown){
        clearInterval(datepicker.countdown);
    }

    // sets a 1-second interval for updating countdown timer
    datepicker.countdown = setInterval(() => {

        date    = datepicker.value+' 00:00:00',
        t       = Date.parse(date) - Date.parse(new Date());

        // Sets deadline
        document.getElementById('deadline').innerText = datepicker.value;

        if (t < 1){
            clearInterval(datepicker.countdown);
        } else {
            generateCountdown({
                days:       Math.floor( t/(1000*60*60*24) ),
                hours:      Math.floor( (t/(1000*60*60)) % 24 ),
                minutes:    Math.floor( (t/1000/60) % 60 ),
                seconds:    Math.floor( (t/1000) % 60 )
            });
        }

    }, 1000);
}

function onDatepickerChange(){
    var datepicker = document.getElementById('dateCountdown');

    // Clears interval and resets the timer
    if (datepicker.countdown) {
        clearInterval(datepicker.countdown);
        resetCountdown();
    }
}

function onGenerateRandomNumber(){
    var inputNumber         = parseInt(document.getElementById('RandomInput').value),
        numberPlaceholder   = document.getElementById('RandomNumber'),
        msgBox              = document.getElementById('ErrorTextarea');

    // Checks if input is number
    if (isNaN(inputNumber)){
        var msg = 'Input is not a number, please check your input.';
        msgBox.innerText = msg;
        throw new Error(msg);
    }

    // Checks that input is between 1 and 1'000,000
    if (inputNumber < 1 || inputNumber > 1000000){
        var msg = 'Input number is not in allowed range [1 - 1\'000,000]';
        msgBox.innerText = msg;
        throw new Error(msg);
    }

    msgBox.innerText = '';
    numberPlaceholder.innerText = generateRandomNumber(inputNumber);
}