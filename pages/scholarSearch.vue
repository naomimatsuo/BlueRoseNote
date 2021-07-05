<template>
  <div class="row">
    <div class="col-md-12 col-lg-8">
      <!-- Search Box -->
      <div class="input-group">
        <input type="text" class="form-control bg-light" placeholder="論文を検索" aria-label="Search Community" aria-describedby="searchAddon" />
        <div class="input-group-prepend">
          <button id="searchAddon" type="button" class="btn btn-sm btn-outline-info rounded-right px-5 pb-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 20 20">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Seatch Result-->
      <div class="card bg-transparent rounded-0 mt-2 p-2 vh-100">
        <p class="text-center">検索結果</p>
      </div>
    </div>
    <div class="col-lg-4">
      <!-- Scolor Clip -->
      <div class="card rounded-0 pc__item">
        <div class="card-body bg-white border-bottom-0">
          <h5 class="font-weight-bold mb-0">クリップ</h5>
        </div>
        <ul class="list-group border-0 rounded-0">
          <li class="list-group-item border-0">
            <button type="button" class="btn btn-block clip__button-bg border border-1 rounded-0 text-left">
              An item aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </button>
          </li>
          <li class="list-group-item border-0">
            <button type="button" class="btn btn-block clip__button-bg border  border-1 rounded-0 text-left">
              A second item aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </button>
          </li>
          <li class="list-group-item border-0">
            <button type="button" class="btn btn-block clip__button-bg border border-1 rounded-0 text-left">
              A third item aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </button>
          </li>
          <li class="list-group-item border-0">
            <button type="button" class="btn btn-block clip__button-bg border border-1 rounded-0 text-left">
              A fourth item aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </button>
          </li>
          <li class="list-group-item border-0">
            <button type="button" class="btn btn-block clip__button-bg border border-1 rounded-0 text-left">
              And a fifth one aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',
  head () {
    return {
      title: '論文検索'
    }
  }
}
</script>

<style scoped>
.clip__button-bg:hover {
  background-color: #eeeeee;
  transition: 0.3s;
}
</style>