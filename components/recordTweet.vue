<template>
  <div>
    <!-- New post -->
    <div class="bg-white p-2">
      <textarea id="recordTweetTextArea" v-model="newItem.tweet" class="form-control overflow-hidden mb-1" style="height:13vh;resize:none" rows="4" />
      <div class="d-flex justify-content-center">
        <img id="picTarget" class="rounded" :src="newItem.tweetPic" style="width:75%;height:auto" />
      </div>
      <div class="d-flex justify-content-between mt-1">
        <input id="picInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="picOnChange" />
        <button id="addImageBtn" type="button" class="btn btn-lg btn-light rounded-circle border-0 ml-1" @click="addImage">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
            <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
          </svg>
        </button>
        <button type="button" class="btn btn-lg btn-secondary text-white rounded-0" style="width:10rem;" @click="saveRecord">記録</button>
      </div>
    </div>
    <!-- Old posts -->
    <div id="loader" class="text-center pt-4">
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <ul class="list-group mt-2">
      <li v-for="post in posts" :key="post.recordId" class="list-group-item rounded-0 bg-transparent">
        <p class="text-gray mb-0">{{ post.createdAt }}</p>
        <div class="text-dark text-break mb-0 u-pre-wrap">{{ post.tweet }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import API from '@aws-amplify/api';

export default {
  data () {
    return {
      newItem: {
        recordId: null,
        tweet: null,
        tweetPic: null
      },
      posts: []
    };
  },
  mounted () {
    const params = {
      body: {
        clientId: this.$cookies.get('client_id')
      }
    };

    API
      .post('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (!response.body || (response.body.length < 1)) {
          return;
        }

        this.posts = JSON.parse(response.body).Items;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        $('#loader').css('display', 'none');
      });
  },
  methods: {
    addImage () {
      if ($('#picTarget')[0].src.length > 0) {
        return;
      }
      $('#picInput').click();
    },
    picOnChange (event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const image = e.target.result;
        $('#picTarget').attr('src', image);
        $('#addImageBtn').addClass('disabled');
        $('#addImageBtn').attr('aria-disabled', true);
      }

      reader.readAsDataURL(file);
    },
    saveRecord () {
      const clientId = this.$cookies.get('client_id');
      if (!clientId) { return; }

      const now = new Date();

      const params = {
        body: {
          clientId,
          recordId: now.getTime(),
          tweet: this.newItem.tweet,
          tweetpic: this.newItem.tweetPic,
          createdAt: getNowString(now)
        }
      };

      API
        .put('BlueRoseNoteAPIs', '/RecordTweet', params)
        .then((response) => {
          const res = response;
        })
        .catch((error) => {
          console.log(error.response);
        });

      this.posts.unshift(params.body);

      this.newItem.recordId = null;
      this.newItem.tweet = null;
      this.newItem.tweetpic = null;
    }
  }
}
</script>