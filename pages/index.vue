<template>
  <b-container class="p-2" fluid>
    <div class="row mr-0 d-flex justify-content-end">
      <NuxtLink to="/signIn" tag="button" class="btn btn-outline-primary rounded-0 font-weight-bold px-4 mr-2">
        サインイン
      </NuxtLink>
    </div>
    <div v-if="!isCookieEnabled" class="alert alert-danger mt-2" role="alert">
      このサービスはCookieを使用します。Cookieを有効にしてください。
    </div>
    <div class="jumbotron text-white text-center bg-primary border border-info mt-2 mb-2">
      <h1>BLUE ROSE NOTE</h1>
      <p class="title text-success">SNS for your Health</p>
      <NuxtLink to="/signUp" tag="button" class="btn btn-light btn-lg">登録する</NuxtLink>
    </div>
    <div class="text-white text-center bg-secondary border border-success my-2 innerborder" style="height:42vh;position:relative">
      <p class="message align-items-center">CONTROL YOUR BODY</p>
      <img src="/bluerose.png" height="85%" class="img-responsive rose__img_left" style="position:absolute;bottom:0;" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="jumbotron text-center bg-yellow mb-2">
          <h2 class="text-primary">体調管理機能</h2>
          <div class="my-4">
            <button class="btn btn-lg btn-light px-3">症状</button>
            <button class="btn btn-lg btn-light px-3">体温</button>
            <button class="btn btn-lg btn-light px-3">薬</button>
            <button class="btn btn-lg btn-light px-3">食事</button>
          </div>
          <p>記録をとって体調を詳細に伝えよう</p>
          <p>体調の変化に目を向けよう</p>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="jumbotron text-center bg-yellow">
          <h2 class="text-primary">コミュニティ機能</h2>
          <div class="my-4">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 409.801 409.801" style="enable-background:new 0 0 409.801 409.801;" xml:space="preserve" fill="#85b8c9">
              <path d="M280.943,162.797c8.44,26.506,5.64,56.987-10.212,83.444c-15.32,25.562-39.688,42.149-65.99,47.81c40.53,15.133,83.655,4.941,102.642-26.743C326.678,235.106,314.632,191.378,280.943,162.797z" />
              <path d="M137.919,243.267c-14.476-26.047-16.657-55.443-8.407-81.053c-33.371,27.53-46.109,69.978-28.162,102.261c18.24,32.812,62.133,44.241,103.733,29.357C177.903,287.89,152.906,270.224,137.919,243.267z" />
              <path d="M206.905,129.736c29.794,0.483,56.346,13.299,74.396,33.245c-7.158-42.667-37.549-74.92-74.482-75.519c-37.538-0.61-69.38,31.685-77.288,75.152C148.266,142.052,176.065,129.235,206.905,129.736z" />
              <path d="M391.893,123.934c-11.666-41.399-54.581-67.218-103.891-66.761C276.559,29.967,255.595,9.424,228.28,2.478c-41.688-10.599-85.505,13.659-109.766,56.592c-29.281-3.69-57.554,4.188-77.229,24.374c-30.021,30.802-30.924,80.879-5.871,123.354c-17.838,23.517-25.149,51.938-17.507,79.071c11.666,41.398,54.583,67.22,103.892,66.763c11.444,27.203,32.406,47.746,59.724,54.692c41.688,10.6,85.504-13.658,109.765-56.591c29.281,3.69,57.555-4.19,77.228-24.375c30.021-30.801,30.924-80.879,5.873-123.354C392.225,179.488,399.537,151.067,391.893,123.934z M329.834,290.007c-26.112,26.791-60.693,40-94.466,39.297c13.822,9.259,28.629,15.668,43.452,19.174c-25.486,11.507-55.363,14.748-85.159,7.173c-36.258-9.218-64.984-32.563-81.263-62.162c-1.105,16.6,0.746,32.628,5.121,47.217c-22.707-16.315-40.453-40.571-48.791-70.16c-10.145-36.013-4.292-72.563,13.201-101.458c-14.927,7.338-27.882,16.959-38.33,28.041c2.777-27.82,14.91-55.316,36.368-77.333c26.113-26.793,60.695-40.001,94.465-39.298c-13.82-9.257-28.628-15.667-43.45-19.173c25.486-11.506,55.363-14.747,85.158-7.173c36.259,9.221,64.986,32.564,81.263,62.164c1.106-16.599-0.746-32.629-5.118-47.217c22.705,16.317,40.45,40.572,48.787,70.159c10.146,36.012,4.293,72.563-13.199,101.458c14.928-7.339,27.882-16.959,38.328-28.041C363.424,240.495,351.292,267.99,329.834,290.007z" />
              <path d="M204.136,163.386c-27.532,4.554-48.257,24.337-48.257,48.049c0,23.332,20.062,42.854,46.929,47.816c-12.411-11.608-20.229-28.509-20.229-47.334C182.579,192.436,190.959,175.016,204.136,163.386z" />
              <path d="M208.622,246.876c27.534-4.553,48.258-24.336,48.258-48.049c0-23.332-20.059-42.857-46.931-47.817c12.41,11.608,20.229,28.509,20.229,47.334C230.176,217.823,221.796,235.247,208.622,246.876z" />
            </svg>
          </div>
          <p>同じ病気の人と気軽に話してみよう</p>
          <p>情報を集めよう</p>
        </div>
      </div>
    </div>
    <!-- <div class="rounded bg-author">
      <p style="position:absolute;bottom:1vh;right:1vw">Created by meeeeeee</p>
    </div> -->
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      isCookieEnabled: true
    }
  },
  head () {
    return {
      title: 'BLUE ROSE NOTE'
    }
  },
  mounted () {
    this.isCookieEnabled = navigator.cookieEnabled;
  }
}
</script>

<style scoped>
.card-title {
  font-size: 5rem;
  font-weight: 500;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.innerborder {
  outline: 1.5px solid #fff;
  outline-offset: -15px;
}

.message {
  position:absolute;
  top:25vh;
  left: 0;
  right: 0;
  font-size: 6vw;
  font-weight: 600;
}

.bg-author {
  height:15vh;
  position:relative;
  background-color: transparent;
  background-image: linear-gradient(transparent 50%, rgb(215, 215, 125) 50%);
  background-size: 30px 30px;
}

.bg-yellow {
  background-color: rgb(215, 215, 125);
}

@media screen and (max-width: 899px) {
  .rose__img_left {
    left:33.5vw;
  }
}

@media screen and (min-width: 900px) {
  .rose__img_left{
    left:45vw;
  }
}
</style>
