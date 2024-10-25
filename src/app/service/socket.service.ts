import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  
  constructor() {
    this.socket = io('http://localhost:3000',{}); // Thay đổi URL nếu cần

  }

    // Hàm để đăng ký userID với server
    register(userId: string) {
      this.socket.emit('register', userId);
    }

    // Hàm gửi thông báo
    sendNotification(userId: string, message: string) {
      this.socket.emit('sendNotification', { userId, message });
    }
  
    // Hàm lắng nghe thông báo
    getMessage(): Observable<string> {
      return new Observable<string>(observer => {
        this.socket.on('receiveNotification', (message: string) => observer.next(message));
      });
    }
  
    // Hàm ngắt kết nối
    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
}
