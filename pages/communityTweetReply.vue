<template>
  <div>
    <div class="card w-100">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="row mx-0">
            <NuxtLink to="/communityTweet" tag="button" class="btn btn-light rounded-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>
            </NuxtLink>
          </div>
        </li>
        <!-- Reply target -->
        <li class="list-group-item">
          <div class="d-flex">
            <!-- Self pic -->
            <div class="rounded-circle bg-gray d-flex justify-content-center" style="width: 4.0rem; height: 4.0rem;cursor:pointer;" @click="gotoProfile(post)">
              <img :src="targetTweet.selfImg" />
            </div>
            <div class="ml-2 w-100">
              <!-- Date -->
              <div class="py-2">
                <p class="text-gray mb-0">{{ targetTweet.createdAt }}</p>
                <p class="text-gray mb-0" style="cursor:pointer;" @click="gotoProfile(post)"><strong>{{ targetTweet.userName }}</strong>&nbsp;{{ '@' + targetTweet.accountId }}</p>
              </div>
            </div>
          </div>
          <!-- Tweet content -->
          <div class="text-dark text-break mb-0 u-pre-wrap mt-2 mx-2">{{ targetTweet.tweet }}</div>
          <!-- Tweet Image -->
          <div class="d-flex justify-content-center">
            <img v-if="targetTweet.tweetpic !== null" :src="targetTweet.tweetpic" class="picImg rounded" />
          </div>
        </li>
        <!-- New post -->
        <li class="list-group-item">
          <textarea id="recordTweetTextArea" v-model="newItem.tweet" class="form-control overflow-hidden rounded-0" style="height:13vh;resize:none" rows="4" maxlength="200" />
          <p class="text-right mb-0">
            <span>
              <small>{{ newItem.tweet ? newItem.tweet.length : 0 }}/200</small>
            </span>
          </p>
          <div id="picContainer" class="d-flex justify-content-center" style="position: relative">
            <img id="picTarget" class="rounded picImg mt-2" @click="showNewPicModal($event)">
            <button id="removePicBtn" type="button" class="btn btn-sm btn-secondary rounded-circle px-2 py-0" style="position:absolute; top: 20px; z-index: 10; display: none;" @click="removePic">
              <span aria-hidden="true" style="font-size:1.2rem">&times;</span>
            </button>
          </div>
          <div class="d-flex justify-content-between my-2 mx-4">
            <div>
              <input id="picInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="picOnChange" />
              <button id="addImageBtn" type="button" class="btn btn-lg btn-light rounded-circle border-0 ml-1" @click="addImage">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
                  <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
                </svg>
              </button>
            </div>
            <button id="saveRecordBtn" type="button" class="btn btn-secondary rounded" style="width:10rem;" @click="saveRecord">
              <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              つぶやく
            </button>
          </div>
        </li>
      </ul>
    </div>
    <!-- Old Posts-->
    <ul class="list-group mt-2">
      <li v-for="post in posts" :key="post.tweetId" class="list-group-item rounded-0 bg-transparent px-2">
        <div class="d-flex">
          <!-- Self pic -->
          <div class="rounded-circle bg-gray d-flex justify-content-center" style="width: 4.0rem; height: 4.0rem;cursor:pointer;" @click="gotoProfile(post)">
            <img :src="post.clientInfo.selfImg" />
          </div>
          <div class="ml-2 w-100">
            <!-- Date -->
            <div class="py-2">
              <p class="text-gray mb-0">{{ post.createdAt }}</p>
              <p class="text-gray mb-0" style="cursor:pointer;" @click="gotoProfile(post)"><strong>{{ post.clientInfo.userName }}</strong>&nbsp;{{ '@' + post.clientInfo.accountId }}</p>
            </div>
            <!-- Delete button -->
            <button v-if="post.isMyTweet" type="button" class="btn btn-sm px-1 pb-0" style="position:absolute; top: 5px; right: 5px;" @click="showDeleteModal(post)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
          </div>
        </div>
        <!-- Tweet content -->
        <div class="text-dark text-break mb-0 u-pre-wrap mt-2 mx-2">{{ post.tweet }}</div>
        <!-- Tweet Image -->
        <div class="d-flex justify-content-center">
          <img v-if="post.tweetpic !== null" :src="post.tweetpic" class="picImg rounded" @click="showPicModal(post.tweetpic)" />
        </div>
        <div class="d-flex justify-content-between mt-2 mx-0">
          <!-- Reply button -->
          <div>
            <button class="btn btn-light btn-sm rounded-circle ml-1" @click="toReply(post)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply" viewBox="0 0 16 16">
                <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
              </svg>
            </button>
            <span v-if="post.replys.num > 0" class="text-primary ml-1">{{ post.replys.num }}</span>
          </div>
          <!-- Like buttons -->
          <div class="mr-1">
            <button v-if="!post.likes.myfavarite" name="notLikeBtn" class="btn btn-light btn-sm rounded-circle" @click="likeThis($event, post)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
              </svg>
            </button>
            <button v-if="post.likes.myfavarite" name="likeBtn" class="btn btn-secondary btn-sm rounded-circle text-primary" @click="nomoreLikeThis($event, post)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
            </button>
            <span v-if="post.likes.num > 0" class="text-primary ml-1">{{ post.likes.num }}</span>
          </div>
        </div>
      </li>
    </ul>
    <itemLoader v-if="showLoader" class="pt-4" />
    <!-- Delete Modal -->
    <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteModalTitle" class="modal-title">記録を削除しますか？</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p id="deleteModalContent" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal" style="width:9rem">キャンセル</button>
            <button id="deleteModalBtn" type="button" class="btn btn-danger" style="width:9rem" @click="deleteRecord">
              <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Original pic Modal -->
    <div id="picModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="picModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <button id="hiddenPicModalBtn" type="button" class="btn btn-sm btn-secondary rounded-circle px-2 py-0" data-dismiss="modal" aria-label="Close" style="position:absolute; top: 10px; left: 10px; z-index: 10;">
            <span aria-hidden="true" style="font-size:1.2rem">&times;</span>
          </button>
          <img />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';

function base64toBlob (base64) {
  const bin = atob(base64.replace(/^.*,/, ''));
  const buffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  try {
    const blob = new Blob([buffer.buffer], {
      type: 'image/jpeg'
    });

    return blob;
  } catch (e) {
    return false;
  }
}

export default {
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      clientId: null,
      communityId: null,
      targetTweet: {
        accountId: null,
        userName: null,
        selfImg: null,
        createdAt: null,
        tweet: null,
        tweetId: null,
        tweetpic: null
      },
      newItem: {
        tweetId: null,
        tweet: null
      },
      posts: [],
      showLoader: true,
      saving: false,
      lastEvaluatedKey: null
    }
  },
  head () {
    return {
      title: 'コミュニティ'
    }
  },
  mounted () {
    this.clientId = String(this.$cookies.get('account_id'));

    const target = JSON.parse(localStorage.getItem('targetTweet'));
    this.communityId = target.communityId;
    this.targetTweet.accountId = target.clientInfo.accountId;
    this.targetTweet.userName = target.clientInfo.userName;
    this.targetTweet.selfImg = target.clientInfo.selfImg;
    this.targetTweet.createdAt = target.createdAt;
    this.targetTweet.tweet = target.tweet;
    this.targetTweet.tweetId = target.tweetId;
    this.targetTweet.tweetpic = target.tweetpic;

    const params = {
      body: {
        communityId: this.communityId,
        replyToTweetId: this.targetTweet.tweetId,
        requestClientId: this.clientId,
        lastEvaluatedKey: null
      }
    };

    API
      .post('BlueRoseNoteAPIs', '/CommunityTweetReply', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const result = JSON.parse(response.body);
        this.posts.push(...result);
        this.lastEvaluatedKey = result.LastEvaluatedKey;
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

      this.showLoader = true;

      const params = {
        body: {
          communityId: this.communityId,
          replyToTweetId: this.targetTweet.tweetId,
          requestClientId: this.clientId,
          lastEvaluatedKey: this.lastEvaluatedKey
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/CommunityTweetReply', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const result = JSON.parse(response.body);
        this.posts.push(...result);
        this.lastEvaluatedKey = result.LastEvaluatedKey;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.showLoader = false;
      });
    },
    getNewPost () {
      if (this.showLoader) { return; }

      this.showLoader = true;

      const params = {
        body: {
          communityId: this.communityId,
          replyToTweetId: this.targetTweet.tweetId,
          requestClientId: this.clientId,
          lastEvaluatedKey: null
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/CommunityTweetReply', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const result = JSON.parse(response.body);

        const ids = this.posts.map(function (item) { return item.tweetId; });

        const filterdList = result.filter(function (item) {
          return !ids.includes(item.tweetId);
        });

        this.posts.unshift(...filterdList);
        this.lastEvaluatedKey = result.LastEvaluatedKey;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.showLoader = false;
      });
    },
    addImage () {
      if ($('#picTarget')[0].src.length > 0) {
        return;
      }
      $('#picInput').click();
    },
    picOnChange (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      const fileSize = file.size;
      reader.readAsDataURL(file);

      reader.onload = function (e) {
        const img = new Image();

        img.onload = function () {
          const imgWidth = this.width;
          const imgHeight = this.height;

          $('#picTarget').one('load', function () {
            const containerWidth = $('#picContainer').width();
            const picWidth = $('#picTarget').width();
            $('#removePicBtn').css('left', (containerWidth - picWidth) / 2.0 + 15);
            $('#removePicBtn').css('display', 'block');
          });

          if (fileSize > 300000) {
            const canvas = document.createElement('canvas');
            canvas.width = Math.sqrt(300000 / fileSize) * imgWidth;
            canvas.height = Math.sqrt(300000 / fileSize) * imgHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

            const blob = base64toBlob(canvas.toDataURL("image/jpeg"));
            $('#picTarget').attr('src', canvas.toDataURL("image/jpeg", 300000 / blob.size));
          } else {
            $('#picTarget').attr('src', img.src);
          }

          $('#addImageBtn').addClass('disabled');
          $('#addImageBtn').attr('aria-disabled', true);
        };

        img.src = e.target.result;
      };
    },
    removePic () {
      $('#picTarget').attr('src', null);
      $('#removePicBtn').css('display', 'none');
    },
    saveRecord () {
      const image = $('#picTarget').attr('src');
      if (!this.newItem.tweet && !image) { return; }

      $('#saveRecordBtn').attr('disabled', 'disabled');
      this.saving = true;

      const now = new Date();

      const params = {
        body: {
          communityRepId: this.communityId + "_" + this.targetTweet.tweetId,
          communityId: this.communityId,
          repTweetId: this.targetTweet.tweetId,
          tweetId: now.getTime(),
          clientId: this.clientId,
          tweet: this.newItem.tweet ? this.newItem.tweet.substring(0, 200) : null,
          tweetpic: !image ? null : image,
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/CommunityTweetReply', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.newItem.tweetId = null;
        this.newItem.tweet = null;
        $('#picTarget').attr('src', null);
        $('#removePicBtn').css('display', 'none');
        $('#newTweetModal').modal('hide');

        this.getNewPost();
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        $('#saveRecordBtn').removeAttr('disabled');
        this.saving = false;
      });
    },
    showDeleteModal (post) {
      $('#deleteModalContent').html(post.createdAt + 'の記録を削除しますか？' + '<br />' + '<small>この操作は取り消せません。</small>');
      $('#deleteModalBtn').attr('targetId', post.tweetId);

      $('#deleteModal').modal('show');
    },
    deleteRecord () {
      const tweetId = $('#deleteModalBtn').attr('targetId');
      if (!tweetId) { return; }

      $('#deleteModalBtn').attr('disabled', 'disabled');

      const params = {
        body: {
          communityRepId: this.communityId + '_' + this.targetTweet.tweetId,
          tweetId: Number(tweetId)
        }
      };

      API.del('BlueRoseNoteAPIs', '/CommunityTweetReply', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        this.posts = this.posts.filter(function (post) {
          return Number(post.tweetId) !== Number(tweetId);
        });
      })
      .finally(() => {
        $('#deleteModalBtn').removeAttr('disabled');
        $('#deleteModal').modal('hide');
      });
    },
    likeThis (event, post) {
      const targetBtn = $(event.currentTarget);
      $(targetBtn).attr('disabled', 'disabled');

      const now = new Date();

      const params = {
        body: {
          communityId: this.communityId,
          repTweetId: this.targetTweet.tweetId + "_" + post.tweetId,
          clientId: this.clientId,
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/CommunityTweetLike', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        post.likes.myfavarite = true;
        post.likes.num += 1;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        $(targetBtn).removeAttr('disabled');
      });
    },
    nomoreLikeThis (event, post) {
      const targetBtn = $(event.currentTarget);
      $(targetBtn).attr('disabled', 'disabled');

      const params = {
        body: {
          communityId: this.communityId,
          repTweetId: this.targetTweet.tweetId + "_" + post.tweetId
        }
      };

      API.del('BlueRoseNoteAPIs', '/CommunityTweetLike', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        post.likes.myfavarite = false;
        post.likes.num -= 1;
      })
      .finally(() => {
        $(targetBtn).removeAttr('disabled');
      });
    },
    showPicModal (target) {
      if (!target) { return; }

      $('#picModal').find('img').attr('src', target);
      $('#picModal').modal('show');
    },
    showNewPicModal (event) {
      if (!event) { return; }

      const img = $(event.target).attr('src');
      $('#picModal').find('img').attr('src', img);
      $('#picModal').modal('show');
    },
    toReply (target) {
      localStorage.setItem('targetTweet', JSON.stringify(target));
      this.$router.go();
    },
    gotoProfile (target) {
      localStorage.setItem('targetProfile', JSON.stringify(target.clientInfo.accountId));
      this.$router.push('/previewProfile');
    }
  }
}
</script>

<style>
@media only screen and (max-width: 767px) {
  .picImg  {
    max-width: 300px;
    max-height:25rem
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .picImg  {
    max-width: 460px;
    max-height:25rem
  }
}

@media (min-width: 1024px){
  .picImg  {
    max-width: 460px;
    max-height:25rem
  }
}
</style>