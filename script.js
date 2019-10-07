//global goes here
clickedArray = [];
let interval;
let started = false;
let time = 0;
let ready = true;
let numCompleted = 0;



//executed functions here

setUp();



//function definitions here

function startTimer() {
    if (started == false) {
        interval = setInterval(function () {
            time++;
            document.getElementById('timer').innerHTML = "Time elapsed: " + time;
        }, 1000)
        started = true;
    }
}

function hideCell(cell) {
    cell.style.background = '#0b6299';
    cell.innerHTML = '';
    cell.clicked = false;
}

function completeCell(cell) {
    numCompleted++;
    cell.style.background = '#ffff';
    cell.completed = true;
}


function reveal(cell) {
    cell.style.background = '#e9d8c8';
    cell.innerHTML = cell.value;
    cell.clicked = true;
}



function randomAnswers() {
    let answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    answers.sort((item) => {
        return .5 - Math.random();
    });
    return answers;
}

function setUp() {
    let grid = document.getElementsByTagName("td");
    let answers = randomAnswers();

    let restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', function () {
        location.reload();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key > 0 && event.key < 10) {
            grid[event.key - 1].click();
        }

    });

    for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        cell.addEventListener('mouseenter', function () {
            startTimer();
            if (this.completed == false && this.clicked == false)
                this.style.background = '#252525';
        });

        cell.addEventListener('mouseleave', function () {
            if (this.completed == false && this.clicked == false)
                this.style.background = '#0b6299';
        });

        cell.addEventListener('click', function () {
            if (ready == false)
                return;
            if (this.clicked == false && this.completed == false) {
                clickedArray.push(this);
                reveal(this);
            }
            if (clickedArray.length == 2) {
                if (clickedArray[0].value == clickedArray[1].value) {
                    completeCell(clickedArray[0]);
                    completeCell(clickedArray[1]);

                    clickedArray = [];

                    if (numCompleted == 8) {
                        alert('You won in ' + time + ' seconds!');
                        clearInterval(interval);
                    }


                } else {

                    ready = false;
                    document.getElementById('gridTable').style.border = "10px solid red";

                    setTimeout(function () {
                        hideCell(clickedArray[0]);
                        hideCell(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.getElementById("gridTable").style.border = "1px solid black";

                    }, 500);
                }
            }
        })
    }
}