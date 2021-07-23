<template>
  <div>
    <div v-if="showSearchArea">
      <!-- Search Box -->
      <div class="input-group">
        <input v-model="commSearchWords" type="text" class="form-control bg-light" placeholder="コミュニティを検索" aria-label="Search Community" aria-describedby="searchAddon" @keyup.enter="searchCommunityByWords" />
        <div class="input-group-prepend">
          <button id="searchAddon" type="button" class="btn btn-sm btn-outline-info rounded-right px-3 pb-0" @click="searchCommunityByWords">
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
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(1)">頭・顔・口</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(2)">目</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(3)">鼻</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(4)">耳</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(5)">首・のど</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(6)">胸<small>（肺・心臓）</small></button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(7)">腹<small>（胃腸・肝臓）</small></button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(8)">子宮</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(9)">手</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(10)">足</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(11)">背中・腰</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(12)">腎臓・膵臓</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(13)">陰部・肛門</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(14)">皮膚</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(15)">骨・関節</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(16)">脳・脊髄</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(17)">筋肉</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(18)">末梢神経</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(19)">血液・血管</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(20)">リンパ球・節</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(21)">こころ</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(22)">全身</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(23)">その他</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <NuxtLink to="/createCommunity" tag="button" class="btn btn-outline-secondary btn-block">コミュニティを作成</NuxtLink>
      </div>
    </div>
    <!-- Seatch Result-->
    <div v-if="!showSearchArea">
      <button type="button" class="btn btn-outline-primary px-4" @click="showSearchCommunity(true)">
        <span class="mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </span>検索に戻る
      </button>
      <p class="text-center my-1">検索結果</p>
      <ul v-if="searchResult.length > 0" class="list-group-item rounded-0 p-1 mt-1">
        <li v-for="community in searchResult" :key="community.communityId" class="list-group-item border-0 p-1">
          <button tag="button" class="btn btn-block clip__button-bg border border-1 text-left p-2" @click="moveTo(community)">
            <div class="d-flex align-items-center">
              <div class="image">
                <img :src="community.selfImg" class="rounded-circle" width="55" />
              </div>
              <div class="ml-2 w-100">
                <!-- Name -->
                <h5 class="mb-0">{{ community.communityName }}</h5>
                <!-- Description -->
                <p class="mb-0 ml-1">
                  <small>{{ community.description.substr(0, 17) }}</small>
                  <small v-if="community.description.length > 17">...</small>
                </p>
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
                <span v-if="community.part23" class="badge badge-light">目</span>
              </div>
            </div>
          </button>
        </li>
      </ul>
      <itemLoader v-if="loading" />
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';

export default {
  data () {
    return {
      commSearchWords: null,
      showSearchArea: true,
      searchResult: [],
      loading: false
    }
  },
  methods: {
    showSearchCommunity (val) {
      this.showSearchArea = val;
    },
    searchCommunityByWords () {
      if (this.commSearchWords === null) {
        return;
      }

      if (this.loading) { return; }

      this.loading = true;
      this.showSearchCommunity(false);
      this.searchResult = [];

      // search
      const params = {
        body: {
          TableName: 'CommunityInfo',
          Limit: 15,
          ScanIndexForward: false,
          FilterExpression: 'contains (communityName, :name)',
          ExpressionAttributeValues: { ":name": this.commSearchWords }
        }
      };

      API.post('BlueRoseNoteAPIs', '/CommunityInfo', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.searchResult.push(...JSON.parse(response.body).Items);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    searchPart (no) {
      if (this.loading) { return; }

      this.loading = true;
      this.showSearchCommunity(false);
      this.searchResult = [];

      const params = {
        body: {
          TableName: 'CommunityInfo',
          Limit: 15,
          ScanIndexForward: false,
          FilterExpression: `part${no} = :part`,
          ExpressionAttributeValues: { ":part": true }
        }
      };

      API.post('BlueRoseNoteAPIs', '/CommunityInfo', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.searchResult.push(...JSON.parse(response.body).Items);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    moveTo (target) {
      this.$store.commit('setCommunityInfo', target);
      this.$router.push('/communityTweet');
    }
  }
}
</script>