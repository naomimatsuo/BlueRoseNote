<template>
  <div class="row mx-0">
    <div class="card rounded-0 w-100">
      <div id="backImgDiv" class="bg-gray">
        <!-- back-img -->
        <img id="backImgTarget" :src="communityInfo.backImg" style="width:100%;height:auto" />
        <!-- self img -->
        <div class="rounded-circle bg-white container-selfpic p-1">
          <div id="selfImgDiv" class="rounded-circle bg-gray v-100 h-100 d-flex justify-content-center">
            <img id="selfImgTarget" :src="communityInfo.selfImg" />
          </div>
        </div>
        <div class="btn-join">
          <button v-if="!doesJoin" class="btn btn-secondary px-4" @click="joinCommunity">参加</button>
          <button v-if="doesJoin" class="btn btn-info px-4" @click="joinCommunity">参加済み</button>
        </div>
      </div>
      <div class="card-body">
        <!-- community info -->
        <div class="row justify-content-md-center container-inputgroup">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <!-- Name -->
            <div class="mb-2">
              <h5 class="ml-1 mb-0">{{ communityInfo.communityName }}</h5>
            </div>
            <!-- Description -->
            <div class="mb-2">
              <p class="ml-1 mb-0"><small>{{ communityInfo.description }}</small></p>
            </div>
            <!-- Category -->
            <span v-if="communityInfo.part1" class="badge badge-light">頭・顔・口</span>
            <span v-if="communityInfo.part2" class="badge badge-light">目</span>
            <span v-if="communityInfo.part3" class="badge badge-light">鼻</span>
            <span v-if="communityInfo.part4" class="badge badge-light">耳</span>
            <span v-if="communityInfo.part5" class="badge badge-light">首・のど</span>
            <span v-if="communityInfo.part6" class="badge badge-light">胸<small>（肺・心臓）</small></span>
            <span v-if="communityInfo.part7" class="badge badge-light">腹<small>（胃腸・肝臓）</small></span>
            <span v-if="communityInfo.part8" class="badge badge-light">子宮</span>
            <span v-if="communityInfo.part9" class="badge badge-light">手</span>
            <span v-if="communityInfo.part10" class="badge badge-light">足</span>
            <span v-if="communityInfo.part11" class="badge badge-light">背中・腰</span>
            <span v-if="communityInfo.part12" class="badge badge-light">腎臓・膵臓</span>
            <span v-if="communityInfo.part13" class="badge badge-light">陰部・肛門</span>
            <span v-if="communityInfo.part14" class="badge badge-light">皮膚</span>
            <span v-if="communityInfo.part15" class="badge badge-light">骨・関節</span>
            <span v-if="communityInfo.part16" class="badge badge-light">脳・脊髄</span>
            <span v-if="communityInfo.part17" class="badge badge-light">筋肉</span>
            <span v-if="communityInfo.part18" class="badge badge-light">末梢神経</span>
            <span v-if="communityInfo.part19" class="badge badge-light">血液・血管</span>
            <span v-if="communityInfo.part20" class="badge badge-light">リンパ球・節</span>
            <span v-if="communityInfo.part21" class="badge badge-light">こころ</span>
            <span v-if="communityInfo.part22" class="badge badge-light">全身</span>
            <span v-if="communityInfo.part23" class="badge badge-light">その他</span>
          </div>
        </div>
      </div>
    </div>
    <!-- new post-->
    <div class="bg-transparent py-2 w-100">
      <div class="d-flex justify-content-end my-2">
        <button v-if="doesJoin" class="btn btn-secondary rounded-pill px-4" data-toggle="modal" data-target="#newTweetModal">つぶやく</button>
      </div>
      <!-- Old Posts-->
      <ul class="list-group mt-2">
        <li v-for="post in posts" :key="post.tweetId" class="list-group-item rounded-0 bg-transparent px-2">
          <div class="d-flex">
            <div>
              <div class="rounded-circle bg-white" style="width: 4.0rem; height: 4.0rem;"></div>
            </div>
            <div class="ml-2 w-100">
              <!-- Date -->
              <div class="py-2">
                <p class="text-gray mb-0">{{ post.createdAt }}</p>
                <p class="text-gray mb-0"><strong>{{ '@' + post.userName }}</strong>&nbsp;{{ post.accountId }}</p>
              </div>
              <!-- Delete button -->
              <button type="button" class="btn btn-sm px-1 pb-0" style="position:absolute; top: 5px; right: 5px;" @click="showDeleteModal(post)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="text-dark text-break mb-0 u-pre-wrap mt-2 mx-2">{{ post.tweet }}</div>
          <div class="d-flex justify-content-center">
            <img v-if="post.tweetpic !== null" :src="post.tweetpic" class="picImg rounded" />
          </div>
          <div class="d-flex justify-content-between mt-2 mx-0">
            <button class="btn btn-light btn-sm rounded-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply" viewBox="0 0 16 16">
                <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
              </svg>
            </button>
            <button class="btn btn-light btn-sm rounded-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <itemLoader v-if="showLoader" class="pt-4" />
    </div>
    <!-- New Tweet Modal -->
    <div id="newTweetModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="d-flex justify-content-end my-2 mx-4">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body py-0">
            <textarea id="recordTweetTextArea" v-model="newItem.tweet" class="form-control overflow-hidden rounded-0" style="height:13vh;resize:none" rows="4" />
            <div id="picContainer" class="d-flex justify-content-center" style="position: relative">
              <img id="picTarget" class="rounded picImg mt-2">
              <button id="removePicBtn" type="button" class="btn btn-sm btn-secondary rounded-circle px-2 py-0" style="position:absolute; top: 20px; z-index: 10; display: none;" @click="removePic">
                <span aria-hidden="true" style="font-size:1.2rem">&times;</span>
              </button>
            </div>
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
            <button id="saveRecordBtn" type="button" class="btn btn-secondary rounded-0" style="width:10rem;" @click="saveRecord">つぶやく</button>
          </div>
        </div>
      </div>
    </div>
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
            <button id="deleteModalBtn" type="button" class="btn btn-danger" style="width:9rem" @click="deleteRecord">削除</button>
          </div>
        </div>
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
      communityInfo: {
        communityId: null,
        backImg: null,
        selfImg: null,
        communityName: null,
        description: null,
        part1: null,
        part2: null,
        part3: null,
        part4: null,
        part5: null,
        part6: null,
        part7: null,
        part8: null,
        part9: null,
        part10: null,
        part11: null,
        part12: null,
        part13: null,
        part14: null,
        part15: null,
        part16: null,
        part17: null,
        part18: null,
        part19: null,
        part20: null,
        part21: null,
        part22: null,
        part23: null
      },
      doesJoin: false,
      newItem: {
        tweetId: null,
        tweet: null
      },
      posts: [],
      showLoader: true,
      lastEvaluatedKey: null
    }
  },
  head () {
    return {
      title: 'コミュニティ'
    }
  },
  async beforeMount () {
    this.communityInfo.communityId = Number(this.$route.query.communityId);

    if (!this.communityInfo.communityId) { return; }

    const responseInfo = await API.post('BlueRoseNoteAPIs', '/CommunityMember', {
        body: {
          communityId: this.communityInfo.communityId,
          clientId: this.$cookies.get('client_id')
        }
      });

    if (responseInfo.statusCode !== 200) { return; }

    const result = JSON.parse(responseInfo.body);
    this.communityInfo = result.communityInfo.Item;
    this.doesJoin = result.doesJoin.Count > 0;
  },
  mounted () {
    const params = {
      body: {
        communityId: this.communityInfo.communityId,
        lastEvaluatedKey: null
      }
    };

    API
      .post('BlueRoseNoteAPIs', '/CommunityTweet', params)
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
          communityId: this.communityInfo.communityId,
          lastEvaluatedKey: this.lastEvaluatedKey
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/CommunityTweet', params)
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
    },
    joinCommunity () {
      const clientId = this.$cookies.get('client_id');
      if (!clientId) { return; }

      const now = new Date();

      const params = {
        body: {
          communityId: this.communityInfo.communityId,
          clientId: this.$cookies.get('client_id'),
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/CommunityMember', params)
      .then((response) => {
        if (response.statusCode === 200) {
          this.doesJoin = true;
        }
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

      reader.onload = function (e) {
        $('#picTarget').one('load', function () {
          const containerWidth = $('#picContainer').width();
          const picWidth = $('#picTarget').width();
          $('#removePicBtn').css('left', (containerWidth - picWidth) / 2.0 + 15);
          $('#removePicBtn').css('display', 'block');
        })

        const image = e.target.result;

        $('#picTarget').attr('src', image);
        $('#addImageBtn').addClass('disabled');
        $('#addImageBtn').attr('aria-disabled', true);
      }

      reader.readAsDataURL(file);
    },
    removePic () {
      $('#picTarget').attr('src', null);
      $('#removePicBtn').css('display', 'none');
    },
    saveRecord () {
      $('#saveRecordBtn').attr('disabled', 'disabled');

      const image = $('#picTarget').attr('src');
      const now = new Date();

      const params = {
        body: {
          communityId: this.communityInfo.communityId,
          tweetId: now.getTime(),
          clientId: this.$cookies.get('client_id'),
          tweet: this.newItem.tweet,
          tweetpic: (image === undefined) ? null : image,
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/CommunityTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        this.posts.unshift(params.body);

        this.newItem.tweetId = null;
        this.newItem.tweet = null;
        $('#picTarget').attr('src', null);
        $('#removePicBtn').css('display', 'none');
        $('#newTweetModal').modal('hide');
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        $('#saveRecordBtn').removeAttr('disabled');
      });
    },
    showDeleteModal (post) {
      $('#deleteModalContent').html(post.createdAt + 'の記録を削除しますか？' + '<br />' + '<small>この操作は取り消せません。</small>');
      $('#deleteModalBtn').attr('targetId', post.recordId);

      $('#deleteModal').modal('show');
    },
    deleteRecord () {

    }
  }
}
</script>

<style scoped>
.bg-gray {
  background-color: #cccccc;
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

  .btn-join {
    position:absolute;
    bottom:-3rem;
    right: 0.8rem;
  }

  .container-inputgroup {
    margin-top: 2.5rem;
  }

  .picImg  {
    max-width: 300px;
    max-height:25rem
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  #backImgDiv {
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

  .btn-join {
    position:absolute;
    bottom:-4.5rem;
    right: 0.8rem;
  }

  .container-inputgroup {
    margin-top: 4.0rem;
  }

  .picImg  {
    max-width: 460px;
    max-height:25rem
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

  .btn-join {
    position:absolute;
    bottom:-5rem;
    right: 0.8rem;
  }

  .container-inputgroup {
    margin-top: 0;
    min-height: 5rem;
  }

  .picImg  {
    max-width: 460px;
    max-height:25rem
  }
}
</style>