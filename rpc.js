let dict = {
    knight: "bishop",
    bishop: "rook",
    rook: "knight"
}

let scores = {
    player: 0,
    cpu: 0
}

let cpuScoreElem = document.getElementById("cpu_score")
let playerScoreElem = document.getElementById("player_score")
let promptElem = document.getElementById("prompt")

function getComputerMove() {
    let keys = Object.keys(dict)
    return keys[getRndNum(0, keys.length)]
}

function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function raiseScore(who) {
    if (who === "player") {
        setScore("player", playerScoreElem)
    }else {
        setScore("cpu", cpuScoreElem)
    }
}

function setScore(score, html, num = -1) {
    scores[score] = (num < 0 ? ++scores[score] : num)
    html.innerHTML = scores[score]
    if (num < 0) {
        checkScores()
    }
}

function checkScores() {
    if (scores["player"] >= 5) {
        setWinner("player")
    } else if (scores["cpu"] >= 5) {
        setWinner("cpu")
    }
}

function setWinner(who) {
    promptElem.innerHTML = `${who} wins!`
    clearScores()
}

function clearScores() {
    setScore('cpu', cpuScoreElem, 0)
    setScore('player', playerScoreElem, 0)
}

function play(type) {
    let cpu_move = getComputerMove()
    if (dict[cpu_move] === type) {
        promptElem.innerHTML = "You Lost!"
        raiseScore("cpu")
    } else if(dict[type] === cpu_move) {
        promptElem.innerHTML = "You Win!"
        raiseScore("player")
    } else {
        promptElem.innerHTML = "It's a tie!"
    }
}