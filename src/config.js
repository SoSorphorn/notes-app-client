const dev = { 
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-serverlessdeploymentbucket-1tiwchdckrbzh"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://t43mmjjegj.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_XkGtM4OEU",
    APP_CLIENT_ID: "rj2i00ltidfkshs94fsdaq1fq",
    IDENTITY_POOL_ID: "us-east-1:27fa10b2-1857-4ca3-a016-9d5cc696ad5a"
  } ,
  STRIPE_KEY: "pk_test_1RU2RfqpnddhXGBHt4MQfuXv",
};
const prod = { 
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-serverlessdeploymentbucket-1pl5fdfbvsn0n"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://deukzg0ms1.execute-api.us-east-1.amazonaws.com/prod"
  }, 
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_oZ6wXEYDJ",
    APP_CLIENT_ID: "56medp42uhhiqjpqbgrq4rk6od",
    IDENTITY_POOL_ID: "us-east-1:2ec91eb4-e7ea-405d-b39c-341ee99ddfbe"
  },
  STRIPE_KEY: "pk_test_1RU2RfqpnddhXGBHt4MQfuXv" 
};
// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;
export default {
// Add common config values here 
  MAX_ATTACHMENT_SIZE: 5000000, 
  ...config
};