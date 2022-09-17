
var gBoardNums = []
var gBoardsize = 16
var gElsSelectedLevel = document.querySelector('.highlight')
var gNextNum

function onInit() {
    resetGame()
    gBoardNums = createBoardNums()
    renderBoardTable()

}

function renderBoardTable() {
    var strHTML = ''
    var couter = 0
    var col = Math.sqrt(gBoardNums.length)
    for (var i = 0; i < col; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < col; j++) {
            strHTML += `<td onclick="onCellClicked(this)" >${gBoardNums[couter]}</td>`
            couter++
        }
        strHTML += '<tr>'
    }

    var elBoardTable = document.querySelector('.board-table')
    elBoardTable.innerHTML = strHTML
}

function onCellClicked(clickedNum) {
    if (gNextNum === 1) runTimer()
    var currClicked = +clickedNum.innerText
    if (currClicked === gNextNum) {
        clickedNum.style.backgroundColor = 'rgb(79, 79, 79)'
        gNextNum++
        if (gNextNum > gBoardsize) {
            endGame()
            return
        }
        var elNextNumberSpan = document.querySelector('.next-number')
        elNextNumberSpan.innerText = gNextNum
    }
}

function onLevelSelect(levelButton) {
    gElsSelectedLevel.classList.remove('highlight')
    gElsSelectedLevel = levelButton
    var selectedLevel = levelButton.dataset.type
    levelButton.classList.add('highlight')
    if (selectedLevel == 'easy') {
        gBoardsize = 16
    } else if (selectedLevel == 'medium') {
        gBoardsize = 25
    } else {
        gBoardsize = 36
    }
    onInit()
}

function endGame() {
    elBoard = document.querySelector('.board')
    elBoard.classList.toggle('hide')
    elEndGameDiv = document.querySelector('.end-game')
    elEndGameDiv.classList.toggle('hide')
    stopTimer()

}

function resetGame() {
    gNextNum = 1
    elBoard = document.querySelector('.board')
    elBoard.classList.remove('hide')
    elEndGameDiv = document.querySelector('.end-game')
    elEndGameDiv.classList.add('hide')  
    var elNextNumberSpan = document.querySelector('.next-number')
    elNextNumberSpan.innerText = gNextNum
    resetTimer()
}

function createBoardNums() {
    var boardNums = []
    for (var i = 0; i < gBoardsize; i++) {
        boardNums.push(i + 1)
    }

    var randomBoardNums = []
    for (var i = 0; i < gBoardsize; i++) {
        var randIdx = getRandomInt(0, boardNums.length)
        randomBoardNums.push(boardNums.splice(randIdx, 1)[0])
    }

    return randomBoardNums
}

//timer function
var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var Interval;

function runTimer() {

    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

function stopTimer() {
    clearInterval(Interval);
}


function resetTimer() {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
}



function startTimer() {
    tens++;

    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
        appendTens.innerHTML = tens;

    }

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }

}

