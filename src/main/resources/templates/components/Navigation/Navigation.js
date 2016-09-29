import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';

class Navigation {

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/about" onClick="">About</a>
        <a className="Navigation-link" href="/contact" onClick="">Contact</a>
        <span className="Navigation-spacer"> | </span>
        <a className="Navigation-link" href="/login" onClick="">Log in</a>
        <span className="Navigation-spacer">or</span>
        <a className="Navigation-link Navigation-link--highlight" href="/register" onClick="">Sign up</a>
      </div>
    );
  }

}

export default Navigation;
