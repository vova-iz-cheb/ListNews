import React, { Component } from 'react'
import { connect } from 'react-redux'
import { specifyEditableNews, deleteNews } from '../actions'
import { NavLink } from 'react-router-dom'

class News extends Component {
  deleteNews = (e, id) => {
    e.preventDefault();
    const result = confirm('Вы действительно ходитите удалить новость?');
    result ? this.props.deleteNews(id) : null;
  }

  render() {
    const { isLogged, news, specifyEditableNews } = this.props;

    if(! news.length ) return <p>К сожалению новостей нет.</p>

    let cloneNews = [...news];
    cloneNews.reverse();
    const newsJsx = cloneNews.map( item => {
      const date = getDateString(item.timestamp);
      return (
        <li key={item.id} className='news__item'>
          { isLogged ? 
            (<div className="news__panel">
              <NavLink onClick={
                () => {
                  specifyEditableNews(item.id);
                }
              } to='/editnews' className="news__edit"><i className="icon-pencil fa-lg"></i></NavLink>
              <a onClick={(e) => this.deleteNews(e, item.id)} href="" className="news__delete"><i className="icon-trash-empty fa-lg"></i></a>
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
    deleteNews: (id) => {
      dispatch(deleteNews(id))
    },
    specifyEditableNews: (id) => {
      dispatch(specifyEditableNews(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News)