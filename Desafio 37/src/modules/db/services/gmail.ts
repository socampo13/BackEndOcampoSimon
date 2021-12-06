import Config from '../config';
import nodemailer from 'nodemailer';

class Email{
    private owner : any;
    private transporter;

    constructor(){
        this.owner = {
            name: Config.GMAIL_NAME,
            address: Config.GMAIL_EMAIL,
        };

        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: Config.GMAIL_EMAIL,
                pass: Config.GMAIL_PASSWORD,
            },
        });
        this.transporter.verify().then(() => console.log('Email ready to be sent'));
    }

    async sendEmail(dest: string, subject: string, content: string, profilePic?: string){
        const mailOptions = {
            from: this.owner,
            to: dest,
            subject,
            html: content,
            attatchments: [{
                filename: 'image.png',
                path: profilePic,
            }]
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
}};

export const EmailService = new Email();