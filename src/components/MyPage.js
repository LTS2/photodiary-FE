import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from './Head';
import './Mypage.css';
import EditPostForm from './EditPostForm';
import {Link} from "react-router-dom";

const MyPage = () => {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [editingPostId, setEditingPostId] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get('http://localhost:8081/api/posts/');
				setPosts(response.data);
			} catch (error) {
				setError('Error fetching posts');
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, []);

	const handleEditClick = (postId) => {
		setEditingPostId(postId);
	};

	const handleCloseEditForm = () => {
		setEditingPostId(null);
	};

	const handleDelete = async (postId) => {
		try {
			await axios.delete(`http://localhost:8081/api/posts/${postId}`,
				{
					withCredentials: true,
			});
			// 삭제 후 포스트 목록을 다시 불러옴
			const response = await axios.get('http://localhost:8081/api/posts/');
			setPosts(response.data);
		} catch (error) {
			setError('Error deleting post');
			console.error('Error deleting post:', error);
		}
	};

	return (
		<div className="container">
			<div id="wrapper">
				<Head/>
				<div id="main">
					{error && <p>{error}</p>}
					{posts.length > 0 ? posts.map(post => (
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
									<time className="published"
									      dateTime={post.createdDate}>{new Date(post.createdDate).toLocaleDateString()}</time>
									<a className="author"><span className="name">{post.authorId}</span><img
										src={`data:image/jpeg;base64,${post.image}`} alt=""/></a>
								</div>
							</header>
							<a href="#" className="image featured"><img src={`data:image/jpeg;base64,${post.image}`}
							                                            alt=""/></a>
							<footer>
								<ul className="actions">
									<li><a href="#edit" onClick={() => handleEditClick(post.id)}>Edit</a></li>
									<li><a href="#delete" onClick={() => handleDelete(post.id)}>Delete</a></li>
								</ul>
							</footer>
						</article>
					)) : <p>No posts available</p>}
				</div>
			</div>
			{editingPostId && (
				<EditPostForm
					postId={editingPostId}
					onClose={handleCloseEditForm}
					onUpdate={() => {
						const fetchPosts = async () => {
							try {
								const response = await axios.get('http://localhost:8081/api/posts/');
								setPosts(response.data);
							} catch (error) {
								setError('Error fetching posts');
								console.error('Error fetching posts:', error);
							}
						};

						fetchPosts();
					}}
				/>
			)}
		</div>
	);
}

export default MyPage;
