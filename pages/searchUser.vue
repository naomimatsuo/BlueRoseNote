<template>
  <div class="mt-2">
    <div class="form-check form-check-inline">
      <input id="accountIdSearch" v-model="searchType" class="form-check-input" type="radio" name="inlineRadioOptions" value="アカウントID">
      <label class="form-check-label" for="accountIdSearch">アカウントID</label>
    </div>
    <div class="form-check form-check-inline ml-3">
      <input id="nameSearch" v-model="searchType" class="form-check-input" type="radio" name="inlineRadioOptions" value="名前">
      <label class="form-check-label" for="nameSearch">名前</label>
    </div>
    <!-- Search Box -->
    <div class="input-group mt-3">
      <input v-model="targetUser" type="text" class="form-control bg-light" :placeholder="[[ searchType ]]+'でユーザー検索'" aria-label="Search Community" aria-describedby="searchAddon" maxlength="25" @keyup.enter="searchUser" />
      <div class="input-group-prepend">
        <button id="searchAddon" type="button" class="btn btn-sm btn-outline-info rounded-right px-3 pb-0" @click="searchUser">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 20 20">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
    <!-- user list -->
    <ul class="list-group border-0 rounded-0 pt-0 pb-2">
      <li v-for="result in searchResult" :key="result.accountId" class="list-group-item border-0">
        <button type="button" class="btn btn-block clip__button-bg border border-1 text-left p-2" @click="gotoProfile(result)">
          <div class="d-flex align-items-center">
            <div class="image">
              <img :src="result.selfImg" class="rounded-circle bg-gray" width="55" />
            </div>
            <div class="ml-2 w-100">
              <p class="mb-0">{{ result.userName }}<span class="ml-1"><small>@{{ result.accountId }}</small></span></p>
              <!-- Description -->
              <p class="mb-0 ml-1">
                <small>{{ result.description.substr(0, 30) }}</small>
                <small v-if="result.description.length > 30">...</small>
              </p>
            </div>
          </div>
        </button>
      </li>
    </ul>
    <itemLoader v-if="showLoader" class="pt-4" />
  </div>
</template>

<script>
import { API } from 'aws-amplify';

export default {
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      searchType: 'アカウントID',
      targetUser: null,
      searchResult: [],
      lastEvaluatedKey: null,
      showLoader: false
    }
  },
  mounted () {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll (event) {
      if ($(window).scrollTop() + window.innerHeight < $(document).height() - 30) {
        return;
      }

      if (!this.lastEvaluatedKey) { return; }

      if (this.showLoader) { return; }

      this.showLoader = true;

      const params = {
        body: {
          communityId: this.communityid,
          requestClientId: this.clientId,
          lastEvaluatedKey: this.lastEvaluatedKey
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/CommunityTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const result = JSON.parse(response.body);
        this.searchResult = result.Items;
        this.lastEvaluatedKey = result.LastEvaluatedKey;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.showLoader = false;
      });
    },
    searchUser () {
      if (!this.targetUser) { return; }

      const params = {
        body: {
          TableName: 'UserProfile',
          Limit: 15,
          FilterExpression: (this.searchType === 'アカウントID') ? 'contains (accountId, :name)' : 'contains (userName, :name)',
          ExpressionAttributeValues: { ":name": this.targetUser }
        }
      };

      this.showLoader = true;

      API.post('BlueRoseNoteAPIs', '/SearchUser', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const result = JSON.parse(response.body);
        this.searchResult = result.Items;
        this.lastEvaluatedKey = result.LastEvaluatedKey;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.showLoader = false;
      });
    },
    gotoProfile (target) {
      localStorage.setItem('targetProfile', JSON.stringify(target.accountId));
      this.$router.push('/previewProfile');
    }
  }
}
</script>