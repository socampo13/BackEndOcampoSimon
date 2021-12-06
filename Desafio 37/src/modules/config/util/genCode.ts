const randomString = (num : number) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let firstResult = Math.random().toString(36).substring(0, num);

    return firstResult;
}

export default randomString;