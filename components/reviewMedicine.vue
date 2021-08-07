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
        <div class="row mx-0">
          <div v-if="post.tookMedicine === '1'" class="border border-1 px-4 py-1 mt-2">
            <p class="mb-0">
              <span class="mr-3 text-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </span>
              飲んだ
            </p>
          </div>
          <div v-if="post.tookMedicine === '0'" class="border border-1 px-4 py-1 mt-2">
            <p class="mb-0">
              <span class="mr-3 text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </span>
              忘れた
            </p>
          </div>
        </div>
        <p v-if="post.memo !== null" class="text-dark text-break u-pre-wrap mt-2 mb-0" style="font-size:0.9rem">{{ post.memo }}</p>
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
    }
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

    API.post('BlueRoseNoteAPIs', '/RecordMedicine', params)
    .then((response) => {
      if (response.statusCode !== 200) { return; }
      this.posts.push(...JSON.parse(response.body).Items);
      this.lastEvaluatedKey = JSON.parse(response.body).LastEvaluatedKey;
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

      const accountId = JSON.parse(localStorage.getItem('targetProfile'));
      if (!accountId) { return; }

      this.showLoader = true;

      const params = {
        body: {
          clientId: accountId,
          lastEvaluatedKey: this.lastEvaluatedKey
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/RecordMedicine', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.posts.push(...JSON.parse(response.body).Items)
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