<template>
  <div>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-outline-primary px-4">
        <input id="took" type="radio" name="options" /> 飲んだ
      </label>
      <label class="btn btn-outline-primary px-4">
        <input id="forgot" type="radio" name="options" /> 忘れた
      </label>
    </div>
    <div class="input-group mt-2">
      <div class="input-group-prepend">
        <span id="memo-addon" class="input-group-text bg-white">メモ</span>
      </div>
      <input type="text" class="form-control" aria-label="gohan" aria-describedby="memo-addon" />
    </div>
  </div>
</template>