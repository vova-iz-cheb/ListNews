import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions'

class ModalReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      pass: '',
      pass2: '',
      sex: 'male',
      errorMessage: '',
    }
  }

  componentDidMount() {
    const closeRegModalButton = document.querySelector('.form-reg__close');
    closeRegModalButton.addEventListener('click', closeRegModal);

    function closeRegModal(e) {
      e.preventDefault();
      document.body.style.overflowY = '';
      const modalReg = document.querySelector('.modal-reg');
      modalReg.style.display = '';
    }
  }
  
  onChangeLogin = (e) => {
    this.setState({login: e.target.value, errorMessage: ''})
  }

  onChangePass = (e) => {
    this.setState({pass: e.target.value, errorMessage: ''})
  }

  onChangePass2 = (e) => {
    this.setState({pass2: e.target.value, errorMessage: ''})
  }

  onChangeRadio = (e) => {
    this.setState({sex: e.target.value, errorMessage: ''})
  }

  onClickHandler = (e) => {
    e.preventDefault();

    const error = checkFields(this.state, this.props.users);

    if(error) {
      this.setState({errorMessage: error});
      return;
    } else {
      this.props.addUser({
        login: this.state.login,
        password: this.state.pass,
        sex: this.state.sex,
      })
    }

    this.setState({
      login: '',
      pass: '',
      pass2: '',
      sex: 'male',
      errorMessage: '',
    })
    document.querySelector('.form-reg__close').click();
  }

  render() {
    const state = this.state;
    const error = state.errorMessage ? <div className="form-reg__error">{state.errorMessage}</div> : null;

    return (
      <div className="modal-reg">
        <form action="" className="form-reg">
          <h2>Регистрация:</h2>
          {error}
          <label htmlFor="login">Login*</label><br />
          <input id="login" type="text" className="form-reg__login" value={state.login} onChange={ this.onChangeLogin} /><br />

          <label htmlFor="password">Password*</label><br />
          <input id="password" type="password" className="form-reg__password" value={state.pass} onChange={ this.onChangePass} /><br />

          <label htmlFor="password2">Confirm the password*</label><br />
          <input id="password2" type="password" className="form-reg__password2" value={state.pass2} onChange={ this.onChangePass2} /><br />
          <label>Sex*</label><br />

          <label htmlFor="male">Male</label> 
          <input type="radio" name="sex" id="male" value="male" checked={state.sex === 'male'} onChange={this.onChangeRadio}/>
          <label htmlFor="female">Female</label> 
          <input type="radio" name="sex" id="female" value="female" checked={state.sex === 'female'} onChange={this.onChangeRadio}/>

          <input onClick={this.onClickHandler} type="submit" className="form-reg__submit" value="Зарегистрироваться" />
          <a href="#" className="form-reg__close">&times;</a>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.allUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      dispatch(addUser(user))
    }
  }
}

function checkFields(state, users) {
  if(!state.login || !state.pass || !state.pass2 || !state.sex) {
    return 'Все поля должны обязательно быть заполнены!'
  }

  const match = users.findIndex((item) => {
    return item.login === state.login
  })

  if(~match) {
    return 'Такой пользователь уже существует!'
  }

  const regExpLogin = /^[0-9a-zA-Z]{4,10}$/

  if(! state.login.match(regExpLogin)) {
    return 'Логин должен состоять из цифр или латинских букв. Колличество символов от 4 до 10'
  }

  const regExpPass = /^[0-9a-zA-Z]{8,12}$/

  if(! state.pass.match(regExpPass)) {
    return 'Пароль должен состоять из цифр или латинских букв. Колличество символов от 8 до 12'
  }

  if(state.pass !== state.pass2) {
    return 'Пароли не совпадают!'
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalReg)