import { useEffect,useState } from "react"
import { Link } from 'react-router-dom';
import boardApi from "../boardApi"
const Board=()=>{
    const [boards, setBoards] = useState([]);
    const token =localStorage.getItem('token');
    
    useEffect(() => {
        // 토큰을 설정합니다.
        boardApi.setAuthToken(token);

        const fetchBoards = async () => {
            try {
                const data = await boardApi.getAllBoards();
                setBoards(data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchBoards();
    }, [token]);
    console.log(boards);
    return(<>
                <>
            <table className="board-list">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board, index) => (
                        <tr key={board.id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/Board/${board.id}`}>{board.title}</Link></td>
                            <td>{board.author}</td>
                            <td>{board.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 게시글 작성 페이지로 가는 버튼 추가 */}
            <div style={{ marginTop: '20px' }}>
                <Link to="/Board/Create">
                    <button>글 작성하기</button>
                </Link>
            </div>
        </>
    </>)
}

export default Board