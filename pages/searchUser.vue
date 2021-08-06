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
      targetUser: null
    }
  },
  methods: {
    searchUser () {
      if (!this.targetUser) { return; }

      const param = {
        body: {
          TableName: 'UserProfile',
          Limit: 15,
          FilterExpression: (this.searchType === 1) ? 'contains (accountId, :name)' : 'contains (userName, :name)',
          ExpressionAttributeValues: { ":name": this.targetUser }
        }
      };
    }
  }
}
</script>