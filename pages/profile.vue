<template>
  <div class="row mx-0">
    <div class="card rounded-0 w-100">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#c0c0c0" />
        <text x="50%" y="50%" fill="#ffffff" dy=".3em">Image cap</text>
      </svg>
      <div class="card-body">
        <div class="row justify-content-md-center">
          <div id="userSettings" class="col-sm-12 col-md-12 col-lg-6">
            <div class="mb-2">
              <label for="userName" class="mb-0"><small>名前</small></label>
              <input id="userName" type="text" class="form-control" />
            </div>
            <div class="mb-2">
              <label for="selfInfo" class="mb-0"><small>自己紹介</small></label>
              <textarea id="selfInfo" type="text" class="form-control" rows="3" />
            </div>
            <div class="mb-2">
              <label for="homeplace" class="mb-0"><small>場所</small></label>
              <input id="homeplace" type="text" class="form-control" />
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
              <input id="userHeight" type="text" class="form-control" />
            </div>
            <div class="mb-2">
              <label for="userWeight" class="mb-0"><small>体重</small></label>
              <input id="userWeight" type="text" class="form-control" />
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
  </div>
</template>

<script>

export default {
  layout: 'user',
  data () {
    const now = new Date();
    const nowYear = now.getFullYear();
    const fromYear = nowYear - 120;
    const yearRange = [];
    let index = 0;

    for (let year = nowYear; year >= fromYear; year--) {
      yearRange[index++] = year;
    }
    return { yearRange };
  },
  head () {
    return {
      title: 'プロフィール'
    }
  }
}
</script>