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
        <div class="btn-join">
          <button v-if="!doesJoin" class="btn btn-secondary px-4" @click="joinCommunity">参加</button>
          <button v-if="doesJoin" class="btn btn-info px-4" @click="joinCommunity">参加済み</button>
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
            <span v-if="communityInfo.part1" class="badge badge-light">頭・顔・口</span>
            <span v-if="communityInfo.part2" class="badge badge-light">目</span>
            <span v-if="communityInfo.part3" class="badge badge-light">鼻</span>
            <span v-if="communityInfo.part4" class="badge badge-light">耳</span>
            <span v-if="communityInfo.part5" class="badge badge-light">首・のど</span>
            <span v-if="communityInfo.part6" class="badge badge-light">胸<small>（肺・心臓）</small></span>
            <span v-if="communityInfo.part7" class="badge badge-light">腹<small>（胃腸・肝臓）</small></span>
            <span v-if="communityInfo.part8" class="badge badge-light">子宮</span>
            <span v-if="communityInfo.part9" class="badge badge-light">手</span>
            <span v-if="communityInfo.part10" class="badge badge-light">足</span>
            <span v-if="communityInfo.part11" class="badge badge-light">背中・腰</span>
            <span v-if="communityInfo.part12" class="badge badge-light">腎臓・膵臓</span>
            <span v-if="communityInfo.part13" class="badge badge-light">陰部・肛門</span>
            <span v-if="communityInfo.part14" class="badge badge-light">皮膚</span>
            <span v-if="communityInfo.part15" class="badge badge-light">骨・関節</span>
            <span v-if="communityInfo.part16" class="badge badge-light">脳・脊髄</span>
            <span v-if="communityInfo.part17" class="badge badge-light">筋肉</span>
            <span v-if="communityInfo.part18" class="badge badge-light">末梢神経</span>
            <span v-if="communityInfo.part19" class="badge badge-light">血液・血管</span>
            <span v-if="communityInfo.part20" class="badge badge-light">リンパ球・節</span>
            <span v-if="communityInfo.part21" class="badge badge-light">こころ</span>
            <span v-if="communityInfo.part22" class="badge badge-light">全身</span>
            <span v-if="communityInfo.part23" class="badge badge-light">その他</span>
          </div>
        </div>
      </div>
    </div>
    <!-- new post-->
    <communityTweetContent v-if="doesJoin" :communityid="communityInfo.communityId" />
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
        communityId: null,
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
      doesJoin: false
    }
  },
  head () {
    return {
      title: 'コミュニティ'
    }
  },
  async beforeMount () {
    this.communityInfo.communityId = Number(this.$route.query.communityId);

    if (!this.communityInfo.communityId) { return; }

    const responseInfo = await API.post('BlueRoseNoteAPIs', '/CommunityMember', {
        body: {
          communityId: this.communityInfo.communityId,
          clientId: this.$cookies.get('client_id')
        }
      });

    if (responseInfo.statusCode !== 200) { return; }

    const result = JSON.parse(responseInfo.body);
    this.communityInfo = result.communityInfo.Item;
    this.doesJoin = result.doesJoin.Count > 0;
  },
  methods: {
    joinCommunity () {
      const clientId = this.$cookies.get('client_id');
      if (!clientId) { return; }

      const now = new Date();

      const params = {
        body: {
          communityId: this.communityInfo.communityId,
          clientId: this.$cookies.get('client_id'),
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/CommunityMember', params)
      .then((response) => {
        if (response.statusCode === 200) {
          this.doesJoin = true;
        }
      });
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

  .btn-join {
    position:absolute;
    bottom:-3rem;
    right: 0.8rem;
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

  .btn-join {
    position:absolute;
    bottom:-4.5rem;
    right: 0.8rem;
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

  .btn-join {
    position:absolute;
    bottom:-5rem;
    right: 0.8rem;
  }

  .container-inputgroup {
    margin-top: 0;
    min-height: 5rem;
  }
}
</style>