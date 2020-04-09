document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // first div in grid
    let appleIndex = 0 // first div in grid
    let currentSnake = [2,1,0] // div in grid 2 (Head) , and 0 the end (Tail) and 1 body from being to end

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //start / Restart Game

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function outcomes
    function moveOutcomes() {

    // function snake hit to border and hit self
        if  (
            (currentSnake[0] + width >= (width * width) && direction === width) || // snake hit bottom wall
            (currentSnake[0] % width === width - 1 && direction === 1) || // snake hit right wall
            (currentSnake[0] % width === 0 && direction === -1) || // snake hit left wall
            (currentSnake[0] - width < 0 && direction === -width) || // snake hit top wall
            squares[currentSnake[0] + direction].classList.contains('snake') //snake hit self
        ) {
            return clearInterval(interval) // clear interval if any above happend 
        }

    const tail = currentSnake.pop() //remove last item of array and show it
    squares[tail].classList.remove('snake') //remove class of snake from Tail
    currentSnake.unshift(currentSnake[0] + direction) // give direction to head of snake

    // function snake get the apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
}


    // genrate new apple once apple is eaten
    function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')

    }
    //assign functions to keycode
    function control(e) {
        // refrecnce of keycode : https://keycode.info/
        squares[currentIndex].classList.remove ('snake')

        if (e.keyCode === 39) {
            direction = 1    // Right - if we press right key , then snake goes to right 
        } else if (e.keyCode === 38) {
            direction = -width // UP - if we prees up key, snake will go back 10 div
        } else if (e.keyCode === 37) {
            direction = -1 // Left - snake go to left one div
        } else if (e.keyCode === 40) {
            direction = +width // Down - snake's head will appear in to ten div from where snake are
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)






})
