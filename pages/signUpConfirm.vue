<template>
  <div class="container fluid">
    <div class="row mt-4">
      <div class="container d-flex justify-content-center">
        <img src="/icon.svg" width="50" height="50" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="container d-flex justify-content-center">
        <div class="card border-secondary rounded-0" style="min-width: 20rem;border-width:3px;">
          <div class="card-body">
            <div class="mt-1 mb-2">
              <label for="email">メールアドレス</label>
              <input id="email" v-model="mailAddress" type="email" class="form-control" />
            </div>
            <div class="mt-1 mb-4">
              <label for="email">確認コード</label>
              <input id="email" v-model="valificationCode" type="text" class="form-control" />
            </div>
            <div class="alert alert-danger" role="alert" style="display:none;" />
            <button type="button" class="btn btn-secondary btn-block rounded-0 text-white font-weight-bold" @click="completeSineUp">アカウント登録</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  data () {
    return {
      mailAddress: null,
      valificationCode: null
    }
  },
  head () {
    return {
      title: 'Join BLUE ROSE NOTE'
    }
  },
  mounted () {
    this.mailAddress = this.$store.state.loginUser.username;
  },
  methods: {
    async completeSineUp () {
      try {
        await Auth.confirmSignUp(
          this.mailAddress, this.valificationCode
        ).then((ret) => {
          this.$router.push('/top');
        });
      } catch (error) {
        $('.alert').html(error.message);
        $('.alert').show();
      }
    }
  }
}
</script>