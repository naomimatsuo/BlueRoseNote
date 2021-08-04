<template>
  <div class="row mx-0">
    <div class="card rounded-0 w-100">
      <!-- Loader -->
      <pageLoader v-if="showLoader" />
      <div id="backImgDiv" class="bg-gray">
        <img id="backImgTarget" :src="backImg" style="width:100%;height:auto" />
        <!-- back-img -->
        <div class="d-flex justify-content-center">
          <input id="backImgInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="backImgOnChange" />
          <button type="button" onclick="$('#backImgInput').click();" class="btn btn-secondary rounded-circle" style="position:absolute;top:45%;height:40px;width:40px">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 18 18">
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
          </button>
        </div>
        <!-- self img -->
        <div class="rounded-circle bg-white container-selfpic p-1">
          <div id="selfImgDiv" class="rounded-circle bg-gray v-100 h-100 d-flex justify-content-center">
            <img id="selfImgTarget" :src="selfImg" />
            <input id="selfImgInput" type="file" accept="image/png, image/jpeg" style="display:none" @change="selfImgOnChange" />
            <button type="button" onclick="$('#selfImgInput').click();" class="btn btn-secondary rounded-circle" style="position:absolute;top:45%;height:40px;width:40px">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 18 18">
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row justify-content-md-center container-inputgroup">
          <div id="userSettings" class="col-sm-12 col-md-12 col-lg-6">
            <div class="mb-2">
              <label for="accountId" class="mb-0"><small>アカウント名</small></label>
              <p for="accountId" class="ml-1">{{ accountId }}</p>
            </div>
            <div class="mb-2">
              <label for="userName" class="mb-0"><small>ユーザー名</small></label>
              <div class="input-group">
                <input id="userName" v-model="userName" type="text" class="form-control" maxlength="30" />
                <p class="invalid-feedback">ユーザー名を入力してください。</p>
              </div>
              <p class="text-right mb-0">
                <span>
                  <small>{{ userName? userName.length : 0 }}/30</small>
                </span>
              </p>
            </div>
            <div class="mb-2">
              <label for="description" class="mb-0"><small>自己紹介</small></label>
              <textarea id="description" v-model="description" type="text" class="form-control" rows="3" maxlength="300" />
              <p class="text-right mb-0">
                <span>
                  <small>{{ description? description.length : 0 }}/300</small>
                </span>
              </p>
            </div>
            <div class="mb-2">
              <label for="location" class="mb-0"><small>場所</small></label>
              <input id="location" v-model="location" type="text" class="form-control" maxlength="100" />
              <p class="text-right mb-0">
                <span>
                  <small>{{ location? location.length : 0 }}/100</small>
                </span>
              </p>
            </div>
            <div class="mb-2">
              <label class="mb-0"><small>性別</small></label>
              <div class="row mx-1">
                <div class="form-check form-check-inline">
                  <input id="gender1" v-model="gender" class="form-check-input" type="radio" value="1" />
                  <label class="form-check-label" for="gender1">男性</label>
                </div>
                <div class="form-check form-check-inline">
                  <input id="gender2" v-model="gender" class="form-check-input" type="radio" value="2" />
                  <label class="form-check-label" for="gender2">女性</label>
                </div>
                <div class="form-check form-check-inline">
                  <input id="gender3" v-model="gender" class="form-check-input" type="radio" value="0" />
                  <label class="form-check-label" for="gender3">その他</label>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label for="userHeight" class="mb-0"><small>身長</small></label>
              <div class="input-group">
                <input id="userHeight" v-model="userHeight" type="text" class="form-control" aria-describedby="height-addon" />
                <div class="input-group-append">
                  <span id="height-addon" class="input-group-text bg-transparent">cm</span>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label for="userWeight" class="mb-0"><small>体重</small></label>
              <div class="input-group">
                <input id="userWeight" v-model="userWeight" type="text" class="form-control" aria-describedby="weight-addon" />
                <div class="input-group-append">
                  <span id="weight-addon" class="input-group-text bg-transparent">kg</span>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label class="mb-0"><small>生年月日</small></label>
              <div class="row mx-1">
                <div class="col-sm-4 col-md-3 pl-0">
                  <select v-model="birthYear" class="custom-select">
                    <option v-for="no in yearRange" :key="no" :value="no">{{ no }}年</option>
                  </select>
                </div>
                <div class="col-sm-4 col-md-3 pl-0">
                  <select v-model="birthMonth" class="custom-select">
                    <option v-for="no in 12" :key="no" :value="no">{{ no }}月</option>
                  </select>
                </div>
                <div class="col-sm-4 col-md-3 pl-0">
                  <select v-model="birthDate" class="custom-select">
                    <option v-for="no in 31" :key="no" :value="no">{{ no }}日</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row justify-content-end mr-0">
              <button id="saveProfBtn" type="button" class="btn btn-secondary rounded-0 text-white px-4" @click="updateProfile">
                <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <div id="uploadBackImgModal" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="p-2">
            <div class="row d-flex justify-content-between mx-0">
              <button type="button" class="btn btn-secondary rounded-0 d-inline" data-dismiss="modal" aria-label="Close">戻る</button>
              <h5 class="d-inline">メディアを編集</h5>
              <button type="button" class="btn btn-secondary rounded-0" @click="backImgApply">設定</button>
            </div>
          </div>
          <div class="modal-body p-0">
            <div class="d-flex justify-content-center">
              <div id="uploadBackImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="uploadSelfImgModal" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="p-2">
            <div class="row d-flex justify-content-between mx-0">
              <button type="button" class="btn btn-secondary rounded-0 d-inline" data-dismiss="modal" aria-label="Close">戻る</button>
              <div>
                <h5 class="d-inline">メディアを編集</h5>
              </div>
              <button type="button" class="btn btn-secondary rounded-0" @click="selfImgApply">設定</button>
            </div>
          </div>
          <div class="modal-body p-0">
            <div class="d-flex justify-content-center">
              <div id="uploadSelfImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API, Auth } from 'aws-amplify';
import croppie from 'croppie';

function getModalWidth () {
  const windowWidth = $(window).width();

  if (windowWidth >= 501 && windowWidth <= 1023) {
    return 498;
  }

  if (windowWidth <= 500) {
    return 342;
  }

  return 500;
};

export default {
  layout: 'user',
  middleware: 'authenticated',
  data () {
    const now = new Date();
    const nowYear = now.getFullYear();
    const fromYear = nowYear - 120;
    const yearRange = [];
    let index = 0;

    for (let year = nowYear; year >= fromYear; year--) {
      yearRange[index++] = year;
    }

    return {
      accountId: null,
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
      saving: false,
      yearRange
    };
  },
  head () {
    return {
      title: 'プロフィール'
    }
  },
  async mounted () {
    const user = await Auth.currentAuthenticatedUser();
    if (!user) { return; }

    this.accountId = user.attributes.preferred_username;
    this.clientId = String(this.$cookies.get('account_id'));

    const params = {
      body: {
        clientId: this.clientId
      }
    }

    API
      .post('BlueRoseNoteAPIs', '/UserProfile', params)
      .then((response) => {
         if (response.statusCode !== 200) { return; }

        const res = JSON.parse(response.body);
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
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.showLoader = false;
      });
  },
  methods: {
    selfImgOnChange (event) {
      $('#uploadSelfImg').croppie('destroy');
      let modalWidth = getModalWidth();
      const reader = new FileReader();

      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          if (this.width < modalWidth) {
            modalWidth = this.width;
          }

          $('#uploadSelfImg').croppie({
            viewport: { width: modalWidth - 30, height: modalWidth - 30 },
            size: { width: modalWidth - 30, height: modalWidth - 30 },
            boundary: { width: modalWidth, height: modalWidth },
            enableOrientation: true
          });

          $('#uploadSelfImg').croppie('bind', {
            url: e.target.result,
            points: [this.width / 2, -this.height / 2, this.width / 2 + modalWidth, -(this.height / 2 + modalWidth)]
          });

          $('#uploadSelfImgModal').modal('show');

          $('.cr-slider').attr({
            'min': modalWidth / this.width * 0.5000,
            'max': modalWidth / this.width * 1.5000
          });

          $('#uploadSelfImg').croppie('setZoom', (modalWidth / this.width * 0.5000 + modalWidth / this.width * 1.5000) / 2.0);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    backImgOnChange (event) {
      $('#uploadBackImg').croppie('destroy');
      let modalWidth = getModalWidth();
      const reader = new FileReader();

      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          if (this.width < modalWidth) {
            modalWidth = this.width;
          }

          $('#uploadBackImg').croppie({
            viewport: { width: modalWidth - 30, height: (modalWidth - 30) * 0.27 },
            size: { width: modalWidth - 30, height: modalWidth - 30 },
            boundary: { width: modalWidth, height: modalWidth },
            enableOrientation: true
          });

          $('#uploadBackImg').croppie('bind', {
            url: e.target.result,
            points: [this.width / 2, -this.height / 2, this.width / 2 + modalWidth, -(this.height / 2 + modalWidth)]
          });

          $('#uploadBackImgModal').modal('show');

          $('.cr-slider').attr({
            'min': modalWidth / this.width * 0.5000,
            'max': modalWidth / this.width * 1.5000
          });

          $('#uploadBackImg').croppie('setZoom', (modalWidth / this.width * 0.5000 + modalWidth / this.width * 1.5000) / 2.0);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    selfImgApply () {
      $('#uploadSelfImg').croppie('result', { type: 'canvas', circle: true, quality: 0.83 })
      .then((result) => {
        this.selfImg = result;
        $('#selfImgTarget').attr('src', result);
      })
      .finally(() => {
        $('#uploadSelfImgModal').modal('hide');
      });
    },
    backImgApply () {
      $('#uploadBackImg').croppie('result', { type: 'canvas', format: 'jpeg', quality: 0.85 })
      .then((result) => {
        this.backImg = result;
        $('#backImgTarget').attr('src', result);
      })
      .finally(() => {
        $('#uploadBackImgModal').modal('hide');
      });
    },
    updateProfile () {
      if (!this.userName) {
        $('#userName').addClass('is-invalid');
        return;
      }

      $('#userName').removeClass('is-invalid');
      $('#saveProfBtn').attr('disabled', 'disabled');
      this.saving = true;

      const params = {
        body: {
          clientId: this.clientId,
          accountId: this.accountId,
          userName: this.userName.substring(0, 30),
          description: this.description ? this.description.substring(0, 300) : null,
          location: this.location ? this.location.substring(0, 100) : null,
          gender: this.gender,
          userHeight: this.userHeight ? Number.parseFloat(this.userHeight).toFixed(1) : null,
          userWeight: this.userWeight ? Number.parseFloat(this.userWeight).toFixed(1) : null,
          birthYear: this.birthYear,
          birthMonth: this.birthMonth,
          birthDate: this.birthDate,
          backImg: this.backImg,
          selfImg: this.selfImg,
          updatedAt: this.$getNowString(new Date())
        }
      };

      API.put('BlueRoseNoteAPIs', '/UserProfile', params)
      .then((response) => {
        $('#saveProfBtn').removeAttr('disabled');
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
    margin-top: 2.5rem;
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

  .container-inputgroup {
    margin-top: 4.0rem;
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
    margin-top: 0;
  }

  .container-loader {
    position: absolute;
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
}
</style>