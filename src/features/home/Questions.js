import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Answer from './Answer';

export class Questions extends Component {
  state = {}

  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  createAnswers(correctAnswer, badAnwsers, keyQuestion) {
    const allAnswers = [...correctAnswer, ...badAnwsers];
    return allAnswers.map( (answer, index) => (
      <Answer
        class="answer"
        answer={answer}
        key={`${index}-${answer}-${keyQuestion}`} 
      />
    ))
  }

  createQuestions() {
    const { questions } = this.props.home;
    return questions.map((data, index) => {
      return (
        <div key={index} className="pregunta">
          <p>{index + 1}.-{data.pregunta} </p>
          { this.createAnswers([data.correct_answer], data.incorrect_answers, index) }
        </div>
      )

    });
  }

  render() {
    const { fetchQuestions } = this.props.actions;
    const { 
      fetchQuestionsPending,
      fetchQuestionsError,
      fetchedQuestions,
      questions } = this.props.home;
    return (
      <div className="home-questions">
        <h3 className="title"> Questions : { this.state.questions}</h3>
        <button className="btn-fetch-questions"
          disabled={fetchQuestionsPending || fetchedQuestions }
          onClick={fetchQuestions}>
          { fetchQuestionsPending ? 'Loading...' : 'Get Questions'}
        </button>
        { fetchQuestionsError && (
          <div className="fetch-list-error">
            Failed to load: {fetchQuestionsError.toString()}
          </div>
        )}

        { questions ? (
          this.createQuestions()
        ) : (
          <div className="no-items-tip">
            Please click on the button for start the quiz
          </div>
        )}
        
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);
