import Amplify, { Auth } from 'aws-amplify'
// import awsconfig from '@/aws-exports'

const awsconfig = {
  "aws_project_region": "ap-northeast-1",
  "aws_cognito_identity_pool_id": "ap-northeast-1:42461eb7-6d24-498e-bde3-007b2285fff1",
  "aws_cognito_region": "ap-northeast-1",
  "aws_user_pools_id": "ap-northeast-1_pmMPsHyql",
  "aws_user_pools_web_client_id": "5ehjfoe3ug9tgsobk6jto2ikpd",
  "oauth": {}
};

Amplify.configure(awsconfig);
Auth.configure(awsconfig);