<template>
  <div class="container mt-2">
    <h2 class="text-secondary">アカウント削除</h2>
    <p class="mt-3 mb-0">アカウントの情報が全て削除されます。</p>
    <span><small>この操作は取り消せません。</small></span>
    <div class="row d-flex justify-content-center mt-3">
      <button type="button" class="btn btn-danger" @click="leave">
        <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        アカウント削除
      </button>
    </div>
  </div>
</template>

<script>
import { API, Auth } from 'aws-amplify';

export default {
  middleware: 'authenticated',
  data () {
    return {
      password: null,
      saving: false
    }
  },
  head () {
    return {
      title: '退会'
    }
  },
  methods: {
    async leave () {
      this.saving = true;

      const user = await Auth.currentAuthenticatedUser();

      if (user) {
        user.deleteUser((error) => {
            if (error) {
                return reject(error);
            }
            if (this.props.onSessionChange) {
                this.props.onSessionChange();
            }

            // const param = {
            //   body: {
            //     clientId: ''
            //   }
            // };

            // API.del('BlueRoseNoteAPIs', '/UserProfile');
            // API.del('BlueRoseNoteAPIs', '/CommunityMember');
            // API.del('BlueRoseNoteAPIs', '/CommunityTweet');
            // API.del('BlueRoseNoteAPIs', '/CommunityTweetLike');
            // API.del('BlueRoseNoteAPIs', '/CommunityTweetReply');
            // API.del('BlueRoseNoteAPIs', '/RecordTweet');
            // API.del('BlueRoseNoteAPIs', '/RecordMedicine');
            // API.del('BlueRoseNoteAPIs', '/RecordTemperature');
            // API.del('BlueRoseNoteAPIs', '/RecordTweet');
            // API.del('BlueRoseNoteAPIs', '/Reviewer');

            this.$cookies.removeAll();
            this.$router.push('/seeyou');
        });
      }
    }
  }
}
</script>