import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import boardApi from '../boardApi';

const BoardDetails =()=>{
    const { id } = useParams();
    const [board, setBoard] = useState();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')

    useEffect(() => {
        // 토큰을 설정합니다.
        boardApi.setAuthToken(token);
        console.log(id)
        const fetchBoards = async () => {
            try {
                const data = await boardApi.getBoard(id);
                setBoard(data); // 데이터 설정
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };
        fetchBoards();
    }, [id,token]);

    if (loading) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    // board가 없을 때 오류 처리
    if (!board) {
        return <p>게시글을 찾을 수 없습니다.</p>;
    }

    const handleDelete=async(id)=> {
        await boardApi.deleteBoard(id);
        alert(`게시글 ${id}이(가) 삭제되었습니다.`);
    }

    return (
        <div className="board-detail">
            <h1>{board.title}</h1>
            <div className="board-info">
                <span>작성자: {board.author}</span> | <span>작성일: {board.createdAt}</span>
            </div>
            <div className="board-content">
                <p>{board.content}</p>
            </div>
            <div className="board-actions">
                <Link to={`/board/edit/${board.id}`}>
                    <button>수정</button>
                </Link>
                <button onClick={() => handleDelete(board.id)}>삭제</button>
            </div>
            <Link to="/board">
                <button>목록으로 돌아가기</button>
            </Link>
        </div>
    );
}

export default BoardDetails;
