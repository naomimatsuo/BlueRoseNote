<template>
  <div class="container mt-2">
    <h2 class="text-secondary">アカウント削除</h2>
    <p class="mt-3 mb-0">アカウントの情報が全て削除されます。</p>
    <span><small>この操作は取り消せません。</small></span>
    <div class="row d-flex justify-content-center mt-3">
      <button type="button" class="btn btn-danger" @click="showDeleteModal">
        <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        アカウント削除
      </button>
    </div>
    <!-- Modal -->
    <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <p id="deleteModalTitle" class="modal-title">確認</p>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>アカウントを削除しますか？</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal" style="width:9rem">キャンセル</button>
            <button id="deleteModalBtn" type="button" class="btn btn-danger" style="width:9rem" @click="leave">
              <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              削除
            </button>
          </div>
        </div>
      </div>
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
    showDeleteModal () {
      $('#deleteModal').modal('show');
    },
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