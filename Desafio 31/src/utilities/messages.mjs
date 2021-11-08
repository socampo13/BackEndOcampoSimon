import moment from 'moment';

export const formatMessages = (data) => {
    const { email, content } = data;
    return{
        email, 
        content,
        time: moment().format('DD/MM/YYYY h:mm a'),
    };
};