import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../_model/chatMessageDto';
import { ChatMessageDtoClient } from '../_model/chatMessageDtoClient';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket?: WebSocket;
  chatMessages: ChatMessageDto[] = [];
  chatMessagesClient: ChatMessageDtoClient[] = [];

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:9090/chat');
    //this.webSocket = new WebSocket('ws://https://www.em.com.sv:9090/chat');



    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }


  public openWebSocketClient(){
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDtoClient = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDtoClient);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    //alert(JSON.stringify(chatMessageDto));
    this.webSocket?.send(JSON.stringify(chatMessageDto));
  }



  public closeWebSocket() {
    this.webSocket?.close();
  }
}