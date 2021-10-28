const generateRandomString = (Number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = Math.random().toString(36).substring(0, Number);

    return result;
}

export default generateRandomString;