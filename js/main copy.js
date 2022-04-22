// CALC //

let total = 0
let moves = 1
let randomNum = 0
let clicks = 0

document.querySelector('#pumpkin').addEventListener('click', makeZero)
document.querySelector('#dominosPizza').addEventListener('click', jumanji)
document.querySelector('#zebra').addEventListener('click', add9)
document.querySelector('#cantThinkOfAnything').addEventListener('click', sub2)
document.querySelector('#pitted').addEventListener('click', times4)
document.querySelector('#tubed').addEventListener('click', half)
document.querySelector('#pooped').addEventListener('click', sub7)

function count() {
  moves += 1
}

function makeZero() {
  total = 0
  moves = 0
  document.querySelector('#placeToPutResult').innerText = total
}

function jumanji() {
  total = total + 3
  checkSuccess()
  document.querySelector('#placeToPutResult').innerText = total
}

function add9() {
  total = total + 9
  checkSuccess()
  document.querySelector('#placeToPutResult').innerText = total
}

function sub2() {
  total = total - 2
  checkSuccess()
  document.querySelector('#placeToPutResult').innerText = total
}

function times4() {
  total = total * 4
  checkSuccess()
  document.querySelector('#placeToPutResult').innerText = total
}

function half() {
  total = total / 2
  checkSuccess()
  document.querySelector('#placeToPutResult').innerText = total
}

function sub7() {
  if (clicks === 0) {
    total = total - 7
    
  } else {
    total = total - randomNum

  } 
  checkSuccess()
    document.querySelector('#placeToPutResult').innerText = total
    randomizeNums()
    document.querySelector('#pooped').innerText = '-' + randomNum
  clicks += 1
}


function randomizeNums() {
  randomNum = Math.floor(Math.random() * 10)
}


// TARGET NUM - DIRECTIONS - WINNER //

let num = 0

document.querySelector('#target').addEventListener('click', randomize)

function randomize() {
  num = 0
  num += Math.floor(Math.random() * 101)
  document.querySelector('#target').innerHTML = num
  alert('Try to reach the target number in as few moves as possible')
  document.querySelector('#nice').style.display = 'none'
  document.querySelector('#winner').innerHTML = ''
  document.querySelector('ul').style.display = 'flex'
}

function checkSuccess() {
  if (num === total) {
    success()
  } else {
    count()
  }
}

function success() {
  document.querySelector('#winner').innerHTML = 'target reached in ' + moves + ' moves'
  document.querySelector('ul').style.display = 'none'
  document.querySelector('#nice').style.display = 'block'
  reset()
}

function reset() {
  total = 0
  moves = 0
  document.querySelector('#target').innerHTML = 'Start'
}

// DARKMODE - LIGHTMODE //

document.querySelector('#darkMode').addEventListener('click', lightsOut)
document.querySelector('#lightMode').addEventListener('click', lightsOn)



function lightsOut() {
  document.querySelector('body').style.backgroundColor = 'black'
  document.querySelector('body').style.backgroundImage = 'none'
  document.querySelector('body').style.color = 'white'
  document.querySelector('#lightMode').style.display = 'block'
  document.querySelector('#darkMode').style.display = 'none'
}

function lightsOn() {
  document.querySelector('body').style.backgroundColor = 'rgb(167, 167, 167)'
  document.querySelector('body').style.backgroundImage = 'url("https://wallpaperaccess.com/full/4317845.jpg")'
  document.querySelector('body').style.color = 'black'
  document.querySelector('#lightMode').style.display = 'none'
  document.querySelector('#darkMode').style.display = 'block'
  document.querySelector('ul').style.backgroundColor = '0c0c0c'
}


// TO DO LIST
// MAKE CALC BUTTONS RANDOMIZE NUMBERS(1-10) AND OPERATORS
// FIND LOWEST POSSIBLE AMOUNT OF MOVES 
// CHANGE ALERTS TO ELEMENTS
// SCORE = USER MOVES - LOWEST POSSIBLE MOVES (x ROUNDS)
// LEADERBOARD