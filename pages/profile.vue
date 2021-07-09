<template>
  <div class="row mx-0">
    <div class="card rounded-0 w-100">
      <div id="backImgDiv" class="bg-gray">
        <img id="backImgImg" style="width:100%;height:100%" />
        <!-- back-img -->
        <div class="d-flex justify-content-center">
          <input id="backImg" type="file" accept="image/png, image/jpeg" style="visibility:hidden" @change="backImgOnChange" />
          <button type="button" onclick="$('#backImg').click();" class="btn btn-secondary rounded-circle" style="position:absolute;top:45%">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 18 18">
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
          </button>
        </div>
        <!-- self img -->
        <div class="rounded-circle bg-white container-selfpic p-1">
          <div id="selfImgDiv" class="rounded-circle bg-gray v-100 h-100 d-flex justify-content-center">
            <img id="selfImgImg" />
            <input id="selfImg" type="file" accept="image/png, image/jpeg" style="visibility:hidden" @change="selfImgOnChange" />
            <button type="button" onclick="$('#selfImg').click();" class="btn btn-secondary rounded-circle" style="position:absolute;top:43%">
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
              <label for="userName" class="mb-0"><small>名前</small></label>
              <input id="userName" v-model="userName" type="text" class="form-control" />
            </div>
            <div class="mb-2">
              <label for="selfInfo" class="mb-0"><small>自己紹介</small></label>
              <textarea id="selfInfo" v-model="selfInfo" type="text" class="form-control" rows="3" />
            </div>
            <div class="mb-2">
              <label for="homeplace" class="mb-0"><small>場所</small></label>
              <input id="homeplace" v-model="homeplace" type="text" class="form-control" />
            </div>
            <div class="mb-2">
              <label for="homeplace" class="mb-0"><small>性別</small></label>
              <div class="row mx-1">
                <div class="form-check form-check-inline">
                  <input id="sex1" class="form-check-input" type="radio" name="sexOptions" value="0" />
                  <label class="form-check-label" for="sex1">男性</label>
                </div>
                <div class="form-check form-check-inline">
                  <input id="sex2" class="form-check-input" type="radio" name="sexOptions" value="1" />
                  <label class="form-check-label" for="sex2">女性</label>
                </div>
                <div class="form-check form-check-inline">
                  <input id="sex3" class="form-check-input" type="radio" name="sexOptions" value="2" />
                  <label class="form-check-label" for="sex3">その他</label>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label for="userHeight" class="mb-0"><small>身長</small></label>
              <div class="input-group">
                <input id="userHeight" type="text" class="form-control" aria-describedby="height-addon" />
                <div class="input-group-append">
                  <span id="height-addon" class="input-group-text bg-transparent">cm</span>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label for="userWeight" class="mb-0"><small>体重</small></label>
              <div class="input-group">
                <input id="userWeight" type="text" class="form-control" aria-describedby="weight-addon" />
                <div class="input-group-append">
                  <span id="weight-addon" class="input-group-text bg-transparent">kg</span>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label class="mb-0"><small>生年月日</small></label>
              <div class="row mx-1">
                <div class="col-sm-4 col-md-3 pl-0">
                  <select class="custom-select">
                    <option v-for="no in yearRange" :key="no" :value="no">{{ no }}年</option>
                  </select>
                </div>
                <div class="col-sm-4 col-md-3 pl-0">
                  <select class="custom-select">
                    <option v-for="no in 12" :key="no" :value="no">{{ no }}月</option>
                  </select>
                </div>
                <div class="col-sm-4 col-md-3 pl-0">
                  <select class="custom-select">
                    <option v-for="no in 31" :key="no" :value="no">{{ no }}日</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row justify-content-end mr-0">
              <button type="button" class="btn btn-primary rounded-0 text-white px-4">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <div id="uploadBackImgModal" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <div id="uploadBackImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="uploadSelfImgModal" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
          <div class="modal-body">
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
import croppie from 'croppie';

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
      userName: null,
      selfInfo: null,
      homeplace: null,
      userSex: null,

      yearRange
    };
  },
  head () {
    return {
      title: 'プロフィール'
    }
  },
  methods: {
    selfImgOnChange (event) {
      $('#uploadSelfImg').croppie('destroy');

      const reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadSelfImg').croppie({
          url: e.target.result,
          viewport: { width: 170, height: 170, type: 'circle' },
          boundary: { width: 300, height: 300 },
          enableOrientation: true
        });

        $('#uploadSelfImgModal').modal('show');
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    backImgOnChange (event) {
      $('#uploadBackImg').croppie('destroy');

      const reader = new FileReader();
      const divHeight = $('#backImgDiv').height();
      const divWidth = $('#backImgDiv').width();

      reader.onload = function (e) {
        $('#uploadBackImg').croppie({
          url: e.target.result,
          viewport: {
            width: divWidth / divHeight * 130,
            height: 130,
            type: 'square'
          },
          boundary: {
            width: divWidth / divHeight * 130 + 40,
            height: 130 + 40
          },
          enableOrientation: true
        });

        $('#uploadBackImgModal').modal('show');
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    selfImgApply () {
      $('#uploadSelfImg').croppie('result', 'canvas').then(function (result) {
        $('#selfImgImg').attr('src', result);
        $('#uploadSelfImgModal').modal('hide');
      });
    },
    backImgApply () {
      $('#uploadBackImg').croppie('result', 'canvas').then(function (result) {
        $('#backImgImg').attr('src', result);
        $('#uploadBackImgModal').modal('hide');
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
    height:9rem;
    position:relative
  }

  .container-selfpic {
    position:absolute;
    width:6rem;
    height:6rem;
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
    height:11rem;
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
    height:13rem;
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
}
</style>