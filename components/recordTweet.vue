<template>
  <div>
    <!-- New post -->
    <div class="bg-white p-2">
      <textarea id="recordTweetTextArea" v-model="newItem.tweet" class="form-control overflow-hidden" style="height:13vh;resize:none" rows="4" maxlength="200" />
      <p class="text-right mb-1">
        <span>
          <small>{{ newItem.tweet ? newItem.tweet.length : 0 }}/200</small>
        </span>
      </p>
      <div id="picContainer" class="d-flex justify-content-center" style="position: relative">
        <img id="picTarget" class="rounded picImg" @click="showNewPicModal($event)" />
        <button id="removePicBtn" type="button" class="btn btn-sm btn-secondary rounded-circle px-2 py-0" style="position:absolute; top: 10px; z-index: 10; display: none;" @click="removePic">
          <span aria-hidden="true" style="font-size:1.2rem">&times;</span>
        </button>
      </div>
      <div class="d-flex justify-content-between mt-1">
        <input id="picInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="picOnChange" />
        <button id="addImageBtn" type="button" class="btn btn btn-light rounded-circle border-0 ml-1" @click="addImage">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
            <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
          </svg>
        </button>
        <button id="saveRecordBtn" type="button" class="btn btn-secondary text-white rounded" style="width:10rem;" @click="saveRecord">
          <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          記録
        </button>
      </div>
    </div>
    <!-- Old posts -->
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
import API from '@aws-amplify/api';
import croppie from 'croppie';

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

// function getPreviewImg (data) {
//   if (!data) { return null; }

//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   const targetWidth = $('#picContainer').width();
//   const targetHeight = targetWidth;

//   const img = new Image();
//   img.src = data;

//   const ret = img.onload = (function () {
//     const imgWidth = img.width;
//     const imgHeight = img.height;

//     if (imgWidth > imgHeight) {
//       canvas.width = targetWidth;
//       canvas.height = targetWidth * imgHeight / imgWidth;

//       ctx.drawImage(img,
//       0, 0, imgWidth, imgHeight,
//       0, 0, targetWidth, targetWidth * imgHeight / imgWidth);
//     } else {
//       canvas.width = targetWidth;
//       canvas.height = targetHeight;

//       ctx.drawImage(img,
//       0, (imgHeight - imgWidth / 2.0) / 2.0, imgWidth, imgWidth / 2.0,
//       0, 0, targetWidth, targetHeight);
//     }

//     return canvas.toDataURL("image/jpeg");
//   })();

//   return ret;
// }
export default {
  data () {
    return {
      clientId: null,
      showLoader: true,
      newItem: {
        recordId: null,
        tweet: null
      },
      posts: [],
      lastEvaluatedKey: null,
      saving: false
    };
  },
  mounted () {
    this.clientId = String(this.$cookies.get('account_id'));

    const params = {
      body: {
        clientId: this.clientId,
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

      this.showLoader = true;

      const params = {
        body: {
          clientId: this.clientId,
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
          clientId: this.clientId,
          recordId: now.getTime(),
          tweet: this.newItem.tweet ? this.newItem.tweet.substring(0, 200) : null,
          tweetpic: (image === undefined) ? null : image,
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.posts.unshift(params.body);
        this.newItem.recordId = null;
        this.newItem.tweet = null;
        $('#picTarget').attr('src', null);
        $('#removePicBtn').css('display', 'none');
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
      $('#deleteModalBtn').attr('targetId', post.recordId);

      $('#deleteModal').modal('show');
    },
    deleteRecord () {
      $('#deleteModalBtn').attr('disabled', 'disabled');
      this.saving = true;

      const recordId = $('#deleteModalBtn').attr('targetId');
      if (!recordId) { return; }

      const params = {
        body: {
          clientId: this.clientId,
          recordId: Number(recordId)
        }
      };

      API.del('BlueRoseNoteAPIs', '/RecordTweet', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        this.posts = this.posts.filter(function (post) {
          return Number(post.recordId) !== Number(recordId);
        });
      })
      .finally(() => {
        $('#deleteModalBtn').removeAttr('disabled');
        $('#deleteModal').modal('hide');
        this.saving = false;
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
    }
  }
}
</script>

<style>
@media only screen and (max-width: 767px) {
  .picImg  {
    max-width: 250px;
    max-height:25rem
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .picImg  {
    max-width: 800px;
    max-height:25rem
  }
}

@media (min-width: 1024px){
  .picImg  {
    max-width: 900px;
    max-height:25rem
  }
}
</style>