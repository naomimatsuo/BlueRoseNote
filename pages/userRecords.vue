<template>
  <div>
    <div class="d-flex justify-content-end mb-2">
      <button class="btn btn-primary btn-sm px-3">
        <span class="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 20 20">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
          </svg>
        </span>
        閲覧者の追加
      </button>
    </div>
    <div class="mb-2 d-flex justify-content-between">
      <button id="tweet_btn" type="button" class="btn btn-lg btn-block btn-category bg-gray border border-primary text-primary rounded-0 mr-1" @click="toggleComponent">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>
      <button id="temp_btn" type="button" class="btn btn-lg btn-block btn-category bg-gray border border-primary rounded-0 mr-1 mt-0" @click="toggleComponent">体温</button>
      <button id="sleep_btn" type="button" class="btn bgn-lg btn-block btn-category bg-gray border border-primary rounded-0 mr-1 mt-0" @click="toggleComponent">睡眠</button>
      <button id="appetite_btn" type="button" class="btn bgn-lg btn-block btn-category bg-gray border border-primary rounded-0 mr-1 mt-0" @click="toggleComponent">食欲</button>
      <button id="medicine_btn" type="button" class="btn bgn-lg btn-block btn-category bg-gray border border-primary rounded-0 mt-0" @click="toggleComponent">薬</button>
    </div>
    <!-- new record -->
    <div class="bg-white h-100 p-2">
      <div>
        <RecordTweet v-if="showRecordTweet" />
        <RecordBodyTemp v-if="showRecordBodyTemp" />
        <RecordSleep v-if="showRecordSleep" />
        <RecordAppetite v-if="showRecordAppetite" />
        <RecordMedicine v-if="showRecordMedicine" />
      </div>
    </div>
  </div>
</template>

<script>
import RecordTweet from '~/components/recordTweet'
import RecordBodyTemp from '~/components/recordBodyTemperature'
import RecordSleep from '~/components/recordSleeping'
import RecordAppetite from '~/components/recordAppetite'
import RecordMedicine from '~/components/recordMedicine'

export default {
  components: {
    RecordTweet,
    RecordBodyTemp,
    RecordSleep,
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
    toggleComponent (event) {
      this.showRecordTweet = false;
      this.showRecordBodyTemp = false;
      this.showRecordSleep = false;
      this.showRecordAppetite = false;
      this.showRecordMedicine = false;

      if (event.target.id === 'tweet_btn') {
        this.showRecordTweet = true;
        return;
      }
      if (event.target.id === 'temp_btn') {
        this.showRecordBodyTemp = true;
        return;
      }
      if (event.target.id === 'sleep_btn') {
        this.showRecordSleep = true;
        return;
      }
      if (event.target.id === 'appetite_btn') {
        this.showRecordAppetite = true;
        return;
      }

      this.showRecordMedicine = true;
    },
    toggleRecordBodyTemp () {
      this.showComponentTwo = !this.showComponentTwo;
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 750px) {
  .btn-category {
    font-size: 0.75rem;
    background-color: transparent;
  }
}

@media screen and (min-width: 751px) {
  .btn-category {
    font-size: 1.0rem;
    background-color: transparent;
  }
}

.bg-gray {
  background-color: transparent;
}

.bg-gray:hover {
  background-color: #e6e6e6;
}
</style>