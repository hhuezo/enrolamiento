import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { ChatMessageDto } from '../_model/chatMessageDto';
import { ChatMessageDtoClient } from '../_model/chatMessageDtoClient';
=======
import { ChatMessageDto } from '../_model/ChatMessageDto';
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket?: WebSocket;
  chatMessages: ChatMessageDto[] = [];
<<<<<<< HEAD
  chatMessagesClient: ChatMessageDtoClient[] = [];
=======
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

  constructor() { }

  public openWebSocket(){
<<<<<<< HEAD
    this.webSocket = new WebSocket('ws://localhost:9090/chat');
    //this.webSocket = new WebSocket('ws://https://www.em.com.sv:9090/chat');


=======
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

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

<<<<<<< HEAD

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



=======
  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket?.send(JSON.stringify(chatMessageDto));
  }

>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
  public closeWebSocket() {
    this.webSocket?.close();
  }
}