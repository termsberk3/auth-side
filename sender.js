var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connError, connection) => {
 
    if(connError){
        throw connError;
    }
    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError;
        }
        const Queue = 'ordertest'
        channel.assertQueue(Queue);
        channel.sendToQueue(Queue,Buffer.from('message has been sent via Queue'));
        console.log(`order details are sent to ${Queue}`);


    })

})