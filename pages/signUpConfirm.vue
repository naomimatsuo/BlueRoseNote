<template>
  <div class="container fluid">
    <div class="row mt-4">
      <div class="container d-flex justify-content-center">
        <img src="/icon.svg" width="50" height="50" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="container d-flex justify-content-center">
        <div class="card border-secondary rounded-0 cl-sm-12 col-md-6 col-lg-5" style="border-width:3px;">
          <div class="card-body">
            <div class="alert alert-secondary" role="alert">
              メールを確認してください。
            </div>
            <div class="mt-1 mb-2">
              <label for="email">アカウントID</label>
              <input id="email" v-model="userName" type="text" class="form-control" />
            </div>
            <div class="mt-1 mb-4">
              <label for="valificationCode">確認コード</label>
              <input id="valificationCode" v-model="valificationCode" type="text" class="form-control" />
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
import { API, Auth } from 'aws-amplify';

export default {
  data () {
    return {
      userName: null,
      valificationCode: null
    }
  },
  head () {
    return {
      title: '登録'
    }
  },
  mounted () {
    if (!this.$store.state.loginUser) {
      return;
    }
    this.userName = this.$store.state.loginUser.username;
  },
  methods: {
    async completeSineUp () {
      try {
        await Auth.confirmSignUp(
          this.userName, this.valificationCode
        ).then((ret) => {
          const params = {
            body: {
              clientId: this.$getAscii(this.userName),
              accountId: this.userName,
              userName: null,
              description: null,
              location: null,
              gender: this.gender,
              userHeight: null,
              userWeight: null,
              birthYear: null,
              birthMonth: null,
              birthDate: null,
              backImg: null,
              selfImg: null,
              updatedAt: this.$getNowString(new Date())
            }
          };

          API.put('BlueRoseNoteAPIs', '/UserProfile', params);
          this.$router.push('/signIn');
        });
      } catch (error) {
        $('.alert').html(error.message);
        $('.alert').show();
      }
    }
  }
}
</script>