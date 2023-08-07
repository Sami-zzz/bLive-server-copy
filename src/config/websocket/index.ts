import { Server } from 'socket.io';

import { chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';

export const connectWebSocket = (server) => {
  const io = new Server(server);
  console.log(chalkSUCCESS('初始化websocket成功！'));

  io.on('connection', (socket) => {
    console.log(chalkWARN('收到connection'), socket.id);
  });
  io.on('offer', (socket) => {
    console.log('收到offer', socket);
  });
  io.on('answer', (socket) => {
    console.log('收到answer', socket);
  });
  io.on('joined', (socket) => {
    console.log('收到joined', socket);
  });
  io.on('message', (socket) => {
    console.log('收到message', socket);
  });
};
