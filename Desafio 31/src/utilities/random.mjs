export const randoms = (quantity) => {
    let list = {};
    for(let i = 0; i < quantity; i++){
        let myKey = Math.round(Math.random() * (quantity - 1) + 1);

        if(myKey in list){
            list[myKey]++;
        }else list[myKey] = 1
    }
    return list;
};

process.on('message', (mssg) => {
    mssg = JSON.parse(mssg);
    if(mssg.command == 'start'){
        console.log('Process started');
        const result = randoms(mssg.quantity);
        if(process && process.send){
            process.send(result);
        }
    }
});