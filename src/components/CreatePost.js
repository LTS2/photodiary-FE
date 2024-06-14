import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import './CreatePost.css';

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    // 키워드를 #을 기준으로 분리하여 배열로 저장
    const keywordArray = keywords.split(' ').filter(keyword => keyword.startsWith('#'));
    formData.append('keywords', JSON.stringify(keywordArray)); // JSON 문자열로 변환하여 전송

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Post submitted successfully:', response.data);
      navigate('/'); // 포스트 제출 후 홈으로 리디렉션
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="post-container">
      <div className="upload-section">
        <label htmlFor="upload-image">Upload Image</label>
        <input type="file" id="upload-image" name="upload-image" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img id="image-preview" className="image-preview" src={imagePreview} alt="Image Preview" />}
      </div>
      <div className="caption-section">
        <textarea
          id="caption"
          name="caption"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <input
          type="text"
          id="keywords"
          name="keywords"
          placeholder="Enter keywords, please start with #"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <br />
        <br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CreatePost;
