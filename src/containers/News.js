import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editNews, deleteNews } from '../actions'

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { news } = this.props;

    if(! news.length ) return <p>К сожалению новостей нет.</p>

    

    const newsJsx = news.map( item => {
      const date = getDateString(item.timestamp);
      return (
        <li key={item.id} className='news__item'>
          {/* <div class="news__panel">
            <a href="" class="news__edit"><i class="icon-pencil fa-lg"></i></a>
            <a href="" class="news__delete"><i class="icon-trash-empty fa-lg"></i></a>
          </div> */}
          <article>
              <h2>{item.title}</h2>
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
  return {
    news: state.news.allNews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News)