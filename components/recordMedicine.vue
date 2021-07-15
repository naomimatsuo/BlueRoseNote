<template>
  <div>
    <div class="bg-white p-2">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-outline-primary px-4">
          <input id="took" type="radio" name="options" />
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
          </span>
          飲んだ
        </label>
        <label class="btn btn-outline-primary px-4">
          <input id="forgot" type="radio" name="options" />
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            </svg>
          </span>
          忘れた
        </label>
      </div>
      <div class="input-group mt-2">
        <div class="input-group-prepend">
          <span id="memo-addon" class="input-group-text bg-white">メモ</span>
        </div>
        <input type="text" class="form-control" aria-label="gohan" aria-describedby="memo-addon" />
      </div>
      <div class="d-flex justify-content-end mt-2">
        <button type="button" class="btn btn-lg btn-secondary text-white rounded-0" style="width:10rem;">記録</button>
      </div>
    </div>
  </div>
</template>