<template>
  <div>
    <!-- Search Box -->
    <div class="input-group">
      <input type="text" class="form-control bg-light" placeholder="コミュニティを検索" aria-label="Search Community" aria-describedby="searchAddon" />
      <div class="input-group-prepend">
        <button id="searchAddon" type="button" class="btn btn-sm btn-outline-info rounded-right px-3 pb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 20 20">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="mt-3">
      <div class="card card-body bg-transparent">
        <p>部位から検索</p>
        <div class="row">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">頭・顔・口</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">目</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">鼻</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">耳</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">首・のど</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">胸（肺・心臓）</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">腹（胃腸・肝臓）</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">子宮</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">手</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">足</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">背中・腰</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">腎臓・膵臓</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">陰部・肛門</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">皮膚</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">骨・関節</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">脳・脊髄</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">筋肉</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">末梢神経</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">血液・血管</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">リンパ球・節</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">こころ</button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">全身</button>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-6 px-1">
            <button class="btn btn-outline-primary btn-block rounded-0">その他</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <NuxtLink to="/createCommunity" tag="button" class="btn btn-outline-secondary btn-block">コミュニティを作成</NuxtLink>
    </div>
    <!-- Seatch Result-->
    <!-- <div class="card bg-transparent rounded-0 mt-2 p-2 vh-100">
      <p class="text-center">検索結果</p>
    </div> -->
  </div>
</template>

<script>
export default {

}
</script>