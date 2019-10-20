import React, { Component } from 'react'

export default class extends Component {
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
  
  render() {
    return (
      <div className="modal-reg">
        <form action="" className="form-reg">
          <h2>Регистрация:</h2>
          <label htmlFor="login">Login*</label><br />
          <input id="login" type="text" className="form-reg__password" /><br />
          <label htmlFor="password">Password*</label><br />
          <input id="password" type="password" className="form-reg__password2" /><br />
          <label htmlFor="password2">Confirm the password*</label><br />
          <input id="password2" type="password" className="form-reg__login" /><br />
          <input type="submit" className="form-reg__submit" value="Зарегистрироваться" />
          <a href="" className="form-reg__close">&times;</a>
        </form>
      </div>
    )
  }
}