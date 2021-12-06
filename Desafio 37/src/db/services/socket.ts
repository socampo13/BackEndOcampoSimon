import { messages } from '../models/messagesModel';
import { Server } from 'socket.io';

export const initWsServer = (app : any) => {
    const myWsServer = new Server(app);

    myWsServer.on('connection', function(socket){
        console.log("New user connected");
        console.log(`Client ID => ${socket.client.id}`);
        console.log(`Server socket ID => ${socket.id}`);

        socket.on("askData", async () => {
            console.log("Data arrived");
            const msg = await messages.find().lean();
            if(messages.length > 0){
                socket.emit("messages", messages);
            }
        });

        socket.on("new-messages", async (data : any) => {
            const newMessage = await messages.create(data);
            myWsServer.emit("messages", [newMessage]);
        });
    });

    return myWsServer;
};