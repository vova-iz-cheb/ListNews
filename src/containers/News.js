import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editNews, deleteNews } from '../actions'

class News extends Component {

  render() {
    const { isLogged, news, editNews, deleteNews } = this.props;

    if(! news.length ) return <p>К сожалению новостей нет.</p>

    const newsJsx = news.map( item => {
      const date = getDateString(item.timestamp);
      return (
        <li key={item.id} className='news__item'>
          { isLogged ? 
            (<div className="news__panel">
              <a onClick={
                (e) => {
                  e.preventDefault();
                  editNews(item.id);
                }
              } href="" className="news__edit"><i className="icon-pencil fa-lg"></i></a>
              <a onClick={
                (e) => {
                  e.preventDefault();
                  deleteNews(item.id);
                }
              } href="" className="news__delete"><i className="icon-trash-empty fa-lg"></i></a>
            </div>)
            : null }
          <article>
              <h2 className='news__header'>{item.title}</h2>
              <p>{item.content}</p>
              <footer>
                <p>Автор: <span>{item.author}</span></p>
                <p>Опубликовано: <time>{date}</time></p>
              </footer>
          </article>
        </li>
      )
    })

    return (
      <ul className='news'>
        {newsJsx}
      </ul>
    )
  }
}

function getDateString(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  
  return `${day}.${month}.${year}`;
}

const mapStateToProps = (state) => {
  const userId = state.users.currentUserId;
  const isLogged = userId ? true : false;

  return {
    isLogged,
    news: state.news.allNews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editNews: (id) => {
      dispatch(editNews(id))
    },
    deleteNews: (id) => {
      dispatch(deleteNews(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News)