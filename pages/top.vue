<template>
  <div class="card rounded-0 vh-100">
    <pageLoader v-if="showLoader" />
    <!-- profile back image -->
    <div id="backImgDiv" class="bg-gray">
      <img id="backImgTarget" :src="backImg" style="width:100%;height:auto" />
      <div class="rounded-circle bg-white container-selfpic p-1">
        <!-- profile image -->
        <div class="rounded-circle bg-gray v-100 h-100 d-flex justify-content-center">
          <img id="selfImgTarget" :src="selfImg" />
        </div>
      </div>
    </div>
    <div class="container-inputgroup">
      <div class="ml-3">
        <p class="font-weight-bold mb-0">{{ userName }}</p>
        <p class="text-muted"><small>{{ '@' + accountId }}</small></p>
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="card-body">
      <!-- tab area -->
      <!-- <nav class="nav">
        <li class="nav-item mx-1">
          <a id="record-tab" data-toggle="pill" role="tab" class="nav-link text-center nav-link__top" href="#record-content" aria-controls="record-content" :aria-selected="{showRecordTab}" :class="{ active: showRecordTab}" @click="changeTab">記録</a>
        </li>
        <li class="nav-item mx-1">
          <a id="communiry-tab" data-toggle="pill" role="tab" class="nav-link text-center nav-link__top" href="#community-content" aria-controls="community-content" :aria-selected="{showCommunityTab}" :class="{ active: showCommunityTab}" @click="changeTab">コミュニティ</a>
        </li>
      </nav> -->
      <!-- content area -->
      <div>
        <p>content</p>
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
      showRecordTab: true,
      showCommunityTab: false,
      showScholorTab: false,
      accountId: null,
      userName: null,
      description: null,
      location: null,
      gender: null,
      userHeight: null,
      userWeight: null,
      birthYear: null,
      birthMonth: null,
      birthDate: null,
      backImg: null,
      selfImg: null,
      showLoader: true
    }
  },
  head () {
    return {
      title: 'BLUE ROSE NOTE'
    }
  },
  async mounted () {
    this.accountId = this.$cookies.get('account_id');

    const params = {
      body: {
        clientId: this.$cookies.get('account_id')
      }
    }

    const response = await API.post('BlueRoseNoteAPIs', '/UserProfile', params);
    this.showLoader = false;

    if (response.statusCode !== 200) { return; }
    if (!response.body) { return; }

    const res = JSON.parse(response.body);
    this.userName = res.userName;
    this.description = res.description;
    this.location = res.location;
    this.gender = res.gender;
    this.userHeight = res.userHeight;
    this.userWeight = res.userWeight;
    this.birthYear = res.birthYear;
    this.birthMonth = res.birthMonth;
    this.birthDate = res.birthDate;
    this.backImg = res.backImg;
    this.selfImg = res.selfImg;
  },
  methods: {
    changeTab (event) {
      this.showRecordTab = false;
      this.showCommunityTab = false;
      this.showScholorTab = false;

      if (event.target.id === 'record-tab') {
        this.showRecordTab = true;
        return;
      }
      if (event.target.id === 'communiry-tab') {
        this.showCommunityTab = true;
        return;
      }
      this.showScholorTab = true;
    }
  }
}
</script>
<style scoped>
.nav-link__top {
  width: 8.0rem;
}

a.active {
  border-bottom: solid 2.5px #85b8c9;
  font-weight: bolder;
  color: #54727c;
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
    margin-top: 3.0rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  #backImgDiv {
    width: 100%;
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
    margin-top: 4.5rem;
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
    margin-top: 5.0rem;
  }

  .container-loader {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .bg-loader {
    position: absolute;
    top: 45%;
    z-index: 100;
  }
}
</style>