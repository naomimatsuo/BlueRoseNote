<template>
  <div class="container fluid">
    <div class="row mt-4">
      <div class="container d-flex justify-content-center">
        <img src="/icon.svg" width="50" height="50" alt="" />
      </div>
    </div>
    <p class="text-center text-primary mt-3">パスワードをリセットします。</p>
    <p class="text-center text-primary">メールアドレスを入力してください。</p>
    <div class="row mt-3">
      <div class="container d-flex justify-content-center">
        <div class="card border-secondary rounded-0 cl-sm-12 col-md-6 col-lg-5" style="border-width:3px">
          <div class="card-body">
            <label for="userName">アカウント名</label>
            <input id="userName" v-model="userName" type="text" class="form-control" />
            <div class="alert alert-danger mt-3" role="alert" hidden>アカウント名が存在しません。</div>
            <button type="button" class="btn btn-secondary btn-block rounded-0 text-white font-weight-bold mt-3" @click="sendComfirmCode">
              <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              確認コードを送信
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

      this.saving = true;
      $('.alert').attr('hidden');

      Auth.forgotPassword(this.userName)
        .then((response) => {
          this.$router.push('/comfirmNewPasswords');
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