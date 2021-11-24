import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 8080,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
    GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'gmail',
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'gmailPass',
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'ethereal',
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'etherealPass',
    ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'etherealName',
    TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || 'twilio',
    TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioAccountId',
    TEST_PHONENUMBER: process.env.TEST_PHONENUMBER || 'testPhoneNumber',
    TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER || 'twilioWhatsappNumber',
};