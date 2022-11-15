import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
<<<<<<< HEAD
import { ChatMessageDto } from '../_model/chatMessageDto';
=======
import { ChatMessageDto } from '../_model/ChatMessageDto';
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
import { WebSocketService } from '../_service/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    //sendForm.controls.message.reset();
    //sendForm.controls.message.reset();
  }
}