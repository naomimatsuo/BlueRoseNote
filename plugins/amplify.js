import Amplify, { Auth } from 'aws-amplify'
// import awsconfig from '@/aws-exports'

const awsconfig = {
  'aws_project_region': 'ap-northeast-1',
  'aws_cognito_identity_pool_id': 'ap-northeast-1:efb594db-e494-4c5c-a75b-5e4deec22edd',
  'aws_cognito_region': 'ap-northeast-1',
  'aws_user_pools_id': 'ap-northeast-1_AE0BsMeC0',
  'aws_user_pools_web_client_id': '3i9rdk0f6p64j16s88n5s2ulue',
  'oauth': {},
  'aws_cloud_logic_custom': [
    {
      'name': 'BlueRoseNoteAPIs',
      'endpoint': 'https://o5aouz42gi.execute-api.ap-northeast-1.amazonaws.com/staging',
      'region': 'ap-northeast-1'
    }
  ]
};

Amplify.configure(awsconfig);
Auth.configure(awsconfig);