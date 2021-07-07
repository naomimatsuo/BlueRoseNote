<template>
  <div class="container fluid">
    <div class="row mt-4">
      <div class="container d-flex justify-content-center">
        <img src="/icon.svg" width="50" height="50" alt="" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="container d-flex justify-content-center">
        <div class="card border-secondary rounded-0" style="min-width: 25rem;border-width:3px">
          <div class="card-body">
            <label for="email">メールアドレス</label>
            <input id="email" v-model="mailAddress" type="email" class="form-control" />
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
      mailAddress: null,
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
        const user = await Auth.signIn(this.mailAddress, this.passWords);
        this.$store.commit('update', user);
        this.$cookies.set('client_id', user.pool.clientId, {
          expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30)
        });
        this.$router.push('/top');
      } catch (error) {}
    }
  }
}
</script>
