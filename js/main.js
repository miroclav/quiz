var btnNext = document.querySelectorAll('[data-nav="next"]');
var btnPrev = document.querySelectorAll('[data-nav="prev"]');

var answers = {
    2: null,

    3: null,
    
    4: null,

    5: null
};

btnNext.forEach(function(button) {
    button.addEventListener('click', function() {
        var thisCard = this.closest("[data-card]");
        var thisCardNamber = parseInt(thisCard.dataset.card);
        if (thisCard.dataset.validate == "novalidate") {
            navigate("next", thisCard);
            updateProgressBar("next", thisCardNamber);
        } else {
            saveAnswer(thisCardNamber, getCardData(thisCardNamber));

            if (isFilled(thisCardNamber) && checkOnRequired(thisCardNamber)) {
                navigate("next", thisCard);
                updateProgressBar("next", thisCardNamber);
            } else {
                alert("Cделайте ответ !");
            }
        }
    })
})

btnPrev.forEach(function(button) {
    button.addEventListener('click', function() {
        var thisCard = this.closest("[data-card]");
        var thisCardNamber = parseInt(thisCard.dataset.card);
        navigate("prev", thisCard);
        updateProgressBar("prev", thisCardNamber);
    })
})

function navigate(direction, thisCard) {

    thisCardNamber = parseInt(thisCard.dataset.card);
    var nextCard
    if(direction == "next") {
        nextCard = thisCardNamber + 1;
    } else if (direction == "prev") {
        nextCard = thisCardNamber - 1;
    }
    thisCard.classList.add('hidden');
    document.querySelector(`[data-card="${nextCard}"]`).classList.remove('hidden');
}

function getCardData(number) {
    var question;
    var result = [];
    var currentCard = document.querySelector(`[data-card="${number}"]`);

    question = currentCard.querySelector("[data-question]").innerText;
    var radioValues = currentCard.querySelectorAll('[type="radio"]');
    radioValues.forEach(function(item){

        if (item.checked) {
            result.push({
                name: item.name,
                value: item.value
            });
        }
    });

    var checkBoxValues = currentCard.querySelectorAll('[type="checkbox"]');
    checkBoxValues.forEach(function(item){
        if (item.checked) {
            result.push({
                name: item.name,
                value: item.value
            });
        }
    });

    var inuptValues = currentCard.querySelectorAll('[type="text"], [type="email"], [type="number"]');
    inuptValues.forEach(function(item){
        itemValue = item.value;
        if (itemValue.trim() != "" ){
            result.push({
                name: item.name,
                value: item.value
            })
        }
    });
    console.log(result);

    var data = {
        question: question,
        answer: result
    };
    return data;
}  

function saveAnswer(number, data){
    answers[number] = data;
}

function isFilled(number){
    if ( answers[number].answer.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Ф-я для проверки email
function validateEmail(email) {
    var pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return pattern.test(email);
}

function checkOnRequired (number){
    var currentCard = document.querySelector(`[data-card="${number}"]`);
    var requiredFields = currentCard.querySelectorAll("[required]");

    var isValidArray = [];

    requiredFields.forEach(function(item){

        if (item.type == "checkbox" && item.checked == false) {
            isValidArray.push(false);
        } else if (item.type == "email") {
            if (validateEmail(item.value))  {
                isValidArray.push(true);   
            } else {
                isValidArray.push(false);
            }
        }
    });

    if (isValidArray.indexOf(false) == -1) {
        return true;
    } else {
        return false;
    }
}

document.querySelectorAll(".radio-group").forEach(function(item){
    item.addEventListener("click", function(e){
        var label = e.target.closest("label");
        if (label) {
            label.closest(".radio-group").querySelectorAll("label").forEach(function(item){
                item.classList.remove("radio-block--active");
            })
            label.classList.add("radio-block--active");
        }
    })
})

document.querySelectorAll('label.checkbox-block input[type="checkbox"]').forEach(function(item){
    item.addEventListener("change", function(){
        if (item.checked) {
            item.closest("label").classList.add("checkbox-block--active")
        } else {
            item.closest("label").classList.remove("checkbox-block--active")
        }
    })
})

function updateProgressBar(cardNumber){
    var cardsTotalNumber = document.querySelectorAll("[data-card]").length;

    if (direction == "next") {
        cardNumber = cardNumber + 1;
    } else if (direction == "prev") {
        cardNumber = cardNumber - 1;
    }
    console.log(cardNumber);
}