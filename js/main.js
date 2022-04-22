// BAD CALC //

let started = false
let total = 0
let moves = 0
let winningNumber = 0
let clicks = 0
let min = 3
let score = 0
const difficulty = 5 // Fine tuning difficulty on a slider
const numbers = 6
const max = 9

const operators = ['+', '-', '/', '*']
const result = document.querySelector('#placeToPutResult')
const scoreText = document.querySelector('#score')
const roundText = document.querySelector('#round')
const target = document.querySelector('#target')
const nice = document.querySelector('#nice')
const winner = document.querySelector('#winner')
const ul = document.querySelector('ul')
const h2 = document.querySelector('h2')
const totalCount = document.querySelector('#totalCount')
const badCalc = document.querySelector('#badCalc')
const topTarget = document.querySelector('#topTarget')

function count() {
  moves += 1
}

// Handle 0

function makeZero() {
  total = 0
  moves = 0
  result.innerText = total
}

document.getElementById('6').addEventListener('click', makeZero)

function randomNumberBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomOperator () {
  return operators[randomNumberBetween(0, 3)]
}

function weightedOperator (index) {
  if (index <= 1) return operators[0]
  if (index <= 3) return operators[3]
  if (index === 4) return operators[1]
  if (index === 5) return operators[2]
}

function halfWeightedOperator (index) {
  if (index < 1) return operators[0]
  if (index === 1) return operators[1]
  if (index <= 5) return randomOperator()
 
}

function updateGrid() {
  return new Array(numbers).fill(null).map((_, index) => [
    // randomOperator(),  // Hardcore mode
    // halfWeightedOperator(index), // Normal mode
    weightedOperator(index), // Easy mode
    randomNumberBetween(1, max)
  ])
}

let grid = updateGrid()
/**
 * [['+', 8], ['+', 3], ['-', 1], ['-', 2], ['*', 9], ['/', 8]]
 */


// Create winning number

const calcWinningNumber = (difficulty) => {
  let number = 0
  for (let i = 0; i < difficulty; i++) {
    const randomIndex = randomNumberBetween(0, numbers - 1)
    const [operator, value] = grid[randomIndex]
    switch (operator) {
      case '+':
        number += value
        break
      case '-':
        number -= value
        break
      case '/':
        number = Math.round(total / value)
        break
      case '*':
        number *= value
        break
    }
  }
  if (number <= 9 || number > 50) return calcWinningNumber(difficulty)
  return number
}


// Layout Grid
const listeners = new Array(grid.length).fill(null)
function updateLayout() {
  grid.forEach(([operator, number], index) => {
    const element = document.getElementById(index)

    // Remove existing listeners
    if (listeners[index]) {
      element.removeEventListener('click', listeners[index])
    }
    // Render the number
    element.innerText = `${operator}${number}`
    // Add onclick handler
    function clickHandler() {
      if (!started) return
      switch (operator) {
        case '+':
          total += number
          break
          case '-':
            total -= number
            break
            case '/':
              total = Math.round(total / number)
              break
              case '*':
                total *= number
                break
              }
              count()
              checkSuccess()
      result.innerText = total
    }
    
    element.addEventListener('click', clickHandler)
    // make a note that we added a listener to this element
    listeners[index]= clickHandler
  })
          
} 
        
        
document.getElementById('target').addEventListener('click', setWinningNumber)
document.getElementById('topTarget').addEventListener('click', setWinningNumber)
        
function setWinningNumber () {
  if (clicks === 0) {
    alert('Try to reach the target number in as few moves as possible, final score will be determined after 5 rounds')
  }
  grid = updateGrid()
  winningNumber = calcWinningNumber(difficulty)
  updateLayout()
  reset()
  resetScore()
}


function reset() {
  target.innerText = winningNumber
  topTarget.innerText = `Target: ${winningNumber}`
  nice.style.display = 'none'
  winner.innerHTML = ''
  ul.style.display = 'flex'
  scoreText.innerText = ''
  roundText.innerText = ''
  badCalc.classList.add('hidden')
  topTarget.classList.remove('hidden')
  started = true
  makeZero()
  totalCount.innerText = ''
  if (h2.classList.contains('hidden')) {
    h2.classList.toggle('hidden')
    totalCount.classList.toggle('hidden')
  }
  if (score > 0) {
    totalCount.innerText = score
  }
} 

function resetScore() {
  if (clicks >= 5) {
    clicks = 0
    score = 0
  }
}

function checkSuccess() {
  if (winningNumber === total) {
    success()
  } else {
  }
}

function success() {
  clicks += 1
  score += moves
  let scoreClone = 0
  scoreClone += score
  if (clicks >= 5){
    scoreText.innerText = `Final Score: ${scoreClone}`
    roundText.innerText = `ROUND ${clicks}: GAME OVER`
    resetScore()
  } else {
    scoreText.innerText = `Total Score: ${scoreClone}`
    roundText.innerText = `ROUND ${clicks}`
  }
  winner.innerHTML = `target reached in ${moves} moves`
  ul.style.display = 'none'
  nice.style.display = 'block'
  start = false
  target.innerHTML = 'Start'
  h2.classList.toggle('hidden')
  totalCount.classList.toggle('hidden')
  badCalc.classList.toggle('hidden')
  topTarget.classList.toggle('hidden')
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
  document.querySelector('body').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.111), rgba(0, 0, 0, 0.111)), url('https://wallpaperaccess.com/full/4317845.jpg')"
  document.querySelector('body').style.color = 'black'
  document.querySelector('#lightMode').style.display = 'none'
  document.querySelector('#darkMode').style.display = 'block'
  ul.style.backgroundColor = '0c0c0c'
}


// TO DO LIST
// FIND LOWEST POSSIBLE AMOUNT OF MOVES 
// SCORE = USER MOVES - LOWEST POSSIBLE MOVES (x ROUNDS)
// LEADERBOARD
// 1:00 TIMED MODE- ON CLICK - NEW NUMBER ON GRID
// LEFT SIDE ODD - RIGHT SIDE EVEN
