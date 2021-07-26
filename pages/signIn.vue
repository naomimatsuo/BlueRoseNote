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
            <label for="userName">アカウントID</label>
            <input id="userName" v-model="userName" type="text" class="form-control" />
            <div class="mt-2 mb-4">
              <label for="password">パスワード</label>
              <input id="password" v-model="passWords" type="password" class="form-control" />
            </div>
            <button type="button" class="btn btn-secondary btn-block rounded-0 text-white font-weight-bold" @click="signIn">サインイン</button>
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
      userName: null,
      passWords: null
    }
  },
  head () {
    return {
      title: 'Sign In BLUE ROSE NOTE'
    }
  },
  methods: {
    async signIn () {
      try {
        const user = await Auth.signIn(this.userName, this.passWords);
        this.$store.commit('updateLoginUser', {
          loginUser: user,
          clientId: user.pool.clientId,
          accountId: this.userName
        });

        this.$cookies.set('client_id', user.pool.clientId, {
          expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30),
          secure: true
        });
        this.$cookies.set('account_id', this.userName, {
          expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30),
          secure: true
        });
        this.$router.push('/top');
      } catch (error) {}
    }
  }
}
</script>
