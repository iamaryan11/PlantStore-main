const {createClient}=require('redis');
const redisClient = createClient({
    username: 'default',
    password: 'CZIQRv8vgiCbO7oxzbcXM8G6BICqm4ey', // error de rha tha env me we will see
    socket: {
        host:'redis-13673.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 13673,
    }
});
module.exports=redisClient;
