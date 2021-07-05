<template>
  <b-container class="p-2" fluid>
    <div class="row mr-0 d-flex justify-content-end">
      <NuxtLink to="/signIn" tag="button" class="btn btn-outline-primary rounded-0 font-weight-bold px-4 mr-2">
        サインイン
      </NuxtLink>
    </div>
    <div
      class="jumbotron text-white text-center bg-primary border border-info mt-2 mb-2"
    >
      <h1>Blue Rose Note</h1>
      <p class="title text-success">SNS for your Health</p>
      <NuxtLink to="/signUp" tag="button" class="btn btn-light btn-lg">登録する</NuxtLink>
    </div>
    <div class="text-white text-center bg-secondary border border-success my-2 innerborder" style="height:50vh;position:relative">
      <p class="message align-items-center">BE YOUR DOC BY YOURSELF</p>
      <img src="/bluerose.png" height="85%" class="img-responsive rose__img_left" style="position:absolute;bottom:0;" />
    </div>
    <div class="rounded bg-author">
      <p style="position:absolute;bottom:1vh;right:1vw">Created by meeeeeee</p>
    </div>
  </b-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'BLUE ROSE NOTE'
    }
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
  background-size: 55px 55px;
}

@media screen and (max-width: 899px) {
  .rose__img_left {
    left:35vw;
  }
}

@media screen and (min-width: 900px) {
  .rose__img_left{
    left:45vw;
  }
}
</style>
