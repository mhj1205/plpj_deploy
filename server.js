// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// 정적 파일 제공
app.use(express.static('./build'));

// 프록시 설정
app.use(
  '/Gathertown',
  createProxyMiddleware({
    target: 'https://api.gather.town',  // API 도메인 변경
    changeOrigin: true,
    pathRewrite: { '^/gather-town': '/api' }, // /gather-town 경로를 /api로 리다이렉트
    ws: true,  // WebSocket 프록시 활성화
  })
);
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.gather.town',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    ws: true,
  })
);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
