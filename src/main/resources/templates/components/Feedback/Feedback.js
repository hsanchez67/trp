/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Feedback.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Feedback {

  render() {
    return (
      <div className="Feedback">
        <div className="Feedback-container">
          <a className="Feedback-link" href="">Ask a question</a>
          <span className="Feedback-spacer">|</span>
          <a className="Feedback-link" href="">Report an issue</a>
        </div>
      </div>
    );
  }

}

export default Feedback;
