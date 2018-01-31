import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar is-transparent">
        { this.props.authenticated
          ?
          <div className="navbar-brand">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Hello User
              </div>
              <div className="navbar-dropdown is-boxed">
                <Link to="/logout" className="navbar-item" >
                  Sign out
                </Link>
              </div>
            </div>
          </div>
          :
          <div></div>
        }
      </div>
    );
  }
}

export default NavBar;
