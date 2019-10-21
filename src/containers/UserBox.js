import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../actions'

class UserBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      pass: '',
    }
  }

  componentDidMount() {
    const showRegButton = document.querySelector('.form-auth__reg') || 0;
    if(showRegButton) {
      showRegButton.addEventListener('click', showRegModal);
    }
  }

  componentDidUpdate() {
    const showRegButton = document.querySelector('.form-auth__reg') || 0;
    if(showRegButton) {
      showRegButton.addEventListener('click', showRegModal);
    }
  }

  onChangeLogin = (e) => {
    this.setState({login: e.target.value});
  }

  onChangePass = (e) => {
    this.setState({pass: e.target.value});
  }

  onLogout = (e) => {
    e.preventDefault();

    let result = confirm('Вы уверены, что хотите выйти?');

    if(result) {
      this.props.logout();
    }
  }

  onLogin = (e) => {
    e.preventDefault();

    const {login:loginName, pass} = this.state; 
    if(!loginName || !pass) {
      alert('Все поля должны быть заполнены!')
      return;
    }

    const id = checkUser(loginName, pass, this.props.users);

    if(!id) {
      alert('Логин или пароль не верны!')
      return;
    }

    this.setState({
      login: '',
      pass: '',
    });
    this.props.login(id);
  }

  render() {
    const { currentUserId, users, login, logout } = this.props;
    let inner;
    if( !currentUserId ) {
      inner = (
        <form className="form-auth" action="">
          <input onChange={this.onChangeLogin} value={this.state.login} className="form-auth__login" type="text" name="login" placeholder="Login"/>
          <input onChange={this.onChangePass} value={this.state.pass} className="form-auth__password" type="password" name="password" placeholder="Password"/><br />
          <input onClick={this.onLogin} className="form-auth__submit" type="submit" value="Войти" />
          <input className="form-auth__reg" type="button" value="Регистрация" />
        </form>
      )
    } else {
      const { login:loginName, id, sex } = getCurrentUserData(currentUserId, users);

      const icon = <div className={'user__icon-' + sex}></div>

      inner = (
        <div className="user">
          {icon}
          <div>
            <p>{loginName}</p>
            <a onClick={this.onLogout} href="#" className="user__logout">Выйти</a>
          </div>
        </div>
      )
    }

    return <>{inner}</>
  }
}

function getCurrentUserData(currentUserId, users) {
  const user = users.find( item => item.id === currentUserId )
  return user;
}

function showRegModal() {
  document.body.style.overflowY = 'hidden';
  const modalReg = document.querySelector('.modal-reg');
  modalReg.style.display = 'block';
}

function checkUser(login, pass, users) {
  console.log(login,pass,users)
  const user = users.find( item => item.login === login && item.password === pass )
  
  if(user) {
    return user.id
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    users: state.users.allUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (id) => {
      dispatch(login(id))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBox)