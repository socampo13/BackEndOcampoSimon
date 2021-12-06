import Config from '../config';
import twilio from 'twilio';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/messageList';

class Twilio{
    private twilio; 

    constructor(){
        this.twilio = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_AUTH_TOKEN);
    }

    async sendMessage(
        cellphoneNumber: string, 
        message: string,
        picture?: string,
    ){
        const params = {
            body: message,
            from: `whatsapp:${Config.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${cellphoneNumber}`,
        };

        if(picture) params.mediaUrl = [picture];

            const response = await this.twilio.messages.create(params);
            return response;
        }
}

export const Whatsapp = new Twilio();