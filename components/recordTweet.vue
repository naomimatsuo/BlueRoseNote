<template>
  <div>
    <textarea id="recordTweetTextArea" v-model="tweet" class="form-control overflow-hidden mb-1" style="height:13vh;resize:none" rows="4" />
    <div class="d-flex justify-content-center">
      <img id="picTarget" class="rounded" :src="tweetPic" style="width:75%;height:auto" />
    </div>
    <div class="d-flex justify-content-between mt-1">
      <input id="picInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="picOnChange" />
      <button id="addImageBtn" type="button" class="btn btn-lg btn-light rounded-circle border-0 ml-1" @click="addImage">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
          <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
        </svg>
      </button>
      <button type="button" class="btn btn-lg btn-secondary text-white rounded-0" style="width:10rem;">記録</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tweet: null,
      tweetPic: null,
      picImg: null
    };
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
    async saveRecord () {

    }
  }
}
</script>