<template>
  <div class="row mx-0">
    <div class="card rounded-0 w-100">
      <div id="backImgDiv" class="bg-gray">
        <!-- back-img -->
        <img id="backImgTarget" :src="communityInfo.backImg" style="width:100%;height:auto" />
        <!-- self img -->
        <div class="rounded-circle bg-white container-selfpic p-1">
          <div id="selfImgDiv" class="rounded-circle bg-gray v-100 h-100 d-flex justify-content-center">
            <img id="selfImgTarget" :src="communityInfo.selfImg" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <!-- community info -->
        <div class="row justify-content-md-center container-inputgroup">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <!-- Name -->
            <div class="mb-2">
              <h5 class="ml-1 mb-0">{{ communityInfo.communityName }}</h5>
            </div>
            <!-- Description -->
            <div class="mb-2">
              <p class="ml-1 mb-0"><small>{{ communityInfo.description }}</small></p>
            </div>
            <!-- Category -->
            <span v-if="community.part1" class="badge badge-light">頭・顔・口</span>
            <span v-if="community.part2" class="badge badge-light">目</span>
            <span v-if="community.part3" class="badge badge-light">鼻</span>
            <span v-if="community.part4" class="badge badge-light">耳</span>
            <span v-if="community.part5" class="badge badge-light">首・のど</span>
            <span v-if="community.part6" class="badge badge-light">胸<small>（肺・心臓）</small></span>
            <span v-if="community.part7" class="badge badge-light">腹<small>（胃腸・肝臓）</small></span>
            <span v-if="community.part8" class="badge badge-light">子宮</span>
            <span v-if="community.part9" class="badge badge-light">手</span>
            <span v-if="community.part10" class="badge badge-light">足</span>
            <span v-if="community.part11" class="badge badge-light">背中・腰</span>
            <span v-if="community.part12" class="badge badge-light">腎臓・膵臓</span>
            <span v-if="community.part13" class="badge badge-light">陰部・肛門</span>
            <span v-if="community.part14" class="badge badge-light">皮膚</span>
            <span v-if="community.part15" class="badge badge-light">骨・関節</span>
            <span v-if="community.part16" class="badge badge-light">脳・脊髄</span>
            <span v-if="community.part17" class="badge badge-light">筋肉</span>
            <span v-if="community.part18" class="badge badge-light">末梢神経</span>
            <span v-if="community.part19" class="badge badge-light">血液・血管</span>
            <span v-if="community.part20" class="badge badge-light">リンパ球・節</span>
            <span v-if="community.part21" class="badge badge-light">こころ</span>
            <span v-if="community.part22" class="badge badge-light">全身</span>
            <span v-if="community.part23" class="badge badge-light">その他</span>
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
import { API } from 'aws-amplify';

export default {
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      communityInfo: {
        backImg: null,
        selfImg: null,
        communityName: null,
        description: null,
        part1: null,
        part2: null,
        part3: null,
        part4: null,
        part5: null,
        part6: null,
        part7: null,
        part8: null,
        part9: null,
        part10: null,
        part11: null,
        part12: null,
        part13: null,
        part14: null,
        part15: null,
        part16: null,
        part17: null,
        part18: null,
        part19: null,
        part20: null,
        part21: null,
        part22: null,
        part23: null
      },
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
  },
  beforeMount () {
    const commId = this.$route.query.communityId;

    if (!commId) { return; }

    const params = {
      body: {
        Key: commId
      }
    };

    API.post('BlueRoseNoteAPIs', '/CommunityInfo', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.communityInfo = JSON.parse(response.body).Item;
      })
      .catch((error) => {
        console.log(error);
      });
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