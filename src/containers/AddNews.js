import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNews } from '../actions'

class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      errorMessage: '',
    }
  }

  componentWillUnmount() {
    this.setState({
      title: '',
      content: '',
      errorMessage: '',
    })
  }

  onChangeTitle = (e) => {
    this.setState({title: e.target.value, errorMessage: ''})
  }

  onChangeContent = (e) => {
    this.setState({content: e.target.value, errorMessage: ''})
  }

  onClickHandler = (e) => {
    e.preventDefault();

    const error = checkFields(this.state);

    if(error) {
      this.setState({errorMessage: error});
      return;
    } else {
      this.props.createNews({
        title: this.state.title,
        content: this.state.content,
        author: this.props.author,
      });

      document.querySelector('.nav__link').click();
    }
  }
  
  render() {
    const { title, content, errorMessage } = this.state;
    const author = this.props.author;

    if(author === 'Anonim') {
      setTimeout(() => {
        document.querySelector('.nav__link').click();
      },0) // без асинхронной функции кнопка nav__link не успевает отрендериться
    }

    const error = errorMessage ? <div className="addnews__error">{errorMessage}</div> : null;

    return (
      <div className="container grow1">
        <main className="main">
          <div className="row">
            <div className="col">
              <h1>Add news:</h1>
              <form action="" className="addnews">
                { error }
                <label htmlFor="title">Заголовок*</label><br />
                <input id="title" type="text" className="addnews__title" value={title} onChange={ this.onChangeTitle } /><br />

                <label htmlFor="content">Текст*</label><br />
                <textarea id="content" className="addnews__content" value={content} onChange={ this.onChangeContent } ></textarea><br />

                <input onClick={this.onClickHandler} type="submit" className="addnews__submit" value="Создать" />
              </form>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

function checkFields({title, content}) {
  if( !title || !content ) {
    return 'Все поля должны обязательно быть заполнены!'
  }

  if(title.length > 100) {
    return 'Заголовок не должен превышать 100 символов!'
  }

  if(content.length > 1000) {
    return 'Содержимое новости не должено превышать 1000 символов!'
  }
}

const mapStateToProps = (state) => {
  const id = state.users.currentUserId
  let author;
  state.users.allUsers.forEach( (item) => {
    if(item.id === id) author = item.login
  });

  author ? null : author = 'Anonim';

  return {
    author
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNews: (newsData) => {
      dispatch(createNews(newsData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNews)