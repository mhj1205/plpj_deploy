import axios from 'axios';

const BASE_URL = 'http://localhost:8080/board'; // 백엔드 URL에 맞게 수정하세요.

const boardApi = {
    // JWT 토큰 설정
    setAuthToken: (token) => {
        if (token) {
            // Authorization 헤더에 Bearer 토큰 추가
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // 토큰이 없으면 Authorization 헤더 제거
            delete axios.defaults.headers.common['Authorization'];
        }
    },

    // 모든 게시글 조회
    getAllBoards: async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching boards:', error);
            throw error;
        }
    },

    // 특정 게시글 조회
    getBoard: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching board:', error);
            throw error;
        }
    },

    // 게시글 추가
    createBoard: async (boardDTO) => {
        try {
            const response = await axios.post(BASE_URL, boardDTO);
            return response.data;
        } catch (error) {
            console.error('Error creating board:', error);
            throw error;
        }
    },

    // 게시글 수정
    updateBoard: async (id, boardDTO) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, boardDTO);
            return response.data;
        } catch (error) {
            console.error('Error updating board:', error);
            throw error;
        }
    },

    // 게시글 삭제
    deleteBoard: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting board:', error);
            throw error;
        }
    },

    // 특정 게시글에 댓글 추가
    createComment: async (boardId, commentDTO) => {
        try {
            const response = await axios.post(`${BASE_URL}/${boardId}/comments`, commentDTO);
            return response.data;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    },

    // 특정 댓글 수정
    updateComment: async (boardId, commentId, commentDTO) => {
        try {
            const response = await axios.put(`${BASE_URL}/${boardId}/comments/${commentId}`, commentDTO);
            return response.data;
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    },

    // 특정 댓글 삭제
    deleteComment: async (boardId, commentId) => {
        try {
            await axios.delete(`${BASE_URL}/${boardId}/comments/${commentId}`);
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
};

export default boardApi;
