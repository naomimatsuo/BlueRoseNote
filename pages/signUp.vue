<template>
  <div class="container fluid">
    <div class="row mt-4">
      <div class="container d-flex justify-content-center">
        <img src="/icon.svg" width="70" height="70" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="container d-flex justify-content-center">
        <div class="card border-secondary rounded-0" style="min-width: 20rem;border-width:3px;">
          <div class="card-body">
            <div class="mt-1 mb-2">
              <label for="userName">ユーザ名</label>
              <input id="userName" type="text" class="form-control" />
            </div>
            <div class="mt-1 mb-2">
              <label for="email">メールアドレス</label>
              <input id="email" type="email" class="form-control" />
            </div>
            <div class="mt-1 mb-4">
              <label for="password">パスワード</label>
              <input id="password" type="password" class="form-control" />
            </div>
            <NuxtLink to="/" tag="button" class="btn btn-secondary btn-block rounded-0 text-white font-weight-bold">アカウント作成</NuxtLink>
            <div class="mt-4">
              <small>
                <p class="mb-0">アカウント作成によりBlue Rose Noteの利用規約及びプライバシーポリシーを理解し、</p>
                <p>同意頂いたものとします。</p>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Join BLUE ROSE NOTE'
    }
  }
}
</script>