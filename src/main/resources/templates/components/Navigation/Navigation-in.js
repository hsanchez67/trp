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
                <ul class="nav navbar-nav navbar-right top-menu">
                    <li>
                        <input type="text" class="form-control input-sm search" placeholder="Search" />
                    </li>
                        <!-- user login dropdown start-->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <img alt="" src="./avatar1_small.jpg" />
                               <span class="username">John Doe</span>
                                <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                             <div class="log-arrow-up"></div>
                                    <li><a href="#"><i class=" fa fa-suitcase"></i>Profile</a></li>
                                    <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
                                    <li><a href="#"><i class="fa fa-bell-o"></i> Notification</a></li>
                                    <li><a href="login.html"><i class="fa fa-key"></i> Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }

}

export default Navigation;
