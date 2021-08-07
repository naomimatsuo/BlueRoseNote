<template>
  <div>
    <div class="card rounded-0">
      <pageLoader v-if="showLoader" />
      <!-- profile back image -->
      <div id="backImgDiv" class="bg-gray">
        <img id="backImgTarget" :src="backImg" style="width:100%;height:auto" />
        <div class="rounded-circle bg-white container-selfpic p-1">
          <!-- profile image -->
          <div class="rounded-circle bg-gray v-100 h-100 d-flex justify-content-center">
            <img id="selfImgTarget" :src="selfImg" />
          </div>
        </div>
      </div>
      <div v-if="!isYourself" style="position:relative;">
        <div class="mt-2 mr-3 mb-n5 d-flex justify-content-end">
          <button v-if="reviewStatus === null" class="btn btn-outline-secondary" @click="addReviewerApplication(0, $event)">
            <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            記録閲覧を申請
          </button>
          <button v-if="reviewStatus === 0" class="btn btn-outline-warning">閲覧承認待ち</button>
          <button v-if="reviewStatus === 1" class="btn btn-outline-danger" @click="addReviewerApplication(2, $event)">
            <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            閲覧取り消し
          </button>
        </div>
      </div>
      <div class="container-inputgroup mb-2">
        <div class="ml-3">
          <p class="font-weight-bold mb-0">{{ userName }}
            <span v-if="accountId" class="text-muted ml-1"><small>{{ '@' + accountId }}</small></span>
          </p>
          <p class="mt-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </span>
            <small>{{ location }}</small>
            <span v-if="gender == 1" class="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flower2" viewBox="0 0 16 16">
                <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4zm3-12c0 .073-.01.155-.03.247-.544.241-1.091.638-1.598 1.084A2.987 2.987 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1.117 1.117 0 0 1 5 4a3 3 0 0 1 6 0zm-.812 6.052A2.99 2.99 0 0 0 11 8a2.99 2.99 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a6.833 6.833 0 0 1-.647-.487zm-3.56.617a3.001 3.001 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084.02.091.03.174.03.247a3 3 0 1 1-6 0c0-.073.01-.155.03-.247.544-.242 1.091-.638 1.598-1.084zm-.816-4.721A2.99 2.99 0 0 0 5 8c0 .794.308 1.516.812 2.052a6.83 6.83 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <small>男性</small>
            </span>
            <span v-if="gender == 2" class="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flower1" viewBox="0 0 16 16">
                <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
              <small>女性</small>
            </span>
            <span v-if="gender == 3" class="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flower3" viewBox="0 0 16 16">
                <path d="M11.424 8c.437-.052.811-.136 1.04-.268a2 2 0 0 0-2-3.464c-.229.132-.489.414-.752.767C9.886 4.63 10 4.264 10 4a2 2 0 1 0-4 0c0 .264.114.63.288 1.035-.263-.353-.523-.635-.752-.767a2 2 0 0 0-2 3.464c.229.132.603.216 1.04.268-.437.052-.811.136-1.04.268a2 2 0 1 0 2 3.464c.229-.132.489-.414.752-.767C6.114 11.37 6 11.736 6 12a2 2 0 1 0 4 0c0-.264-.114-.63-.288-1.035.263.353.523.635.752.767a2 2 0 1 0 2-3.464c-.229-.132-.603-.216-1.04-.268zM9 4a1.468 1.468 0 0 1-.045.205c-.039.132-.1.295-.183.484a12.88 12.88 0 0 1-.637 1.223L8 6.142a21.73 21.73 0 0 1-.135-.23 12.88 12.88 0 0 1-.637-1.223 4.216 4.216 0 0 1-.183-.484A1.473 1.473 0 0 1 7 4a1 1 0 1 1 2 0zM3.67 5.5a1 1 0 0 1 1.366-.366 1.472 1.472 0 0 1 .156.142c.094.1.204.233.326.4.245.333.502.747.742 1.163l.13.232a21.86 21.86 0 0 1-.265.002 12.88 12.88 0 0 1-1.379-.06 4.214 4.214 0 0 1-.51-.083 1.47 1.47 0 0 1-.2-.064A1 1 0 0 1 3.67 5.5zm1.366 5.366a1 1 0 0 1-1-1.732c.001 0 .016-.008.047-.02.037-.013.087-.028.153-.044.134-.032.305-.06.51-.083a12.88 12.88 0 0 1 1.379-.06c.09 0 .178 0 .266.002a21.82 21.82 0 0 1-.131.232c-.24.416-.497.83-.742 1.163a4.1 4.1 0 0 1-.327.4 1.483 1.483 0 0 1-.155.142zM9 12a1 1 0 0 1-2 0 1.476 1.476 0 0 1 .045-.206c.039-.131.1-.294.183-.483.166-.378.396-.808.637-1.223L8 9.858l.135.23c.241.415.47.845.637 1.223.083.19.144.352.183.484A1.338 1.338 0 0 1 9 12zm3.33-6.5a1 1 0 0 1-.366 1.366 1.478 1.478 0 0 1-.2.064c-.134.032-.305.06-.51.083-.412.045-.898.061-1.379.06-.09 0-.178 0-.266-.002l.131-.232c.24-.416.497-.83.742-1.163a4.1 4.1 0 0 1 .327-.4c.046-.05.085-.086.114-.11.026-.022.04-.03.041-.032a1 1 0 0 1 1.366.366zm-1.366 5.366a1.494 1.494 0 0 1-.155-.141 4.225 4.225 0 0 1-.327-.4A12.88 12.88 0 0 1 9.74 9.16a22 22 0 0 1-.13-.232l.265-.002c.48-.001.967.015 1.379.06.205.023.376.051.51.083.066.016.116.031.153.044l.048.02a1 1 0 1 1-1 1.732zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <small>その他</small>
            </span>
          </p>
          <p v-if="userHeight || userWeight">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
            <span v-if="userHeight">
              <small>{{ userHeight }}cm</small>
            </span>
            <span v-if="userWeight" class="mr-2">
              <small>{{ userWeight }}kg</small>
            </span>
            <span v-if="birthYear || birthMonth || birthDate" class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
              </svg>
              <small v-if="birthYear">{{ birthYear }}年</small>
              <small v-if="birthMonth">{{ birthMonth }}月</small>
              <small v-if="birthDate">{{ birthDate }}日</small>
            </span>
          </p>
          <div class="text-break u-pre-wrap">{{ description }}</div>
        </div>
      </div>
    </div>
    <div class="mt-2 mb-2 d-flex justify-content-between">
      <button v-if="reviewTweet" id="tweet_btn" type="button" class="btn btn-lg btn-block btn-category bg-transparent border border-primary text-primary rounded-0 mr-1" @click="toggleTweetComponent">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>
      <button v-if="reviewTemperature" id="temp_btn" type="button" class="btn btn-lg btn-block btn-category bg-transparent border border-primary rounded-0 mr-1 mt-0" @click="toggleTempComponent">体温</button>
      <button v-if="reviewMedicine" id="medicine_btn" type="button" class="btn btn-lg btn-block btn-category bg-transparent border border-primary rounded-0 mr-1 mt-0" @click="toggleMedicineComponent">薬</button>
      <button v-if="reviewAppetite" id="appetite_btn" type="button" class="btn btn-lg btn-block btn-category bg-transparent border border-primary rounded-0 mt-0" @click="toggleAppetiteComponent">食事</button>
    </div>
    <div class="w-100 h-100">
      <div>
        <RecordTweet v-if="showRecordTweet" :clientid="clientId" />
        <RecordBodyTemp v-if="showRecordBodyTemp" :clientid="clientId" />
        <RecordMedicine v-if="showRecordMedicine" :clientid="clientId" />
        <RecordAppetite v-if="showRecordAppetite" :clientid="clientId" />
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';

import RecordTweet from '~/components/reviewTweet'
import RecordBodyTemp from '~/components/reviewBodyTemperature'
import RecordAppetite from '~/components/reviewAppetite'
import RecordMedicine from '~/components/reviewMedicine'

export default {
  components: {
    RecordTweet,
    RecordBodyTemp,
    RecordAppetite,
    RecordMedicine
  },
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      isYourself: true,
      accountId: null,
      clientId: null,
      userName: null,
      description: null,
      location: null,
      gender: null,
      userHeight: null,
      userWeight: null,
      birthYear: null,
      birthMonth: null,
      birthDate: null,
      backImg: null,
      selfImg: null,
      showLoader: true,
      reviewStatus: null,
      reviewTweet: false,
      reviewTemperature: false,
      reviewMedicine: false,
      reviewAppetite: false,
      showRecordTweet: false,
      showRecordBodyTemp: false,
      showRecordSleep: false,
      showRecordAppetite: false,
      showRecordMedicine: false,
      saving: false
    }
  },
  head () {
    return {
      title: 'ユーザプロフィール'
    }
  },
  async mounted () {
    this.accountId = JSON.parse(localStorage.getItem('targetProfile'));
    if (!this.accountId) { return; }

    const params = {
      body: {
        accountId: this.accountId
      }
    }

    const response = await API.post('BlueRoseNoteAPIs', '/UserProfile', params);
    if (response.statusCode !== 200) { return; }

    const res = JSON.parse(response.body);
    this.clientId = res.clientId;
    this.userName = res.userName;
    this.description = res.description;
    this.location = res.location;
    this.gender = res.gender;
    this.userHeight = res.userHeight;
    this.userWeight = res.userWeight;
    this.birthYear = res.birthYear;
    this.birthMonth = res.birthMonth;
    this.birthDate = res.birthDate;
    this.backImg = res.backImg;
    this.selfImg = res.selfImg;

    this.isYourself = this.clientId === String(this.$cookies.get('account_id'));

    const anotherParams = {
      body: {
        target: 'reviewer',
        params: {
          TableName: 'Reviewer',
          FilterExpression: 'targetId = :tId and reviewerId = :rId',
          ExpressionAttributeValues: { ":tId": this.clientId, ":rId": String(this.$cookies.get('account_id')) }
        }
      }
    };

    API.post('BlueRoseNoteAPIs', '/Reviewer', anotherParams)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const ret = JSON.parse(response.body).Items;
        if (ret && (ret.length > 0)) {
          this.reviewStatus = ret[0].reviewStatus;
          this.reviewAppetite = ret[0].appetite;
          this.reviewTweet = ret[0].tweet;
          if (this.reviewTweet) {
            this.showRecordTweet = true;
          }
          this.reviewTemperature = ret[0].temperature;
          if (!this.reviewTweet && this.reviewTemperature) {
            this.showRecordBodyTemp = true;
          }
          this.reviewMedicine = ret[0].medicine;
          if (!this.reviewTweet && !this.reviewTemperature && this.reviewMedicine) {
            this.showRecordMedicine = true;
          }
          if (!this.reviewTweet && !this.reviewTemperature && !this.reviewMedicine && this.reviewAppetite) {
            this.showRecordAppetite = true;
          }
        }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.showLoader = false;
        });
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
    },
    addReviewerApplication (statusNo, event) {
      $(event.target).css('disabled', 'disabled');
      this.saving = true;

      const now = new Date();

      const params = {
        body: {
          targetId: this.clientId,
          reviewerId: String(this.$cookies.get('account_id')),
          reviewStatus: statusNo,
          updatedAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/Reviewer', params)
      .then((response) => {
        if (response.statusCode === 200) {
          this.reviewStatus = statusNo;
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        $(event.target).removeAttr('disabled');
        this.saving = false;
      });
    }
  }
}
</script>

<style scoped>
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

  .container-inputgroup {
    margin-top: 3.0rem;
  }

  .btn-category {
    font-size: 0.75rem;
    background-color: transparent;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  #backImgDiv {
    width: 100%;
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

  .container-inputgroup {
    margin-top: 4.5rem;
  }

  .btn-category {
    font-size: 1.0rem;
    background-color: transparent;
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

  .container-inputgroup {
    margin-top: 5.0rem;
  }

  .container-loader {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .bg-loader {
    position: absolute;
    top: 45%;
    z-index: 100;
  }

  .btn-category {
    font-size: 1.0rem;
    background-color: transparent;
  }
}
</style>