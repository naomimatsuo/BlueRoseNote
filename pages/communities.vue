<template>
  <div class="row">
    <div class="col-md-12 col-lg-8">
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
      <!-- Seatch Result-->
      <div class="card bg-transparent rounded-0 mt-2 p-2 vh-100">
        <p class="text-center">検索結果</p>
      </div>
    </div>
    <div class="col-lg-4">
      <!-- Scolor Clip -->
      <div class="card rounded-0 pc__item">
        <div class="card-body bg-white border-bottom-0">
          <h5 class="font-weight-bold mb-0">登録コミュニティ</h5>
        </div>
        <ul class="list-group border-0 rounded-0 pt-0 pb-2">
          <li class="list-group-item border-0">
            <button type="button" class="btn btn-block clip__button-bg border border-1 text-left p-2">
              <div class="d-flex align-items-center">
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded-circle" width="55" />
                </div>
                <div class="ml-2 w-100">
                  <h5>first community name</h5>
                  <span>category name</span>
                  <div class="follower__span-bg px-1 mt-1 d-flex justify-content-between rounded">
                    <span class="font-weight-light"><small>フォロワー</small></span>
                    <span class="font-weight-light"><small>100</small></span>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li class="list-group-item border-0 pt-0 pb-2">
            <button type="button" class="btn btn-block clip__button-bg border border-1 text-left p-2">
              <div class="d-flex align-items-center">
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded-circle" width="55" />
                </div>
                <div class="ml-2 w-100">
                  <h5>second community name</h5>
                  <span>category name</span>
                  <div class="follower__span-bg px-1 mt-1 d-flex justify-content-between rounded">
                    <span class="font-weight-light"><small>フォロワー</small></span>
                    <span class="font-weight-light"><small>100</small></span>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li class="list-group-item border-0 pt-0 pb-2">
            <button type="button" class="btn btn-block clip__button-bg border border-1 text-left p-2">
              <div class="d-flex align-items-center">
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded-circle" width="55" />
                </div>
                <div class="ml-2 w-100">
                  <h5>third community name</h5>
                  <span>category name</span>
                  <div class="follower__span-bg px-1 mt-1 d-flex justify-content-between rounded">
                    <span class="font-weight-light"><small>フォロワー</small></span>
                    <span class="font-weight-light"><small>100</small></span>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li class="list-group-item border-0 pt-0 pb-2">
            <button type="button" class="btn btn-block clip__button-bg border border-1  text-left p-2">
              <div class="d-flex align-items-center">
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded-circle" width="55" />
                </div>
                <div class="ml-2 w-100">
                  <h5>fourth community name</h5>
                  <span>category name</span>
                  <div class="follower__span-bg px-1 mt-1 d-flex justify-content-between rounded">
                    <span class="font-weight-light"><small>フォロワー</small></span>
                    <span class="font-weight-light"><small>100</small></span>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li class="list-group-item border-0 pt-0 pb-2">
            <button type="button" class="btn btn-block clip__button-bg border border-1 text-left p-2">
              <div class="d-flex align-items-center">
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded-circle" width="55" />
                </div>
                <div class="ml-2 w-100">
                  <h5>fifth community name</h5>
                  <span>category name</span>
                  <div class="follower__span-bg px-1 mt-1 d-flex justify-content-between rounded">
                    <span class="font-weight-light"><small>フォロワー</small></span>
                    <span class="font-weight-light"><small>100</small></span>
                  </div>
                </div>
              </div>
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
      title: 'コミュニティ'
    }
  }
}
</script>

<style scoped>
.clip__button-bg:hover {
  background-color: #eeeeee;
  transition: 0.3s;
}
.follower__span-bg {
  background-color: #d8d8d8;
}
</style>