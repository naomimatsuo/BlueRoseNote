<template>
  <div class="row mx-0">
    <div class="card rounded-0 w-100">
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
              <label for="userName" class="mb-0"><small>コミュニティ名</small></label>
              <input id="userName" v-model="communityName" type="text" class="form-control" />
            </div>
            <div class="mb-2">
              <label for="description" class="mb-0"><small>説明</small></label>
              <textarea id="description" v-model="description" type="text" class="form-control" rows="5" />
            </div>
            <div class="mb-2">
              <label for="location" class="mb-0"><small>部位</small></label>
              <div class="row">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part1 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part1" type="checkbox" autocomplete="off">{{ $getCommunityCategory(1) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part2 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part2" type="checkbox" autocomplete="off">{{ $getCommunityCategory(2) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part3 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part3" type="checkbox" autocomplete="off">{{ $getCommunityCategory(3) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part4 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part4" type="checkbox" autocomplete="off">{{ $getCommunityCategory(4) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part5 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part5" type="checkbox" autocomplete="off">{{ $getCommunityCategory(5) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part6 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part6" type="checkbox" autocomplete="off">{{ $getCommunityCategory(6) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part7 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part7" type="checkbox" autocomplete="off">{{ $getCommunityCategory(7) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part8 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part8" type="checkbox" autocomplete="off">{{ $getCommunityCategory(8) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part9 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part9" type="checkbox" autocomplete="off">{{ $getCommunityCategory(9) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part10 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part10" type="checkbox" autocomplete="off">{{ $getCommunityCategory(10) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part11 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part11" type="checkbox" autocomplete="off">{{ $getCommunityCategory(11) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part12 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part12" type="checkbox" autocomplete="off">{{ $getCommunityCategory(12) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part13 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part13" type="checkbox" autocomplete="off">{{ $getCommunityCategory(13) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part14 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part14" type="checkbox" autocomplete="off">{{ $getCommunityCategory(14) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part15 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part15" type="checkbox" autocomplete="off">{{ $getCommunityCategory(15) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part16 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part16" type="checkbox" autocomplete="off">{{ $getCommunityCategory(16) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part17 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part17" type="checkbox" autocomplete="off">{{ $getCommunityCategory(17) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part18 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part18" type="checkbox" autocomplete="off">{{ $getCommunityCategory(18) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part19 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part19" type="checkbox" autocomplete="off">{{ $getCommunityCategory(19) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part20 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part20" type="checkbox" autocomplete="off">{{ $getCommunityCategory(20) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part21 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part21" type="checkbox" autocomplete="off">{{ $getCommunityCategory(21) }}
                    </label>
                  </div>
                </div>
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part22 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part22" type="checkbox" autocomplete="off">{{ $getCommunityCategory(22) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 px-2">
                  <div class="btn-group-toggle" data-toggle="buttons">
                    <label :class="{ active: part23 }" class="btn btn-outline-primary btn-block btn-part rounded-0">
                      <input v-model="part23" type="checkbox" autocomplete="off">{{ $getCommunityCategory(23) }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-end mr-0">
              <button id="saveCommuBtn" type="button" class="btn btn-secondary rounded-0 text-white px-4" @click="saveCommunity">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <div id="uploadBackImgModal" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
              <button type="button" class="close d-inline" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="d-inline">メディアを編集</h5>
            </div>
            <button type="button" class="btn btn-secondary rounded-0" @click="backImgApply">設定</button>
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
          <div class="modal-header">
            <div class="modal-title">
              <button type="button" class="close d-inline" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="d-inline">メディアを編集</h5>
            </div>
            <button type="button" class="btn btn-secondary rounded-0" @click="selfImgApply">設定</button>
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
import { API } from 'aws-amplify';
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
    return {
      communityId: null,
      communityName: null,
      description: null,
      backImg: null,
      selfImg: null,
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
    }
  },
  head () {
    return {
      title: 'コミュニティ作成'
    }
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
      $('#uploadSelfImg').croppie('result', { type: 'canvas', circle: true })
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
    saveCommunity () {
      $('#saveCommuBtn').attr('disabled', 'disabled');

      const now = new Date();

      const params = {
        body: {
          communityId: now.getTime(),
          communityName: this.communityName,
          description: this.description,
          backImg: this.backImg,
          selfImg: this.selfImg,
          part1: this.part1,
          part2: this.part2,
          part3: this.part3,
          part4: this.part4,
          part5: this.part5,
          part6: this.part6,
          part7: this.part7,
          part8: this.part8,
          part9: this.part9,
          part10: this.part10,
          part11: this.part11,
          part12: this.part12,
          part13: this.part13,
          part14: this.part14,
          part15: this.part15,
          part16: this.part16,
          part17: this.part17,
          part18: this.part18,
          part19: this.part19,
          part20: this.part20,
          part21: this.part21,
          part22: this.part22,
          part23: this.part23,
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/CommunityInfo', params)
      .then(() => {
        $('#saveRecordBtn').removeAttr('disabled');
        this.$router.push('/communities');
      });
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

  .btn-part:hover {
    color: #31444e;
    background-color: #e6e6e6;
  }
}
</style>