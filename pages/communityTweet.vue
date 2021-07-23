<template>
  <div class="row mx-0">
    <div class="card rounded-0 w-100">
      <div id="backImgDiv" class="bg-gray">
        <!-- back-img -->
        <img id="backImgTarget" :src="$store.state.communityInfo.backImg" style="width:100%;height:auto" />
        <!-- self img -->
        <div class="rounded-circle bg-white container-selfpic p-1">
          <div id="selfImgDiv" class="rounded-circle bg-gray v-100 h-100 d-flex justify-content-center">
            <img id="selfImgTarget" :src="$store.state.communityInfo.selfImg" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <!-- community info -->
        <div class="row justify-content-md-center container-inputgroup">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="mb-2">
              <h5 class="ml-1 mb-0">{{ $store.state.communityInfo.communityName }}</h5>
            </div>
            <div class="mb-2">
              <p class="ml-1 mb-0"><small>{{ $store.state.communityInfo.description }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- new post-->
    <div class="bg-white p-2 w-100">
      <textarea id="recordTweetTextArea" v-model="newItem.tweet" class="form-control overflow-hidden mb-1" style="height:13vh;resize:none" rows="4" />
      <div id="picContainer" class="d-flex justify-content-center" style="position: relative">
        <img id="picTarget" class="rounded picImg">
        <button id="removePicBtn" type="button" class="btn btn-sm btn-secondary rounded-circle px-2 py-0" style="position:absolute; top: 10px; z-index: 10; display: none;" @click="removePic">
          <span aria-hidden="true" style="font-size:1.2rem">&times;</span>
        </button>
      </div>
      <div class="d-flex justify-content-between mt-1">
        <input id="picInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="picOnChange" />
        <button id="addImageBtn" type="button" class="btn btn-lg btn-light rounded-circle border-0 ml-1" @click="addImage">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
            <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
          </svg>
        </button>
        <button id="saveRecordBtn" type="button" class="btn btn-lg btn-secondary text-white rounded-0" style="width:10rem;" @click="saveRecord">投稿</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      newItem: {
        recordId: null,
        tweet: null
      },
      posts: []
    }
  },
  head () {
    return {
      title: 'コミュニティ'
    }
  }
}
</script>

<style scoped>
.bg-gray {
  background-color: #cccccc;
}

@media only screen and (max-width: 767px) {
  #backImgDiv {
    min-height:5rem;
    position:relative
  }

  .container-selfpic {
    position:absolute;
    width:5rem;
    height:5rem;
    bottom:-3rem;
    left: 0.5rem;
    z-index: 3;
  }

  .container-inputgroup {
    margin-top: 2.5rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  #backImgDiv {
    min-height:9rem;
    position:relative
  }

  .container-selfpic {
    position:absolute;
    width:9rem;
    height:9rem;
    bottom:-4.5rem;
    left: 2.5rem;
    z-index: 3;
  }

  .container-inputgroup {
    margin-top: 4.0rem;
  }
}

@media (min-width: 1024px){
  #backImgDiv {
    min-height:12rem;
    position:relative
  }

  .container-selfpic {
    position:absolute;
    width:10rem;
    height:10rem;
    bottom:-5rem;
    left: 3rem;
    z-index: 3;
  }

  .container-inputgroup {
    margin-top: 0;
    min-height: 5rem;
  }
}
</style>