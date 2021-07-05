<template>
  <div class="container fluid">
    <div class="row mt-4">
      <div class="container d-flex justify-content-center">
        <img src="/icon.svg" width="70" height="70" alt="" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="container d-flex justify-content-center">
        <div class="card border-secondary rounded-0" style="min-width: 20rem;border-width:3px">
          <div class="card-body">
            <label for="email">メールアドレス</label>
            <input id="email" type="email" class="form-control" />
            <div class="mt-2 mb-4">
              <label for="password">パスワード</label>
              <input id="password" type="password" class="form-control" />
            </div>
            <NuxtLink to="/" tag="button" class="btn btn-secondary btn-block rounded-0 text-white font-weight-bold">サインイン</NuxtLink>
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
      title: 'Sign In BLUE ROSE NOTE'
    }
  }
}
</script>
