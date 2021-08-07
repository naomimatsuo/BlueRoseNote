<template>
  <div class="w-100 mt-2">
    <ul class="list-group mt-2">
      <li v-for="post in posts" :key="post.recordId" class="list-group-item rounded-0 bg-transparent">
        <div class="d-flex justify-content-between">
          <p class="text-gray mb-0">{{ post.createdAt }}</p>
          <button type="button" class="btn btn-sm px-1 py-0" @click="showDeleteModal(post)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
          </button>
        </div>
        <div class="row text-dark text-break mt-2">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <table class="table table-bordered mb-0">
              <tbody>
                <tr>
                  <td class="text-center p-1"><img src="/rice.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/carot.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/fish.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/milk.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/apple.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/cake.svg" width="20" height="20" /></td>
                  <td class="text-center p-1"><img src="/beer.svg" width="20" height="20" /></td>
                </tr>
                <tr>
                  <td class="text-center p-1" style="height:2em;">
                    <img v-if="post.stapleFood" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.subSideDish" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.mainDish" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.dailyProducts" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.fruits" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.sweets" src="/check.svg" width="20" height="20" />
                  </td>
                  <td class="text-center p-1">
                    <img v-if="post.alcohol" src="/check.svg" width="20" height="20" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-6">
            <p v-if="post.memo !== null" class="text-dark text-break u-pre-wrap mt-2 mb-0">{{ post.memo }}</p>
          </div>
        </div>
      </li>
    </ul>
    <itemLoader v-if="showLoader" class="pt-4" />
  </div>
</template>

<script>
import API from '@aws-amplify/api';

export default {
  props: { clientid: { type: String, default: null } },
  data () {
    return {
      showLoader: true,
      posts: [],
      lastEvaluatedKey: null
    }
  },
  mounted () {
    const accountId = this.clientid;
    if (!accountId) { return; }

    const params = {
      body: {
        clientId: accountId,
        lastEvaluatedKey: null
      }
    };

    API.post('BlueRoseNoteAPIs', '/RecordAppetite', params)
    .then((response) => {
      if (response.statusCode === 200) {
        this.posts.push(...JSON.parse(response.body).Items);
        this.lastEvaluatedKey = JSON.parse(response.body).LastEvaluatedKey;
      }
    })
    .finally(() => {
      this.showLoader = false;
    });

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

      const accountId = JSON.parse(localStorage.getItem('targetProfile'));
      if (!accountId) { return; }

      const params = {
        body: {
          clientId: accountId,
          lastEvaluatedKey: this.lastEvaluatedKey
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/RecordAppetite', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.posts.push(...JSON.parse(response.body).Items);
        this.lastEvaluatedKey = JSON.parse(response.body).LastEvaluatedKey;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.showLoader = false;
      });
    }
  }
}
</script>

<style>
.btn-eat:hover {
  color: #31444e;
  background-color: #e6e6e6;
}
</style>