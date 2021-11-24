import Config from '../config';
import nodemailer from 'nodemailer';

class Ethereal{
    constructor(){
        this.owner = {
            name: Config.ETHEREAL_NAME,
            address: Config.ETHEREAL_EMAIL,
    };

    this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: Config.ETHEREAL_EMAIL,
            pass: Config.ETHEREAL_PASSWORD,
        },
    });

    }

    async sendMail(message){
        const mailOptions = {
            from: this.owner,
            to: dest,
            subject,
            html: content,
        };
        const response = await this.transporter.sendMail(mailOptions);
        return response;
    }
};
export const Ethereal = new Ethereal();