$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); //  change to 4000 or other amount
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+ answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["What planet is Peter Quill from?", "What color is Gamora's skin?", "Who killed Drax the Destroyers family?", "What is Rocket's Species?", "What is Groot's catchphrase", "What is Yondu's weapon of choice?", "What is Peter Quills Alias?", "How many core members make up the Guardians of the Galaxy?"];
    var answerArray = [["Xandar", "Terra", "Knowhere", "Berhert"], ["Blue","Yellow","Green","Pink"], ["Thanos", "Iron Man", "Rocket", "Ronan the Accuser"], ["Trash Panda","Raccoon","Human","Xandarian"], ["I am Groot", "Bazinga", "Did I do That?", "Dy-No-Mite!"], ["Axe","Stormbreaker","Arrow","Sword"], ["Star Lord", "Star Prince", "Star Munch", "Tazer-face"], ["5","10","7","9"]];
    var imageArray = ["<img class='center-block img-right'src='assets/images/2e68c2a499536c5dd956816893d3af26.png'>" , "<img class='center-block img-right'src='assets/images/Gamora_Profile(1).png'>", "<img class='center-block img-right'src='assets/images/guardians-of-the-galaxy-clipart-3.png'>", "<img class='center-block img-right'src='assets/images/kisspng-rocket-raccoon-baby-groot-gamora-marvel-comics-guardians-of-the-galaxy-5ac6fc0461e4c7.203584221522990084401.png'>", "<img class='center-block img-right' src='assets/images/Guardians_of_the_galaxy_vol2_baby_groot.png'>", "<img class='center-block img-right' src='assets/images/hot-toys-marvel-guardians-of-the-galaxy-2-yondu-sixth-scale-toyslife.png'>", "<img class='center-block img-right' src='assets/images/544e0228f4034776c42519767b9e0c01.png'>", "<img class='center-block img-right' src='assets/images/Guardians-of-The-Galaxy-PNG-Photos.png'>"];
    var correctAnswers = ["B. Terra", "C. Green", "D. Ronan the Accuser", "B. Raccoon", "A. I am Groot", "C. Arrow", "A. Star Lord", "A. 5"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sound/Button-SoundBible.com-1420500901.mp3");
   