import Amplify, { Auth } from 'aws-amplify'
// import awsconfig from '@/aws-exports'

const awsconfig = {
  'aws_project_region': 'ap-northeast-1',
  'aws_cognito_identity_pool_id': 'ap-northeast-1:95a5706b-baf0-48d7-9bb8-1027f4ec949a',
  'aws_cognito_region': 'ap-northeast-1',
  'aws_user_pools_id': 'ap-northeast-1_jSBYciDlR',
  'aws_user_pools_web_client_id': '7jjgdgpdmrr46d1esucfcl0p7a',
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