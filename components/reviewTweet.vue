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
        <div class="text-dark text-break mb-0 u-pre-wrap">{{ post.tweet }}</div>
        <div class="d-flex justify-content-center">
          <img v-if="post.tweetpic !== null" :src="post.tweetpic" class="picImg rounded" @click="showPicModal(post.tweetpic)" />
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
      accountId: null,
      showLoader: true,
      posts: [],
      lastEvaluatedKey: null
    };
  },
  mounted () {
    this.accountId = this.clientid;
    if (!this.accountId) { return; }

    const params = {
      body: {
        clientId: this.accountId,
        lastEvaluatedKey: null
      }
    };

    API
      .post('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const results = JSON.parse(response.body).Items;
        this.posts.push(...results);
        this.lastEvaluatedKey = JSON.parse(response.body).LastEvaluatedKey;
      })
      .catch((error) => {
        console.log(error.response);
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

      if (!this.accountId) { return; }

      this.showLoader = true;

      const params = {
        body: {
          clientId: this.accountId,
          lastEvaluatedKey: this.lastEvaluatedKey
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const results = JSON.parse(response.body).Items;
        this.posts.push(...results);
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