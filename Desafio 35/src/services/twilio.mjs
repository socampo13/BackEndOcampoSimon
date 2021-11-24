import Config from '../config';
import Twilio from 'twilio';

class Twilio{

    constructor(){
        this.twilio = Twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);
    }

    async sendMessage(cellphoneNumber){
        const params = {
            body: message,
            from: Config.TWILIO_PHONE_NUMBER,
            to: cellphoneNumber
        };

        const response = await this.twilio.messages.create(params);
        return response;
    }
}

export const SmsService = new Twilio();