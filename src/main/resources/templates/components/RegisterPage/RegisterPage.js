/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RegisterPage.css';
import '../../../node_modules/react-bootstrap/dist/react-bootstrap.js';


@withStyles(styles)
class RegisterPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Registration';
    this.context.onSetTitle(title);

    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h2>{title}</h2>
          <div className="container">
            <form className="form-signin">
              <label for="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
              <label for="inputPassword" className="sr-only">Password</label>
               <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
               <div className="checkbox">
                 <input type="checkbox" value="remember-me" />
                 <label>Remember me</label>
               </div>
               <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default RegisterPage;
