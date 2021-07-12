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
            <div class="mt-1 mb-2">
              <label for="userName">アカウントID</label>
              <input id="userName" v-model="userName" type="text" class="form-control" />
            </div>
            <div class="mt-1 mb-2">
              <label for="email">メールアドレス</label>
              <input id="email" v-model="mailAddress" type="email" class="form-control" />
            </div>
            <div class="mt-1 mb-4">
              <label for="password">パスワード</label>
              <input id="password" v-model="passWords" type="password" class="form-control" />
              <span class="mx-1">
                <small>※8文字以上の大文字・小文字・記号を含む英数字を使用してください。</small>
              </span>
            </div>
            <div class="alert alert-danger" role="alert" style="display:none;" />
            <button type="button" class="btn btn-secondary btn-block rounded-0 text-white font-weight-bold" @click="signUp">アカウント作成</button>
            <div class="mt-4">
              <small>
                <p class="mb-0">アカウント作成によりBlue Rose Noteの利用規約及びプライバシーポリシーを理解し、同意頂いたものとします。</p>
              </small>
            </div>
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
      mailAddress: null,
      passWords: null
    }
  },
  head () {
    return {
      title: 'Join BLUE ROSE NOTE'
    }
  },
  methods: {
    async signUp () {
      try {
        const { user } = await Auth.signUp({
          username: this.userName,
          password: this.passWords,
          attributes: {
            preferred_username: this.userName,
            email: this.mailAddress
          }
        });

        if (user !== undefined) {
          this.$store.commit('update', user);
          this.$router.push('/signUpConfirm');
        }
      } catch (error) {
        $('.alert').html(getErrorMessage(error.message));
        $('.alert').show();
      }
    }
  }
}

function getErrorMessage (message) {
  if ((message).includes('not long enough')) {
    return 'パスワードの長さが足りません。';
  }

  if ((message).includes('numeric characters')) {
    return 'パスワードには数字を使用してください。';
  }

  if ((message).includes('uppercase characters')) {
    return 'パスワードには大文字を使用してください。';
  }

  if ((message).includes('lowercase characters')) {
    return 'パスワードには小文字を使用してください。';
  }

  if ((message).includes('symbol characters')) {
    return 'パスワードには記号を使用してください。';
  }

  if ((message).includes('given email already exists')) {
    return 'メールアドレスは既に使用されています。';
  }

  if ((message).includes('Username cannot be empty')) {
    return 'メールアドレスを入力してください。';
  }

  if ((message).includes('Invalid email address format')) {
    return '不正なメールアドレスです。';
  }

  if ((message).includes('Password cannot be empty')) {
    return 'パスワードを入力してください。';
  }

  if ((message).includes('User already exists')) {
    return 'アカウントIDは既に使用されています。';
  }
  return message;
}
</script>