<template>
  <div>
    <!-- New post-->
    <div class="bg-white p-2">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-outline-primary px-4">
          <input v-model="newItem.tookMedicine" type="radio" name="options" value="1" />
          <span class="mr-3 text-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
          </span>
          飲んだ
        </label>
        <label class="btn btn-outline-primary px-4">
          <input v-model="newItem.tookMedicine" type="radio" name="options" value="0" />
          <span class="mr-3 text-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </span>
          忘れた
        </label>
      </div>
      <div class="input-group mt-2">
        <div class="input-group-prepend">
          <span id="memo-addon" class="input-group-text bg-white">メモ</span>
        </div>
        <input v-model="newItem.memo" type="text" class="form-control" aria-label="memo" aria-describedby="memo-addon" />
      </div>
      <div class="d-flex justify-content-end mt-2">
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
        <div class="row mx-0">
          <div v-if="post.tookMedicine === '1'" class="border border-1 px-4 py-1 mt-2">
            <p class="mb-0">
              <span class="mr-3 text-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              飲んだ
            </p>
          </div>
          <div v-if="post.tookMedicine === '0'" class="border border-1 px-4 py-1 mt-2">
            <p class="mb-0">
              <span class="mr-3 text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </span>
              忘れた
            </p>
          </div>
        </div>
        <p v-if="post.memo !== null" class="text-dark text-break u-pre-wrap mt-2 mb-0" style="font-size:0.9rem">{{ post.memo }}</p>
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
        tookMedicine: null,
        memo: null
      },
      posts: []
    }
  },
  async mounted () {
    const params = {
      body: {
        clientId: this.$cookies.get('client_id')
      }
    };

    const response = await API.post('BlueRoseNoteAPIs', '/RecordMedicine', params);

    this.showLoader = false;

    if (!response.body || (response.body.length < 1)) {
      return;
    }

    this.posts = JSON.parse(response.body).Items;
  },
  methods: {
    async saveRecord () {
      const clientId = this.$cookies.get('client_id');
      if (!clientId) { return; }

      $('#saveRecordBtn').attr('disabled', 'disabled');

      const now = new Date();

      const params = {
        body: {
          clientId,
          recordId: now.getTime(),
          tookMedicine: this.newItem.tookMedicine,
          memo: this.newItem.memo,
          createdAt: getNowString(now)
        }
      };

      const response = await API.put('BlueRoseNoteAPIs', '/RecordMedicine', params);

      $('#saveRecordBtn').removeAttr('disabled');
      if (response.statusCode !== 200) { return; }

      this.posts.unshift(params.body);
      this.newItem.tookMedicine = null;
      this.newItem.memo = null;
    },
    showDeleteModal (post) {
      $('#deleteModalContent').html(post.createdAt + 'の記録を削除しますか？' + '<br />' + '<small>この操作は取り消せません。</small>');
      $('#deleteModalBtn').attr('targetId', post.recordId);

      $('#deleteModal').modal('show');
    },
    async deleteRecord () {
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

      const response = await API.del('BlueRoseNoteAPIs', '/RecordMedicine', params);

      $('#deleteModalBtn').removeAttr('disabled');
      $('#deleteModal').modal('hide');

      if (response.statusCode !== 200) { return; }
      this.posts = this.posts.filter(function (post) {
        return Number(post.recordId) !== Number(recordId);
      });
    }
  }
}
</script>