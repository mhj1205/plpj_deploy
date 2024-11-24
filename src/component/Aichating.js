import axios from "axios";
import { useState } from "react";

const Aichating = ({Aichat}) => {
  const [chatHistory, setChatHistory] = useState([]); // 대화 내역을 배열로 관리
  const [inputValue, setInputValue] = useState(''); // 입력 필드 내용

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력 필드 값 업데이트
  };

  const handleChatSubmit = async() => {
    if (inputValue.trim()) {
      // 사용자의 메시지를 대화 내역에 추가
      const userMessage = { sender: "user", text: inputValue };
      setChatHistory([...chatHistory, userMessage]);
        
      // 입력 필드 초기화
      setInputValue('');

      // 챗봇의 응답을 대화 내역에 추가 (여기서는 간단한 예시로 구현)
      
      const generation = await Aichat(userMessage.text);
      console.log(generation)
      const botReply = { sender: "bot", text: await generation.genera};
      setChatHistory((prevHistory) => [...prevHistory, botReply]);
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container px-5">
          <div className="row bg-light rounded-3 py-5 px-4 px-md-5 AiCat"
                style={{    display: "flex", alignContent: "flex-start"}}>
            {/* 대화 내역을 번갈아 가면서 표시 */}
            {chatHistory.length > 0 ? (
              chatHistory.map((message, index) => (
                <div key={index} className="message" style={{ justifyContent: message.sender === "user" ? "flex-end":"flex-start"}}>
                    <div
                        className={message.sender === "user" ? "userChta-text":"aiChta-text"}
                    >
                    {message.text}
                    </div>
                </div>
              ))
            ) : (
              '여기에 챗봇과의 대화 내용이 표시됩니다.'
            )}
          </div>
          <div
            className="col"
            style={{
              padding: "0 3rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="여기에 메시지를 입력하세요"
            />
            <button className="btn btn-primary btn-lg" onClick={handleChatSubmit}>
              <i className="bi bi-chat-dots" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aichating;
