import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from './Head';
import './Mypage.css';

const My = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 토큰 가져오기
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/myposts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts');
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div id="wrapper">
        <Head />
        <div id="main">
          {error && <p>{error}</p>}
          {posts.length > 0 ? posts.map(post => (
            <article className="post" key={post._id}>
              <header>
                <div className="title">
                  <h2><a href="#">{post.description}</a></h2>
                  <p>{post.keyword}</p>
                </div>
                <div className="meta">
                  <time className="published" dateTime={post.timestamp}>{new Date(post.timestamp).toLocaleDateString()}</time>
                  <a className="author"><span className="name">{post.userId}</span><img src={post.imgUrl} alt="" /></a>
                </div>
              </header>
              <a href="#" className="image featured"><img src={post.imgUrl} alt="" /></a>
              <footer>
                <ul className="actions">
                  <li><a href="#edit">Edit</a></li>
                </ul>
              </footer>
            </article>
          )) : <p>No posts available</p>}
        </div>
      </div>
    </div>
  );
}

export default My;
