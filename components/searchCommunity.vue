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
          <div v-for="no in [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]" :key="no" class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(no)">{{ $getCommunityCategory(no) }}</button>
            </div>
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(no+1)">{{ $getCommunityCategory(no+1) }}</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 px-2">
              <button class="btn btn-outline-primary btn-block rounded-0" @click="searchPart(23)">{{ $getCommunityCategory(23) }}</button>
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
          <NuxtLink :to="{ path: 'communityTweet', query : { communityId: community.communityId }}" tag="button" class="btn btn-block clip__button-bg border border-1 text-left p-2">
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
                <span v-if="community.part1" class="badge badge-light">{{ $getCommunityCategory(1) }}</span>
                <span v-if="community.part2" class="badge badge-light">{{ $getCommunityCategory(2) }}</span>
                <span v-if="community.part3" class="badge badge-light">{{ $getCommunityCategory(3) }}</span>
                <span v-if="community.part4" class="badge badge-light">{{ $getCommunityCategory(4) }}</span>
                <span v-if="community.part5" class="badge badge-light">{{ $getCommunityCategory(5) }}</span>
                <span v-if="community.part6" class="badge badge-light">{{ $getCommunityCategory(6) }}</span>
                <span v-if="community.part7" class="badge badge-light">{{ $getCommunityCategory(7) }}</span>
                <span v-if="community.part8" class="badge badge-light">{{ $getCommunityCategory(8) }}</span>
                <span v-if="community.part9" class="badge badge-light">{{ $getCommunityCategory(9) }}</span>
                <span v-if="community.part10" class="badge badge-light">{{ $getCommunityCategory(10) }}</span>
                <span v-if="community.part11" class="badge badge-light">{{ $getCommunityCategory(11) }}</span>
                <span v-if="community.part12" class="badge badge-light">{{ $getCommunityCategory(12) }}</span>
                <span v-if="community.part13" class="badge badge-light">{{ $getCommunityCategory(13) }}</span>
                <span v-if="community.part14" class="badge badge-light">{{ $getCommunityCategory(14) }}</span>
                <span v-if="community.part15" class="badge badge-light">{{ $getCommunityCategory(15) }}</span>
                <span v-if="community.part16" class="badge badge-light">{{ $getCommunityCategory(16) }}</span>
                <span v-if="community.part17" class="badge badge-light">{{ $getCommunityCategory(17) }}</span>
                <span v-if="community.part18" class="badge badge-light">{{ $getCommunityCategory(18) }}</span>
                <span v-if="community.part19" class="badge badge-light">{{ $getCommunityCategory(19) }}</span>
                <span v-if="community.part20" class="badge badge-light">{{ $getCommunityCategory(20) }}</span>
                <span v-if="community.part21" class="badge badge-light">{{ $getCommunityCategory(21) }}</span>
                <span v-if="community.part22" class="badge badge-light">{{ $getCommunityCategory(22) }}</span>
                <span v-if="community.part23" class="badge badge-light">{{ $getCommunityCategory(23) }}</span>
              </div>
            </div>
          </NuxtLink>
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
    }
  }
}
</script>