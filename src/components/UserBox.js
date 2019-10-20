import React, { Component } from 'react'

export default class extends Component {
  componentDidMount() {
    const showRegButton = document.querySelector('.form-auth__reg');
    showRegButton.addEventListener('click', showRegModal);

    function showRegModal() {
      document.body.style.overflowY = 'hidden';
      const modalReg = document.querySelector('.modal-reg');
      modalReg.style.display = 'block';
    }
  }

  render() {
    return (
      <div className="user-box">
        <form className="form-auth" action="">
          <input className="form-auth__login" type="text" name="login" placeholder="Login"/>
          <input className="form-auth__password" type="password" name="password" placeholder="Password"/><br />
          <input className="form-auth__submit" type="submit" value="Войти" />
          <input className="form-auth__reg" type="button" value="Регистрация" />
        </form>
      </div>
    )
  }
}