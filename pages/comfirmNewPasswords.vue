<template>
  <div class="container fluid">
    <div class="row mt-4">
      <div class="container d-flex justify-content-center">
        <img src="/icon.svg" width="50" height="50" alt="" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="container d-flex justify-content-center">
        <div class="card border-secondary rounded-0 cl-sm-12 col-md-6 col-lg-5" style="border-width:3px">
          <div class="card-body">
            <div class="alert alert-secondary" role="alert">
              メールを確認してください。
            </div>
            <label for="userName">アカウント名</label>
            <input id="userName" v-model="userName" type="text" class="form-control" />
            <div class="mt-1">
              <label for="valificationCode">確認コード</label>
              <input id="valificationCode" v-model="valificationCode" type="text" class="form-control" />
            </div>
            <div class="mt-1">
              <label for="passwords">新しいパスワード</label>
              <input id="passwords" v-model="passwords" type="text" class="form-control" />
            </div>
            <div class="alert alert-danger mt-3" role="alert" hidden>アカウント名と確認コードが正しくありません。</div>
            <button type="button" class="btn btn-secondary btn-block rounded-0 text-white font-weight-bold mt-3" @click="sendComfirmCode">
              <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              パスワードを設定
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
  data () {
    return {
      userName: null,
      valificationCode: null,
      passwords: null,
      saving: false
    }
  },
  head () {
    return {
      title: 'パスワードのリセット'
    }
  },
  methods: {
    sendComfirmCode () {
      if (!this.userName) { return; }
      if (!this.valificationCode) { return; }
      if (!this.passwords) { return; }

      this.saving = true;
      $('.alert').attr('hidden');

      Auth.forgotPasswordSubmit(this.userName, this.valificationCode, this.passwords)
        .then((response) => {
          this.$router.push('/signIn');
        })
        .catch((e) => {
          $('.alert').removeAttr('hidden');
        })
        .finally(() => {
          this.saving = false;
        });
    }
  }
}
</script>