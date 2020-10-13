# TriviaGame

Its a Game Terminal based in the API of Open Trivia Database 
https://opentdb.com/

To play you just need to download the file and have install NodeJS in you PC.
Next in your terminal access to the download file and execute trivia.js with this command:
node trivia.js -o

Start to Play, there are 3 options:
  p -> To play Standard Game (10 questions of aleatory categories).
  s -> To see the previous scores with dates.
  c -> to play a custom quiz with an specific category and number of questions (between 10 and 50).
  
To response the questions write the index of the answer that is shown on screen. Have Fun!

Now the explication of the game.

The structure is:
  -Classes of Json
  -Global variables
  -1.0 Start
  -1.1 StandardGame
  -1.2 GetScores
  -1.3 GetCategories
    -1.3.1 SelectCategory
    -1.3.2 SelectNumberQuestions
    -1.3.3 GetCustomQuiz
  -1.4 MakeQuestions
    -1.4.1 RandomAnswers
    -1.4.2 SuffleArray
    -1.4.3 TimeConverter
