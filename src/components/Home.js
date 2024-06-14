import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from './Head';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/posts/');
                setPosts(response.data);
            } catch (error) {
                setError('게시물을 가져오는 중 오류가 발생했습니다.');
                console.error('게시물을 가져오는 중 오류 발생:', error);
            }
        };

        fetchPosts();
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/users/check');
            setIsLoggedIn(response.data);
        } catch (error) {
            console.error('로그인 상태 확인 중 오류 발생:', error);
            setIsLoggedIn(false);
        }
    };

    const handleSendMessage = (userId) => {
        navigate(`/messages/${userId}`); // 경로를 올바르게 설정합니다.
    };

    return (
        <div className="container">
            <div id="wrapper">
                <Head />
                <div id="main">
                    {error && <p>{error}</p>}
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <article className="post" key={post.id}>
                                <header>
                                    <div className="title">
                                        <h2>
                                            <Link to={`/posts/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <p>{post.caption}</p>
                                    </div>
                                    <div className="meta">
                                        <time className="published" dateTime={post.createdDate}>{new Date(post.createdDate).toLocaleDateString()}</time>
                                    </div>
                                </header>
                                <Link to={`/posts/${post.id}`} className="image featured">
                                    {/*<img src={post.image} alt={post.title}/>*/}
                                    <img src={"/img/" + post.original} alt="Post"/>
                                </Link>
                                <footer>
                                <ul className="actions">
                                        <li>
                                            <Link to={`/posts/${post.id}`} className="button large">
                                                계속 읽기
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={() => handleSendMessage(post.authorId)} className="button large">
                                                쪽지 보내기
                                            </button>
                                        </li>
                                    </ul>
                                </footer>
                                <div className="keywords">
                                    {typeof post.keywords === 'string' ? (
                                        <p>해시태그: {post.keywords}</p>
                                    ) : Array.isArray(post.keywords) && post.keywords.length > 0 ? (
                                        <p>해시태그: {post.keywords.join(', ')}</p>
                                    ) : null}
                                </div>
                            </article>
                        ))
                    ) : (
                        <p>사용할 수 있는 게시물이 없습니다.</p>
                    )}
                </div>
                {/*{!isLoggedIn && (*/}
                {/*    <div className="restriction-message">*/}
                {/*        <p>로그인 후에 사진을 조회하고 게시글을 업로드할 수 있습니다.</p>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
}

export default Home;
