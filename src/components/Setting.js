import React, { Component } from 'react'

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radio: document.body.style.fontSize || '16px',
    }
  }

  handleChange = (e) => {
    document.body.style.fontSize = e.currentTarget.value;
    this.setState({radio: e.currentTarget.value});
  }

  render() {
    return (
      <div className="container grow1">
        <main className="main">
          <div className="row">
            <div className="col">
              <h1>Setting</h1>
              <form action="" className='setting'>
                <h2>Размер шрифта:</h2>
                <label htmlFor="small">Маленький</label>
                <input onChange={this.handleChange} type="radio" id="small" value="14px" name="fontSize" checked={this.state.radio === '14px'}/><br />
                <label htmlFor="default">Стандартный</label>
                <input onChange={this.handleChange} type="radio" id="default" value="16px" name="fontSize" checked={this.state.radio === '16px'}/><br />
                <label htmlFor="big">Большой</label>
                <input onChange={this.handleChange} type="radio" id="big" value="18px" name="fontSize" checked={this.state.radio === '18px'}/><br />
              </form>
            </div>
          </div>
        </main>
      </div>
    )
  }
}