import React from "react";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Answer from "./components/Answer/Answer";
import QuestionParagraph from "./components/Question/Question.js";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";

import logo from "../assets/logo.svg";
import theme from "./styles/theme";
import styles from "./styles/style";
import getQuestions from "./models/factories/get-questions-service";
class App extends React.Component {
    state = {
        questions: getQuestions(),
        clientAnswerIndexes: [],
        currentQuestionIndex: 0
    };

    componentDidUpdate(prevProps, prevState) {
        this.updateButtonsPos();
    }

    componentDidMount() {
        window.onorientationchange = () => this.updateButtonsPos();
        window.onresize = () => this.updateButtonsPos();

        this.updateButtonsPos();

        setTimeout(() => {
            this.updateButtonsPos();
        }, 0);
    }

    onNextClick = e => {
        const currentState = this.state;
        this.setState({
            currentQuestionIndex: ++currentState.currentQuestionIndex
        });
    };

    onPrevClick = e => {
        const currentState = this.state;
        this.setState({
            currentQuestionIndex: --currentState.currentQuestionIndex
        });
    };

    onSubmitClick = e => {
        console.log("submit");
    };

    updateButtonsPos = () => {
        let buttons = Array.from(document.getElementById("buttonsContainer").children);
        let mainContainer = document.querySelector("#root > div > div");

        buttons.forEach(button => {
            button.style.bottom = "0px";
        });

        const bottomPosition = mainContainer.clientHeight - mainContainer.scrollHeight + 20;

        buttons.forEach(button => {
            button.style.bottom = bottomPosition + "px";
        });
    };
    getCurrentQuestion = () => this.state.questions[this.state.currentQuestionIndex].question;
    getCurrentAnswers = () => this.state.questions[this.state.currentQuestionIndex].answer;
    shouldShowSubmit = () => this.state.currentQuestionIndex === this.state.questions.length - 1;
    shouldShowNext = () => this.state.currentQuestionIndex !== this.state.questions.length - 1;
    shouldShowPrev = () => this.state.currentQuestionIndex !== 0;

    render() {
        const { classes } = this.props;

        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <Paper className={classes.paper} elevation={2}>
                        <img src={logo} className={classes.logo} alt="logo" />
                        <hr width={"100%"} />

                        <QuestionParagraph question={this.getCurrentQuestion()} />

                        <div className={classes.answerContainer}>
                            {this.getCurrentAnswers().map((currentAnswer, index) => {
                                return <Answer answer={currentAnswer} key={index} />;
                            })}
                        </div>

                        <div id="buttonsContainer">
                            {this.shouldShowSubmit() ? (
                                <Button
                                    variant="contained"
                                    className={classes.btnSubmit}
                                    onClick={this.onSubmitClick}
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            ) : null}

                            {this.shouldShowNext() ? (
                                <Button
                                    variant="contained"
                                    className={classes.btnNext}
                                    onClick={this.onNextClick}
                                    color="primary"
                                >
                                    Next
                                </Button>
                            ) : null}

                            {this.shouldShowPrev() ? (
                                <Button
                                    variant="contained"
                                    className={classes.btnPrev}
                                    onClick={this.onPrevClick}
                                    color="primary"
                                >
                                    Prev
                                </Button>
                            ) : null}
                        </div>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(App);