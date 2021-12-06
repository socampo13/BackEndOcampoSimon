import minimist from 'minimist';

const argument = minimist(process.argv.slice(2));

if(argument.help){
    console.log('Valid arguments: port=NUMBER - fbClientId=FACEBOOK_CLIENT_ID - fbClientSecret=FACEBOOK_CLIENT_SECRET');
    
};

export const allArguments = argument;
export const portArgument = argument.port;
export const clusterArgument = argument.cluster;
export const fbClientIdArgument = argument.fbClientId;
export const fbClientSecretArgument = argument.fbClientSecret;
