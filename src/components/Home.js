import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from './Head';
import './Home.css';
import {Link} from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [miniPosts, setMiniPosts] = useState([]);

  useEffect(() => {
    // 데이터베이스에서 게시물 가져오기
    axios.get('http://localhost:8081/api/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className="container">
    <div id="wrapper">

      <Head />
      <div id="main">
        {posts.length > 0 ? posts.map(post => (
          <article className="post" key={post._id}>
            <header>
              <div className="title">
                <h2><a href="#">{post.description}</a></h2>
                <p>{post.keyword}</p>
              </div>
              <div className="meta">
                <time className="published" dateTime={post.timestamp}>{new Date(post.timestamp).toLocaleDateString()}</time>
                <a href="#" className="author"><span className="name">{post.userId}</span><img src={post.imgUrl} alt="" /></a>
              </div>
            </header>

            <a href="#" className="image featured"><img src={post.imgUrl} alt="" /></a>
            {/* <p>{post.content}</p>
            <p>{post.keywords.join(', ')}</p> */}
            <footer>
              <ul className="actions">
                <li><a href="#" className="button large">Continue Reading</a></li>
              </ul>
              <ul className="stats">
                <nav>
                  <ul className="stats">
                    <li>
                      <Link className="fa-message" to="/messageChat">쪽지 보내기</Link>
                    </li>
                    {/* 다른 링크들도 여기에 추가할 수 있습니다 */}
                  </ul>
                </nav>

              </ul>
            </footer>
          </article>
        )) : <p>No posts available</p>}
      </div>

      {/* <section id="sidebar">
        <section id="intro">
          <header>
            <h2>Photo Diary</h2>
          </header>
        </section>
      </section> */}
    </div>
    </div>
  );
}

export default Home;