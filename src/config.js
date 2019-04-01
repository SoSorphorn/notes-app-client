export default {
  s3: {
    REGION: "us-east-1", 
    BUCKET: "notes-app-api-test-deplo-serverlessdeploymentbuck-1p6f52dnzsq77"
  }, 
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://4f38laiqx3.execute-api.us-east-1.amazonaws.com/prod" 
  },
    cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_8SJM1Gcj6",
    APP_CLIENT_ID: "7a1phr0n2dj3ce9do51ssieokp",
    IDENTITY_POOL_ID: "us-east-1:ec1d6700-6108-4e9c-9255-9864f70db001" 
  },
  STRIPE_KEY: "pk_test_1RU2RfqpnddhXGBHt4MQfuXv" ,
  MAX_ATTACHMENT_SIZE: 5000000,
};