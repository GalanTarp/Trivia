# TriviaGame

<p>Its a Game Terminal based in the API of Open Trivia Database </p>
<p>https://opentdb.com/</p>

<p>To play you just need to download the file and have install NodeJS in you PC.</p>
<p>Next in your terminal access to the download file and execute trivia.js with this command:</p>
<p align="center">node trivia.js -o</p>

<p>Start to Play, there are 3 options:</p>
<ul>
  <li>p -> To play Standard Game (10 questions of aleatory categories).</li>
  <li>s -> To see the previous scores with dates.</li>
  <li>c -> to play a custom quiz with an specific category and number of questions (between 10 and 50).</li>
</ul>
<p>To response the questions write the index of the answer that is shown on screen. Have Fun!</p>

<p>Now the explication of the game.</p>

<p>The structure is:</p>
<ul>
	<li>Classes of Json</li>
  <li>Global variables</li>
  <li>1.0 Start</li>
  <li>1.1 StandardGame</li>
  <li>1.2 GetScores</li>
  <li>1.3 GetCategories</li>
	<ul>
    <li>1.3.1 SelectCategory</li>
    <li>1.3.2 SelectNumberQuestions</li>
    <li>1.3.3 GetCustomQuiz</li>
	</ul>
  <li>1.4 MakeQuestions</li>
	<ul>
    <li>1.4.1 RandomAnswers</li>
    <li>1.4.2 SuffleArray</li>
    <li>1.4.3 TimeConverter</li>
	</ul>
</ul>
