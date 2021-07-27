<template>
  <div>
    <div class="row d-flex justify-content-end mb-2 mr-1 d-block d-sm-none">
      <NuxtLink to="/searchCommunity" tag="button" class="btn btn-outline-primary">
        <span class="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 20 20">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>コミュニティ検索
      </NuxtLink>
    </div>
    <div class="row">
      <div class="col-12 col-lg-7">
        <div class="card rounded-0">
          <div class="card-body bg-white border-bottom-0">
            <h5 class="font-weight-bold mb-0">参加コミュニティ</h5>
          </div>
          <itemLoader v-if="showLoader" class="pt-4" />
          <!-- Community List -->
          <ul class="list-group border-0 rounded-0 pt-0 pb-2">
            <li v-for="community in communities" :key="community.communityId" class="list-group-item border-0">
              <button type="button" class="btn btn-block clip__button-bg border border-1 text-left p-2" @click="loadTo(community)">
                <div class="d-flex align-items-center">
                  <div class="image">
                    <img :src="community.selfImg" class="rounded-circle bg-gray" width="55" />
                  </div>
                  <div class="ml-2 w-100">
                    <h5 class="mb-0">{{ community.communityName }}</h5>
                    <!-- Description -->
                    <p class="mb-0 ml-1">
                      <small>{{ community.description.substr(0, 30) }}</small>
                      <small v-if="community.description.length > 30">...</small>
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
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-5 d-none d-sm-block">
        <SearchCommunity />
      </div>
    </div>
  </div>
</template>

<script>
import API from '@aws-amplify/api';
import SearchCommunity from '~/components/searchCommunity'

export default {
  components: {
    SearchCommunity
  },
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      communities: [],
      showLoader: true,
      lastEvaluatedKey: null
    }
  },
  head () {
    return {
      title: 'コミュニティ'
    }
  },
  mounted () {
    const params = {
      body: {
        clientId: this.$cookies.get('account_id'),
        lastEvaluatedKey: null
      }
    };

    API.post('BlueRoseNoteAPIs', '/Communities', params)
    .then((response) => {
      if (response.statusCode === 200) {
        this.communities.push(...JSON.parse(response.body).Items);
        this.lastEvaluatedKey = JSON.parse(response.body).LastEvaluatedKey;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.showLoader = false;
    });

    // window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    loadTo (target) {
      localStorage.setItem('communityInfo', JSON.stringify(target));
      this.$router.push('/communityTweet');
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