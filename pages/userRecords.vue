<template>
  <div>
    <div class="d-flex justify-content-between">
      <label id="tweet_btn" type="button" :class="{ active : showRecordTweet }" class="btn btn-lg btn-block btn-category mr-2" @click="toggleTweetComponent">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
        </svg>
      </label>
      <label id="temp_btn" type="button" :class="{ active : showRecordBodyTemp }" class="btn btn-lg btn-block btn-category mt-0 mr-2" @click="toggleTempComponent">体温</label>
      <!-- <button id="sleep_btn" type="button" class="btn bgn-lg btn-block btn-category bg-gray border border-primary rounded-0 mr-1 mt-0" @click="toggleComponent">睡眠</button> -->
      <label id="medicine_btn" type="button" :class="{ active : showRecordMedicine }" class="btn bgn-lg btn-block btn-category mt-0 mr-2" @click="toggleMedicineComponent">薬</label>
      <label id="appetite_btn" type="button" :class="{ active : showRecordAppetite }" class="btn bgn-lg btn-block btn-category mt-0" @click="toggleAppetiteComponent">食事</label>
    </div>
    <!-- new record -->
    <div class="h-100">
      <div>
        <RecordTweet v-if="showRecordTweet" />
        <RecordBodyTemp v-if="showRecordBodyTemp" />
        <!-- <RecordSleep v-if="showRecordSleep" /> -->
        <RecordMedicine v-if="showRecordMedicine" />
        <RecordAppetite v-if="showRecordAppetite" />
      </div>
    </div>
  </div>
</template>

<script>
import RecordTweet from '~/components/recordTweet'
import RecordBodyTemp from '~/components/recordBodyTemperature'
// import RecordSleep from '~/components/recordSleeping'
import RecordAppetite from '~/components/recordAppetite'
import RecordMedicine from '~/components/recordMedicine'

export default {
  components: {
    RecordTweet,
    RecordBodyTemp,
    // RecordSleep,
    RecordAppetite,
    RecordMedicine
  },
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      showRecordTweet: true,
      showRecordBodyTemp: false,
      showRecordSleep: false,
      showRecordAppetite: false,
      showRecordMedicine: false
    }
  },
  head () {
    return {
      title: '記録'
    }
  },
  methods: {
    toggleTweetComponent () {
      this.showRecordTweet = true;
      this.showRecordBodyTemp = false;
      this.showRecordMedicine = false;
      this.showRecordAppetite = false;
    },
    toggleTempComponent () {
      this.showRecordTweet = false;
      this.showRecordBodyTemp = true;
      this.showRecordMedicine = false;
      this.showRecordAppetite = false;
    },
    toggleMedicineComponent () {
      this.showRecordTweet = false;
      this.showRecordBodyTemp = false;
      this.showRecordMedicine = true;
      this.showRecordAppetite = false;
    },
    toggleAppetiteComponent () {
      this.showRecordTweet = false;
      this.showRecordBodyTemp = false;
      this.showRecordMedicine = false;
      this.showRecordAppetite = true;
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 750px) {
  .btn-category {
    font-size: 0.75rem;
    background-color: #e6e6e6;
    border-radius: .55em .55em 0 0;
    margin-bottom: 0;
  }

  .btn-category.active {
    background: #ffffff !important;
  }
}

@media screen and (min-width: 751px) {
  .btn-category {
    font-size: 1.0rem;
    background-color: #e6e6e6;
    border-radius: .55em .55em 0 0;
    margin-bottom: 0;
  }

  .btn-category.active {
    background: #ffffff !important;
  }
}

.bg-transparent:hover {
  background-color: #e6e6e6;
}
</style>