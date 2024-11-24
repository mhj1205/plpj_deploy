import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import boardApi from '../boardApi';

const BoardCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const email =localStorage.getItem('username');
  const token =localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰을 설정합니다.
    boardApi.setAuthToken(token);
  }, [token]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newBoard ={
        userEmail:email,
        title: title,
        content:content
    }
    try{
        await boardApi.createBoard(newBoard);
    }
    catch(e){
        console.error('게시글 추가 실패:', e);
    }
    navigate('/Board');
  };

  return (
    <div className="create-form">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>내용:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default BoardCreate;
