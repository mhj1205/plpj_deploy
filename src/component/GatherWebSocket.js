import React, { useEffect, useState } from 'react';

function GatherWebSocket() {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    const ws = new WebSocket("wss://ip-10-203-135-181.ap-northeast-1-a.prod.aws.gather.town:443/");

    ws.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
      setConnectionStatus("Connected");
    };

    ws.onmessage = (event) => {
      console.log("수신된 메시지:", event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket 연결이 닫혔습니다.");
      setConnectionStatus("Disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket 오류:", error);
      setConnectionStatus("Error");
    };

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Gather WebSocket 연결 상태: {connectionStatus}</h2>
    </div>
  );
}

export default GatherWebSocket;
