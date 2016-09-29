import React from 'react';
import styles from './Header.css';
import Navigation from '../Navigation';

class Header {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick="">
            <img className="Header-brandImg" src="./LATCH-Logo-White.png" height="38" alt="Latch" />
          </a>
          <Navigation className="Header-nav" />
        </div>
      </div>
    );
  }

}

export default Header;
