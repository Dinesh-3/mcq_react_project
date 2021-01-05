import React from "react";

export default class Layout extends React.Component {
    static defaultProps = {
        quiz: [{
            question: "2 X 60 = ?",
            choices: ["120", "80", "90", "60"],
            answer: 0
        },
        {
            question: "3 + 5 - 10 + 4 = ?",
            choices: ["1", "3", "2", "-1"],
            answer: 2
        },
        {
            question: "1 + 4 - 7 + 5 = ?",
            choices: ["2", "3", "4", "6"],
            answer: 1
        },
        {
            question: "200/10 = ?",
            choices: ["2000", "2", "20", "30"],
            answer: 2
        }
        ]
    };
    constructor(props) {
        super(props);
        this.state = {
            quizCount: 0,
            score: 0
        }
    }
    getNextQuestion() {
        this.setState({ quizCount: this.state.quizCount + 1 });
    }
    incrementScore() {
        this.setState({ score: this.state.score + 1 });
    }
    render() {
        let { quiz } = this.props;
        let { quizCount, score } = this.state;
        let content = null;

        if (quizCount < quiz.length) {
            content = <QuizContent currentQuiz={quiz[quizCount]}
                getNextQuestion={this.getNextQuestion.bind(this)}
                incrementScore={this.incrementScore.bind(this)} />
        } else {
            content = <h1>
                Your Score is : {score}
            </h1>
        }
        return (
            <div>
                <h1> MCQ APP </h1>
                {content}
            </div>
        );
    }
}

class QuizContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifButtonSubmit: true
        }
    }
    clickSubmit() {
        let { currentQuiz } = this.props;
        let userChoice = document.querySelector('input[name="choices"]:checked');
        var ele = document.getElementsByName('choices');
        for (var i = 0; i < ele.length; i++) {
            ele[i].disabled = true;
        }
        if (userChoice) {
            userChoice = Number(userChoice.value);
            if (userChoice === currentQuiz.answer) {
                this.props.incrementScore();
            }
            document.getElementById(userChoice).style.backgroundColor = "red"; 
        }
        document.getElementById(currentQuiz.answer).style.backgroundColor = "green"; 
    }
    clickNext() {
        this.props.getNextQuestion();
        var ele = document.getElementsByName('choices');
        for (var i = 0; i < ele.length; i++) {
            ele[i].checked = false;
            ele[i].disabled = false;
        }

        var arrChoice = document.getElementsByClassName('choice_name');
        for (var i = 0; i < arrChoice.length; i++) {
            arrChoice[i].style.backgroundColor = "white";
        }
    }
    clickButton(e) {
        let { ifButtonSubmit } = this.state;
        if (ifButtonSubmit) {
            this.clickSubmit();
        } else {
            this.clickNext();
        }
        this.setState({ ifButtonSubmit: !ifButtonSubmit });
    }
    render() {
        let { currentQuiz } = this.props;
        let { ifButtonSubmit } = this.state;
        let buttonText = null;
        ifButtonSubmit ? (buttonText = 'Submit') : (buttonText = 'Next');
        return (
            <div>
                {currentQuiz.question}
                <Choices choices={currentQuiz.choices} />
                <button onClick={this.clickButton.bind(this)}>{buttonText}</button>
            </div>
        )
    }
}



class Choices extends React.Component {
    render() {
        let { choices } = this.props;
        var createChoice = function (choice, index) {
            return (
                <div key={index}>
                    <input name="choices" value={index} type="radio" /><label class="choice_name" id={index}>{choice}</label>
                    <br />
                </div>
            );
        };
        return (
            <div id="choice">
                {choices.map(createChoice)}
            </div>

        );
    }
}
