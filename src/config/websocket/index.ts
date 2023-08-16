import { Server } from 'socket.io';

import {
  WsAnswerType,
  WsJoinType,
  WsMsgTypeEnum,
  WsOfferType,
} from '@/interface-ws';
import { chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';

export const connectWebSocket = (server) => {
  const io = new Server(server);
  console.log(chalkSUCCESS('初始化websocket成功！'));

  // 每次链接都会触发connection
  io.on(WsMsgTypeEnum.connection, (socket) => {
    console.log(chalkWARN('收到connection'), socket.id);

    socket.on(WsMsgTypeEnum.join, (data: WsJoinType) => {
      console.log('收到join', data);
      socket.join(data.data.room_id);
      socket.emit(WsMsgTypeEnum.joined, data);
    });

    socket.on(WsMsgTypeEnum.offer, (data: WsOfferType) => {
      console.log('收到offer', data);
      socket.to(data.data.room_id).emit(WsMsgTypeEnum.offer, data);
    });

    socket.on(WsMsgTypeEnum.answer, (data: WsAnswerType) => {
      console.log('收到answer', data);
      socket.to(data.data.room_id).emit(WsMsgTypeEnum.answer, data);
    });

    socket.on(WsMsgTypeEnum.candidate, (data: WsAnswerType) => {
      console.log('收到candidate', data);
      socket.to(data.data.room_id).emit(WsMsgTypeEnum.candidate, data);
    });

    socket.on(WsMsgTypeEnum.joined, (data) => {
      console.log('收到joined', data);
    });

    socket.on(WsMsgTypeEnum.message, (data) => {
      console.log('收到message', data);
    });
  });
};
