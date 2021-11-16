import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

if(args.h)
    console.log("Valid Arguments: port=NUMBER - fbClientId=FACEBOOK_CLIENT_ID - fbClientSecret=FACEBOOK_CLIENT_SECRET");

export const allArguments = args;
export const portArgument = args.port;
export const clusterArg = args.cluster;
export const fbClientIdArgument = args.fbClientId;
export const fbClientSecretArgument = args.fbClientSecret;