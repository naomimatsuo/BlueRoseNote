<template>
  <div class="container-fluid p-2">
    <!-- phone menu -->
    <div class="phone__item">
      <div class="bg-secondary border-secondary border-bottom py-1 mb-2 mx-n2 mt-n2" style="height:47px;">
        <button type="button" class="btn rounded ml-1" @click="openPhoneBurger">
          <img src="/icon-white.svg" width="25" height="25" />
          <span class="text-white" style="font-family: 'Franklin Gothic'">MENU</span>
        </button>
      </div>
      <!-- phone humburger -->
      <div class="phoneburger-container back" @click="closePhoneBurger" />
      <div class="phoneburger">
        <ul class="list-group">
          <div class="d-flex justify-content-between mt-2 ml-3 bg-secondary">
            <img src="/icon-white.svg" width="25" height="25" class="mt-1" />
            <button type="button" class="bt-lg close mr-3" aria-label="Close" @click="closePhoneBurger">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <li class="phoneburger-item py-2 mt-2" @click="closePhoneBurger">
            <NuxtLink to="/top" tag="button" class="btn btn-secondary btn-block">
              <span class="float-left ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                </svg>
              </span>
              ホーム
            </NuxtLink>
          </li>
          <li class="phoneburger-item py-2" @click="closePhoneBurger">
            <NuxtLink to="/userRecords" tag="button" class="btn btn-secondary btn-block">
              <span class="float-left ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen" viewBox="0 0 20 20">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                </svg>
              </span>
              記録
            </NuxtLink>
          </li>
          <!-- <li class="phoneburger-item py-2" @click="closePhoneBurger">
            <NuxtLink to="/recordReviewers" tag="button" class="btn btn-secondary btn-block">
              <span class="float-left ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 20 20">
                  <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
              </span>
              記録閲覧者
            </NuxtLink>
          </li> -->
          <li class="phoneburger-item py-2" @click="closePhoneBurger">
            <NuxtLink to="/communities" tag="button" class="btn btn-secondary btn-block">
              <span class="float-left ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 20 20">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              </span>
              コミュニティ
            </NuxtLink>
          </li>
          <li class="phoneburger-item py-2" @click="closePhoneBurger">
            <NuxtLink to="/profile" tag="button" class="btn btn-secondary btn-block">
              <span class="float-left ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 20 20">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </span>
              プロフィール
            </NuxtLink>
          </li>
          <li class="phoneburger-item py-2" @click="closePhoneBurger">
            <NuxtLink to="/help" tag="button" class="btn btn-secondary btn-block">
              <span class="float-left ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 20 20">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                </svg>
              </span>
              ヘルプ
            </NuxtLink>
          </li>
          <li class="phoneburger-item py-2 mb-2">
            <button type="button" class="btn btn-secondary btn-block" @click="signOut">
              <span class="float-left ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </span>
              ログアウト
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- tablet and pc menu-->
    <div class="d-flex justify-content-center mx-0 tablet__item">
      <ul class="list-group tablet__listgroup tablet__item">
        <img src="/icon.svg" width="35" height="35" class="m-2" />
        <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/top" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
              </svg>
            </span>
            <strong class="pc__item">ホーム</strong>
          </NuxtLink>
        </li>
        <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/userRecords" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen" viewBox="0 0 20 20">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
              </svg>
            </span>
            <strong class="pc__item">記録</strong>
          </NuxtLink>
        </li>
        <!-- <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/recordReviewers" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 20 20">
                <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              </svg>
            </span>
            <strong class="pc__item">記録閲覧者</strong>
          </NuxtLink>
        </li> -->
        <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/communities" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 20 20">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg>
            </span>
            <strong class="pc__item">コミュニティ</strong>
          </NuxtLink>
        </li>
        <!-- <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/scholarSearch" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 20 20">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            <strong class="pc__item">文献検索</strong>
          </NuxtLink>
        </li> -->
        <!-- <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/mailAdvice" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 20 20">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
              </svg>
            </span>
            <strong>メール相談</strong>
          </NuxtLink>
        </li> -->
        <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/profile" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 20 20">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            </span>
            <strong class="pc__item">プロフィール</strong>
          </NuxtLink>
        </li>
        <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <NuxtLink to="/help" tag="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 20 20">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
            </span>
            <strong class="pc__item">ヘルプ</strong>
          </NuxtLink>
        </li>
        <li class="list-group-item bg-transparent border-0 px-0 py-1">
          <button type="button" class="btn btn-lg btn-outline-primary btn-block rounded-0 border-0 p-2" @click="signOut">
            <span class="float-left ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
            </span>
            <strong class="pc__item">ログアウト</strong>
          </button>
        </li>
      </ul>
      <div class="container mx-0">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    $('.container').click(() => {
      $('.phoneburger-container').addClass('back');
      $('.phoneburger').removeClass('show');
    });
  },
  methods: {
    closePhoneBurger () {
      $('.phoneburger-container').addClass('back');
      $('.phoneburger').removeClass('show');
    },
    openPhoneBurger () {
      $('.phoneburger-container').removeClass('back');
      $('.phoneburger').addClass('show');
    },
    signOut () {
      this.$cookies.removeAll();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.phoneburger-container {
  position: fixed;
  top: 0px;
  right: 0;
  z-index: 2147483646;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.4);
}
.phoneburger {
  position: absolute;
  top: 5px;
  left: -100%;
  width: 16rem;
  z-index: 2147483647;
  pointer-events: auto;
  opacity: 0.3;
  background-color: #85b8c9;
  transition: all 0.7s;
}

.phoneburger.show {
  left: 0px;
  opacity: 1;
  box-shadow: 0 0 2.5px #ccc;
}

.phoneburger-item {
  position: relative;
  display: block;
}

.back {
  display: none;
}
</style>