'user strict';

const QUIZDATA = [
	{
		question: 'Which superhero was not in Captain America Civil War?',
		answerA: 'The Vision',
		answerB: 'Thor',
		answerC: 'Black Panther',
		answerD: 'Ant-man',
	},
	{
		question: 'How many infinty stones are in the universe?',
		answerA: '5',
		answerB: '6',
		answerC: '4',
		answerD: '7',
	},
	{
		question: 'What metal is the black panther suit made of?',
		answerA: 'Adamantitum',
		answerB: 'Uru',
		answerC: 'Carbonadium',
		answerD: 'Vibrianium',
	},
	{
		question: "What is Groot's favorite song?",
		answerA: 'I am Groot',
		answerB: 'I am Groot',
		answerC: 'I am Groot',
		answerD: 'I am Groot',
	},
	{
		question: "What is the name of Spider-man's AI for his costume?",
		answerA: 'Karen',
		answerB: 'Kelly',
		answerC: 'Carol',
		answerD: 'Liz',
	},
	{
		question: 'Which one is not a infinity stone?',
		answerA: 'Time',
		answerB: 'Power',
		answerC: 'Soul',
		answerD: 'Force',
	},
	{
		question: 'Deadpool is known for breaking?',
		answerA: 'Hearts',
		answerB: 'The Fifth Wall',
		answerC: 'The Fourth Wall',
		answerD: 'Wind',
	},
	{
		question: "Who is Peter Quill's daddy?",
		answerA: 'Yondu',
		answerB: 'Gamora',
		answerC: 'Drax',
		answerD: 'Ego the Planet',
	},
	{
		question: "Who is the Juggernaut's brother?",
		answerA: 'Colossus',
		answerB: 'Charles Xaiver',
		answerC: 'Cable',
		answerD: 'Fire Fist',
	},
	{
		question: "What is Iron-man's secret identity?",
		answerA: 'Tony Stark',
		answerB: 'Steve Rogers',
		answerC: "It's not a secret",
		answerD: 'Robert Downey Jr',
	},
];

const QUIZANSWERS = [
	'Thor',
	'6',
	'Vibrianium',
	'I am Groot',
	'Karen',
	'Force',
	'The Fourth Wall',
	'Yondu',
	'Charles Xaiver',
	"It's not a secret",
];
const allAnswers = ['answerA', 'answerB', 'answerC', 'answerD'];
let count = 0,
	score = 0,
	questionNumber = 1;

$(function() {
	function getAnswers(answers) {
		$(`[name=${answers}]`).attr('value', `${QUIZDATA[count][answers]}`);
	}

	function setAnswers() {
		allAnswers.forEach(getAnswers);
	}

	function setQuestion() {
		$('.quizQuestion').html(`<p>${QUIZDATA[count].question}</p>`);
	}

	function getUserAnswer() {
		//get the value of the clicked button
		$('.card-content').on('click', '[name^=answer]', function() {
			event.preventDefault();
			let userAnswer = $(this).attr('value');
			isTheAnswerCorrect(userAnswer);
		});
	}

	function giveFeedback(userAnswer) {
		//Return visual feedback of the answer
		return userAnswer === QUIZANSWERS[count]
			? '<h2>You are Correct</h2>'
			: `<h2>Wrong, the right answer is ${QUIZANSWERS[count]}</h2>`;
	}

	function isTheAnswerCorrect(userAnswer) {
		$('.feedback-for-user').html(giveFeedback(userAnswer));
		switchHiddenClass();
	}

	function switchHiddenClass() {
		$('#questionForm').toggleClass('hidden');
		$('#feedbackquiz').toggleClass('hidden');
	}

	function nextQuestion() {
		$('[value=NEXT]').on('click', function() {
			updateScore();
			updateQuestionNumber();
			count++;
			if (questionNumber <= QUIZDATA.length) {
				setAnswers();
				setQuestion();
				switchHiddenClass();
			} else {
				$('.feedback-for-user > h2').text(
					`You scored ${score} out of ${QUIZDATA.length} \n ${feedbackAndScoreForUser(
						score
					)}`
				);
				createRestartButton();
			}
		});
	}
	function feedbackAndScoreForUser(score) {
		if (score <= 3) {
			return 'That was rough, try again?';
		} else if (score >= 4 && score <= 6) {
			return 'Not terrible but not great, keep trying';
		} else if (score >= 7 && score <= 8) {
			return 'That was pretty good, one more time';
		} else if (score === 9) {
			return 'Awesome, you can almost taste perfection';
		} else {
			return 'Perfect';
		}
	}
	function createRestartButton() {
		$('[value=NEXT').attr('value', 'Restart');
		$('[value=Restart]').on('click', function() {
			location.reload();
		});
	}

	function updateScore() {
		let searchPhrase = $('.feedback-for-user > h2').text();
		if (searchPhrase.indexOf('Correct') >= 0) {
			score++;
			$('.score-count').text(score);
		}
	}

	function updateQuestionNumber() {
		questionNumber++;
		$('.question-count').text(questionNumber);
	}

	getUserAnswer();
	nextQuestion();
});
