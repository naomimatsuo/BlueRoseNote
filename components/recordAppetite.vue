<template>
  <div>
    <!-- New post -->
    <div class="bg-white p-2">
      <div class="row mx-0 mb-2">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <p class="mb-1">
            <span class="mr-2">
              <img src="/rice.svg" width="20" height="20" />
            </span>
            <b>主食</b>
            <small>&nbsp;ごはん・パン・麺</small>
          </p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-end pr-0">
          <div class="btn-group-toggle" data-toggle="buttons">
            <label id="stapleFoodLabel" class="btn btn-outline-primary btn-eat rounded-0 px-4">
              <input v-model="newItem.stapleFood" type="checkbox" autocomplete="off" value="1">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              食べた
            </label>
          </div>
        </div>
      </div>
      <div class="row mx-0 mb-2">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <p>
            <span class="mr-2">
              <img src="/carot.svg" width="20" height="20" />
            </span>
            <b>副菜</b>
            <small>&nbsp;野菜・きのこ・いも・海藻</small>
          </p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-end pr-0">
          <div class="btn-group-toggle" data-toggle="buttons">
            <label id="subSideDishLabel" class="btn btn-outline-primary btn-eat rounded-0 px-4">
              <input v-model="newItem.subSideDish" type="checkbox" autocomplete="off" value="1">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              食べた
            </label>
          </div>
        </div>
      </div>
      <div class="row mx-0 mb-2">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <p>
            <span class="mr-2">
              <img src="/fish.svg" width="20" height="20" />
            </span>
            <b>主菜</b>
            <small>&nbsp;肉・魚・卵・大豆</small>
          </p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-end pr-0">
          <div class="btn-group-toggle" data-toggle="buttons">
            <label id="mainDishLabel" class="btn btn-outline-primary btn-eat rounded-0 px-4">
              <input v-model="newItem.mainDish" type="checkbox" autocomplete="off" value="1">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              食べた
            </label>
          </div>
        </div>
      </div>
      <div class="row mx-0 mb-2">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <p>
            <span class="mr-2">
              <img src="/milk.svg" width="20" height="20" />
            </span>
            <b>乳製品</b>
          </p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-end pr-0">
          <div class="btn-group-toggle" data-toggle="buttons">
            <label id="dailyProductsLabel" class="btn btn-outline-primary btn-eat rounded-0 px-4">
              <input v-model="newItem.dailyProducts" type="checkbox" autocomplete="off" value="1">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              食べた
            </label>
          </div>
        </div>
      </div>
      <div class="row mx-0 mb-2">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <p>
            <span class="mr-2">
              <img src="/apple.svg" width="20" height="20" />
            </span>
            <b>果物</b>
          </p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-end pr-0">
          <div class="btn-group-toggle" data-toggle="buttons">
            <label id="fruitsLabel" class="btn btn-outline-primary btn-eat rounded-0 px-4">
              <input v-model="newItem.fruits" type="checkbox" autocomplete="off" value="1">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              食べた
            </label>
          </div>
        </div>
      </div>
      <div class="row mx-0 mb-2">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <p>
            <span class="mr-2">
              <img src="/cake.svg" width="20" height="20" />
            </span>
            <b>お菓子</b>
          </p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-end pr-0">
          <div class="btn-group-toggle" data-toggle="buttons">
            <label id="sweetsLabel" class="btn btn-outline-primary btn-eat rounded-0 px-4">
              <input v-model="newItem.sweets" type="checkbox" autocomplete="off" value="1">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              食べた
            </label>
          </div>
        </div>
      </div>
      <div class="row mx-0 mb-2">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <p>
            <span class="mr-2">
              <img src="/beer.svg" width="20" height="20" />
            </span>
            <b>アルコール</b>
          </p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-end pr-0">
          <div class="btn-group-toggle" data-toggle="buttons">
            <label id="alcoholLabel" class="btn btn-outline-primary btn-eat rounded-0 px-4">
              <input v-model="newItem.alcohol" type="checkbox" autocomplete="off" value="1">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              飲んだ
            </label>
          </div>
        </div>
      </div>
      <div class="input-group mt-2">
        <div class="input-group-prepend">
          <span id="memo-addon" class="input-group-text bg-white">メモ</span>
        </div>
        <input v-model="newItem.memo" type="text" class="form-control" aria-label="gohan" aria-describedby="memo-addon" />
      </div>
      <div class="d-flex justify-content-end mt-2">
        <button id="saveRecordBtn" type="button" class="btn btn-lg btn-secondary text-white rounded-0" style="width:10rem;" @click="saveRecord">記録</button>
      </div>
    </div>
    <!-- Old posts-->
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
        <div class="row text-dark text-break mt-2">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <table class="table table-bordered mb-0">
              <tbody>
                <tr>
                  <td class="text-center p-1"><img src="/rice.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/carot.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/fish.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/milk.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/apple.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/cake.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/beer.svg" width="20" height="20" /></td>
                </tr>
                <tr>
                  <td class="text-center p-1" style="height:2em;">
                    <img v-if="post.stapleFood" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.subSideDish" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.mainDish" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.dailyProducts" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.fruits" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.sweets" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.alcohol" src="/check.svg" width="20" height="20" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-6">
            <p v-if="post.memo !== null" class="text-dark text-break u-pre-wrap mt-2 mb-0">{{ post.memo }}</p>
          </div>
        </div>
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
        stapleFood: null,
        subSideDish: null,
        mainDish: null,
        dailyProducts: null,
        fruits: null,
        sweets: null,
        alcohol: null,
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

    const response = await API.post('BlueRoseNoteAPIs', '/RecordAppetite', params);

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
          stapleFood: this.newItem.stapleFood,
          subSideDish: this.newItem.subSideDish,
          mainDish: this.newItem.mainDish,
          dailyProducts: this.newItem.dailyProducts,
          fruits: this.newItem.fruits,
          sweets: this.newItem.sweets,
          alcohol: this.newItem.alcohol,
          memo: this.newItem.memo,
          createdAt: getNowString(now)
        }
      };

      const response = await API.put('BlueRoseNoteAPIs', '/RecordAppetite', params);

      $('#saveRecordBtn').removeAttr('disabled');
      if (response.statusCode !== 200) { return; }

      this.posts.unshift(params.body);
      this.newItem.stapleFood = null;
      $('#stapleFoodLabel').removeClass('active');
      this.newItem.subSideDish = null;
      $('#subSideDishLabel').removeClass('active');
      this.newItem.mainDish = null;
      $('#mainDishLabel').removeClass('active');
      this.newItem.dailyProducts = null;
      $('#dailyProductsLabel').removeClass('active');
      this.newItem.fruits = null;
      $('#fruitsLabel').removeClass('active');
      this.newItem.sweets = null;
      $('#sweetsLabel').removeClass('active');
      this.newItem.alcohol = null;
      $('#alcoholLabel').removeClass('active');
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

      const response = await API.del('BlueRoseNoteAPIs', '/RecordAppetite', params);

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

<style>
.btn-eat:hover {
  color: #31444e;
  background-color: #e6e6e6;
}
</style>