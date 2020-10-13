// Class of question in the API of Trivia
class triviaQuestion {
  constructor(
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers
  ) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
}

class trivia_categories {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// Global Variables and requires
var questions = new Array(),
  indexquestion = 0,
  score = 0,
  // I do in that way of require because when run JS doesn't wor this way (ES6Module):
  // import { createInterface } from "readline"
  readline = require("readline"),
  xml = require("XMLHttpRequest");

// PRINCIPAL FUNCTION 1.0
// Function Start
function Start() {
  // Variables
  var rl = new readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // Information for the User
  console.clear();
  console.log(
    " ~<( TRIVIA GAME )>~ \n",
    "Do you want to play or to see the scores \n",
    "Write p to play Standard Game \n",
    "Write s to see scores \n",
    "Write c to custom quiz \n"
  );
  rl.question("", function (answer) {
    // Option for Standard Game
    if (answer == "p" || answer == "P") {
      // Close this readline
      rl.close();
      rl = null;

      // Clear the terminal in 2 seconds
      setTimeout(() => {
        console.clear();
        StandardGame();
      }, 1000);
    }

    // Show Scores
    if (answer == "s" || answer == "S") {
      // Close this readline
      rl.close();
      rl = null;

      // Clear the terminal in 2 seconds
      setTimeout(() => {
        console.clear();
        console.log("SCORES");
      }, 1000);
    }

    // Custom Quiz (Categories, number of questions)
    if (answer == "c" || answer == "C") {
      // Close this readline
      rl.close();
      rl = null;

      // Clear the terminal in 2 seconds
      setTimeout(() => {
        console.clear();
        SelectCategories();
      }, 1000);
    }
  });
}

//PRINCIPAL FUNCTION 1.1
// Quiz with 10 questions and aleatory categories
function StandardGame() {
  // Call XMLHttpRequest to receive the trivia questions of the API Open Trivia Database
  var xhr = new xml.XMLHttpRequest(),
    url = "https://opentdb.com/api.php?amount=10";

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);

      // Add all questions in one array to simplify the code
      for (const i in myArr.results) {
        var question = new triviaQuestion(
          myArr.results[i].category,
          myArr.results[i].type,
          myArr.results[i].difficulty,
          myArr.results[i].question,
          myArr.results[i].correct_answer,
          myArr.results[i].incorrect_answers
        );
        questions.push(question);
      }

      // Start the test with a recursive function
      MakeQuestion();
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// PRINCIPAL FUNCTION 1.2
// Get scores and prints

// PRINCIPAL FUNCTION 1.3
// Select one of the list of categories
function SelectCategories() {
  // Variables
  var // Call XMLHttpRequest to receive the trivia questions of the API Open Trivia Database
    xhr = new xml.XMLHttpRequest(),
    url = "https://opentdb.com/api_category.php";
  // Create interface for inputs and outputs
  rl = new readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  // Array of categories
  categories = new Array();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);

      // Add all categories in one array to simplify the code
      for (const i in myArr.trivia_categories) {
        var category = new trivia_categories(
          myArr.trivia_categories[i].id,
          myArr.trivia_categories[i].name
        );
        categories.push(category);
      }

      // Information to Player
      console.log(" ~<( TRIVIA GAME )>~ \n", "Select one category \n ");

      // Table with an array of the categories names
      console.table(categories, ["name"]);

      rl.question("Your answer is: ", function (answer) {

        // Check that answer is inside parameters of answers
        if ((answer >= 0 && answer < categories.length) && answer != '') {
          // Save categorySelected
          var categorySelected = categories[answer];
          console.log('You selected ', categorySelected.name, ' Category')
          // Close this readline
          rl.close();
          rl = null;

          // Go to the next question and clean the terminal
          setTimeout(() => {
            console.clear();
            GetQuizCustom(categorySelected);
          }, 3000);
        } else {
          // The input is not valid
          console.log('Your answer is not valid.');
          console.log(
            'Must be between 0 and ', categories.length-1, ' depends of the index of the answers'
          );

          // Close this readline
          rl.close();
          rl = null;

          //repeat the question and clean the terminal
          setTimeout(() => {
            console.clear();
            SelectCategories();
          }, 3000);
        }
      });
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// AUXILIAR FUNCTION 1.3.1
// Get Custom Json of question of a specific category
function GetQuizCustom(category){
  // Call XMLHttpRequest to receive the trivia questions of the API Open Trivia Database
  var xhr = new xml.XMLHttpRequest(),
    url = "https://opentdb.com/api.php?amount=10&category=" + category.id;

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);

      // Add all questions in one array to simplify the code
      for (const i in myArr.results) {
        var question = new triviaQuestion(
          myArr.results[i].category,
          myArr.results[i].type,
          myArr.results[i].difficulty,
          myArr.results[i].question,
          myArr.results[i].correct_answer,
          myArr.results[i].incorrect_answers
        );
        questions.push(question);
      }

      // Start the test with a recursive function
      MakeQuestion();
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// PRINCIPAL FUNCTION 1.4
function MakeQuestion() {
  if (indexquestion < questions.length) {
    // Variables
    var // Create interface for inputs and outputs
      rl = new readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      }),
      // Function RandomAnswers to join and randomize the answers
      answersRamdom = RandomAnswers(questions[indexquestion]);

    // Information to Player
    console.log(
      " ~<( TRIVIA GAME )>~ \n",
      "This is the ",
      indexquestion + 1,
      " of 10 questions \n",
      "SCORE: ",
      score,
      "\n \n",
      "QUESTION: \n",
      questions[indexquestion].question,
      " \n",
      "ANSWERS: \n"
    );

    // Table with an array of the answers randomized
    console.table(answersRamdom);

    //Start function depends os the answer of Player
    rl.question("Your answer is: ", function (answer) {
      //Check question Multiple or boolean
      var aux = 0;
      if (questions[indexquestion].type == "multiple") {
        aux = 4;
      } else {
        aux = 2;
      }

      // Check that answer is inside parameters of answers
      if ((answer >= 0 && answer < aux) && answer != '') {
        // Check Correct answer
        if (answersRamdom[answer] == questions[indexquestion].correct_answer) {
          console.log("It's correct. Good work.");
          score++;
        } else {
          console.log("Sorry, keep trying");
          console.log(
            "The correct answer is: " + questions[indexquestion].correct_answer
          );
        }
        // Close this readline
        rl.close();
        rl = null;

        // Go to the next question and clean the terminal
        indexquestion++;
        setTimeout(() => {
          console.clear();
          MakeQuestion();
        }, 3000);
      } else {
        // The input is not valid
        console.log("Your answer is not valid.");
        console.log("Must be 0, 1, 2 or 3 depends of the index of the answers");
        console.log("Or 0 or 1, depends of the type of the question");

        // Close this readline
        rl.close();
        rl = null;

        //repeat the question and clean the terminal
        setTimeout(() => {
          console.clear();
          MakeQuestion();
        }, 3000);
      }
    });
  } else {
    // Finish the game
    console.log('\n Your score is ', (score/questions.length)*100, '% \n',
    'Thanks for playing')
    process.stdin.destroy();
  }
}

// AUXILIAR FUNCTION 1.4.1
// Randomise the answers
function RandomAnswers(ans) {
  let array = new Array();
  if (ans.type == "multiple") {
    // Add all of answer correct and incorrects
    array.push(ans.correct_answer);
    array.push(ans.incorrect_answers[0]);
    array.push(ans.incorrect_answers[1]);
    array.push(ans.incorrect_answers[2]);
  } else {
    // Add true and false answers
    array.push(ans.correct_answer);
    array.push(ans.incorrect_answers[0]);
  }
  // Randomize
  return shuffleArray(array);
}

// AUXILIAR FUNCTION 1.4.2
// Randomize array in-place using Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Start at the end to secure that all of JS will be charge
Start();