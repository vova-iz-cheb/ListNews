import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  componentDidMount() {
    const toggler = document.querySelector('.nav__toggler');
    toggler.addEventListener('click', toggleNavMenu);

    function toggleNavMenu() {
      const navMenu = document.querySelector('.nav__list');
      const height = navMenu.scrollHeight;

      if(!navMenu.style.maxHeight) {
        navMenu.style.maxHeight = height + 42 + 'px';
      } else {
        navMenu.style.maxHeight = '';
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="col order-0 d-lg-none">
          <a href="javascript:void(0)" className="nav__toggler">
            <i className="icon-menu fa-2x"></i>
          </a>
        </div>
        <div className="col-12 order-2 col-lg order-lg-0">
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink exact to='/' className="nav__link">
                  <i className="icon-home fa-lg"></i> Home
                </NavLink>
              </li>
              {this.props.isLogged ? 
                <li className="nav__item">
                  <NavLink to='/addnews' className="nav__link">
                    <i className="icon-newspaper fa-lg"></i> Add News
                  </NavLink>
                </li> 
                : null }
              <li className="nav__item">
                <NavLink to='/setting' className="nav__link"><i className="icon-cog fa-lg"></i> Setting
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to='/about' className="nav__link"><i className="icon-info fa-lg"></i> About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const userId = state.users.currentUserId;
  const isLogged = userId ? true : false;

  return {
    isLogged
  }
}

export default connect(
  mapStateToProps
)(Nav)