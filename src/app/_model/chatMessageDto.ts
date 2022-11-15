export class ChatMessageDto {
    user: string;
    message: any;

    constructor(user: string, message: any){
        this.user = user;
        this.message = message;
    }
}