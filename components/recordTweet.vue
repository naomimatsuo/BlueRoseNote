<template>
  <div>
    <!-- New post -->
    <div class="bg-white p-2">
      <textarea id="recordTweetTextArea" v-model="newItem.tweet" class="form-control overflow-hidden mb-1" style="height:13vh;resize:none" rows="4" />
      <div id="picContainer" class="d-flex justify-content-center" style="position: relative">
        <img id="picTarget" class="rounded" style="width:auto;max-height:25rem">
        <button id="removePicBtn" type="button" class="btn btn-sm btn-secondary rounded-circle px-2 py-0" style="position:absolute; top: 10px; z-index: 10; display: none;" @click="removePic">
          <span aria-hidden="true" style="font-size:1.2rem">&times;</span>
        </button>
      </div>
      <div class="d-flex justify-content-between mt-1">
        <input id="picInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="picOnChange" />
        <button id="addImageBtn" type="button" class="btn btn-lg btn-light rounded-circle border-0 ml-1" @click="addImage">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
            <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
          </svg>
        </button>
        <button id="saveRecordBtn" type="button" class="btn btn-lg btn-secondary text-white rounded-0" style="width:10rem;" @click="saveRecord">記録</button>
      </div>
    </div>
    <!-- Old posts -->
    <itemLoader v-if="showLoader" class="pt-4" />
    <ul class="list-group mt-2">
      <li v-for="post in posts" :key="post.recordId" class="list-group-item rounded-0 bg-transparent">
        <div class="d-flex justify-content-between">
          <p class="text-gray mb-0">{{ post.createdAt }}</p>
          <button type="button" class="btn btn-sm px-1 py-0" @click="showDeleteModal(post)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
          </button>
        </div>
        <div class="text-dark text-break mb-0 u-pre-wrap">{{ post.tweet }}</div>
      </li>
    </ul>
    <!-- Modal -->
    <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteModalTitle" class="modal-title">記録を削除しますか？</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p id="deleteModalContent" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal" style="width:10rem">キャンセル</button>
            <button id="deleteModalBtn" type="button" class="btn btn-danger" style="width:10rem" @click="deleteRecord">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@aws-amplify/api';

export default {
  data () {
    return {
      showLoader: true,
      newItem: {
        recordId: null,
        tweet: null
      },
      posts: []
    };
  },
  mounted () {
    const params = {
      body: {
        clientId: this.$cookies.get('client_id')
      }
    };

    API
      .post('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (!response.body || (response.body.length < 1)) {
          return;
        }

        this.posts = JSON.parse(response.body).Items;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.showLoader = false;
      });
  },
  methods: {
    addImage () {
      if ($('#picTarget')[0].src.length > 0) {
        return;
      }
      $('#picInput').click();
    },
    picOnChange (event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        $('#picTarget').one('load', function () {
          const containerWidth = $('#picContainer').width();
          const picWidth = $('#picTarget').width();
          $('#removePicBtn').css('left', (containerWidth - picWidth) / 2.0 + 15);
          $('#removePicBtn').css('display', 'block');
        })

        const image = e.target.result;
        $('#picTarget').attr('src', image);
        $('#addImageBtn').addClass('disabled');
        $('#addImageBtn').attr('aria-disabled', true);
      }

      reader.readAsDataURL(file);
    },
    removePic () {
      $('#picTarget').attr('src', null);
      $('#removePicBtn').css('display', 'none');
    },
    saveRecord () {
      const clientId = this.$cookies.get('client_id');
      if (!clientId) { return; }

      $('#saveRecordBtn').attr('disabled', 'disabled');

      const now = new Date();
      const base64 = $('#picTarget').attr('src');

      const params = {
        body: {
          clientId,
          recordId: now.getTime(),
          tweet: this.newItem.tweet,
          tweetpic: base64 ? Buffer.from(base64) : null,
          createdAt: getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        this.posts.unshift(params.body);

        this.newItem.recordId = null;
        this.newItem.tweet = null;
        this.newItem.tweetpic = null;
      })
      .finally(() => {
        $('#saveRecordBtn').removeAttr('disabled');
      });
    },
    showDeleteModal (post) {
      $('#deleteModalContent').html(post.createdAt + 'の記録を削除しますか？' + '<br />' + '<small>この操作は取り消せません。</small>');
      $('#deleteModalBtn').attr('targetId', post.recordId);

      $('#deleteModal').modal('show');
    },
    deleteRecord () {
      $('#deleteModalBtn').attr('disabled', 'disabled');

      const clientId = this.$cookies.get('client_id');
      if (!clientId) { return; }

      const recordId = $('#deleteModalBtn').attr('targetId');
      if (!recordId) { return; }

      const params = {
        body: {
          clientId,
          recordId: Number(recordId)
        }
      };

      API.del('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        this.posts = this.posts.filter(function (post) {
          return Number(post.recordId) !== Number(recordId);
        });
      })
      .finally(() => {
        $('#deleteModalBtn').removeAttr('disabled');
        $('#deleteModal').modal('hide');
      });
    }
  }
}
</script>