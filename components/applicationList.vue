<template>
  <div class="mt-4">
    <ul v-if="applications.length > 0" class="list-group-item rounded-0 p-1 mt-1">
      <li v-for="application in applications" :key="application.targetId+application.reviewerId" class="list-group-item border-0 p-1">
        <div class="d-flex">
          <div class="image">
            <img :src="application.selfImg" class="rounded-circle bg-gray" width="55" />
          </div>
          <div class="ml-2 w-100">
            <div class="row mx-0">
              <span><strong>{{ application.userName }}</strong></span>
              <span class="ml-1">@{{ application.reviewerId }}</span>
            </div>
            <div class="row mx-0">
              <small>{{ application.description.substr(0, 35) }}</small>
              <small v-if="application.description.length > 35">...</small>
            </div>
          </div>
        </div>
        <div class="btn-group btn-group-toggle mt-2" data-toggle="buttons">
          <label class="btn btn-sm btn-outline-primary px-4">
            <input v-model="application.answer" type="radio" name="options" value="1" />
            <span class="mr-3 text-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            </span>
            許可
          </label>
          <label class="btn btn-sm btn-outline-primary px-4">
            <input v-model="application.answer" type="radio" name="options" value="0" />
            <span class="mr-3 text-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
            拒否
          </label>
        </div>
        <div class="row mx-0 mt-2">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input :id="application.targetId+application.reviewerId+'tweet'" v-model="application.tweet" type="checkbox" class="custom-control-input">
            <label class="custom-control-label px-2" :for="application.targetId+application.reviewerId+'tweet'">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input :id="application.targetId+application.reviewerId+'temp'" v-model="application.temperature" type="checkbox" class="custom-control-input">
            <label class="custom-control-label px-2" :for="application.targetId+application.reviewerId+'temp'">体温</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input :id="application.targetId+application.reviewerId+'medicine'" v-model="application.medicine" type="checkbox" class="custom-control-input">
            <label class="custom-control-label px-2" :for="application.targetId+application.reviewerId+'medicine'">薬</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input :id="application.targetId+application.reviewerId+'appetite'" v-model="application.appetite" type="checkbox" class="custom-control-input">
            <label class="custom-control-label px-2" :for="application.targetId+application.reviewerId+'appetite'">食事</label>
          </div>
        </div>
        <div class="row mx-0 mt-3 d-flex justify-content-end">
          <button class="btn btn-sm btn-secondary rounded-0 px-4" @click="saveApplication(application, $event)">
            <span v-if="application.saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            保存
          </button>
        </div>
      </li>
    </ul>
    <itemLoader v-if="showLoader" class="pt-4" />
  </div>
</template>

<script>
import { API } from 'aws-amplify';
export default {
  data () {
    return {
      showLoader: true,
      applications: []
    }
  },
  mounted () {
    this.accountId = JSON.parse(localStorage.getItem('targetProfile'));
    if (!this.accountId) { return; }

    const params = {
      body: {
        TableName: 'Reviewer',
        FilterExpression: 'targetId = :tId and reviewStatus = :st',
        ExpressionAttributeValues: { ":tId": this.$cookies.get('account_id'), ":st": 0 }
      }
    };

    API.post('BlueRoseNoteAPIs', '/Reviewer', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        const ret = JSON.parse(response.body).Items;
        if (ret && (ret.length > 0)) {
          this.applications = ret;
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
    saveApplication (target, event) {
      const targetApIdx = this.applications.findIndex((o) => {
        return (o.targetId === target.targetId) && (o.reviewerId === target.reviewerId);
      });

      const targetAp = this.applications[targetApIdx];

      targetAp.saving = true;
      $(event.target).attr('disabled', 'disabled');

      if (target.answer === "1") {
        const now = new Date();

        const params = {
          body: {
            targetId: target.targetId,
            reviewerId: target.reviewerId,
            reviewStatus: 1,
            tweet: target.tweet ? target.tweet : false,
            temperature: target.temperature ? target.temperature : false,
            medicine: target.medicine ? target.medicine : false,
            appetite: target.appetite ? target.appetite : false,
            updatedAt: this.$getNowString(now)
          }
        };

        API.put('BlueRoseNoteAPIs', '/Reviewer', params)
          .then((response) => {
            if (response.statusCode === 200) {
              this.applications.splice(targetApIdx, 1);
            }
          })
          .catch((error) => {
            console.log(error.response);
          })
          .finally(() => {
            $(event.target).removeAttr('disabled');
            targetAp.saving = false;
          });
      } else {
        const params = {
          body: {
            targetId: target.targetId,
            reviewerId: target.reviewerId
          }
        };

        API.del('BlueRoseNoteAPIs', '/Reviewer', params)
        .then((response) => {
          if (response.statusCode === 200) {
            this.applications.splice(targetApIdx, 1);
          }
        })
        .finally(() => {
          $(event.target).removeAttr('disabled');
          targetAp.saving = false;
        });
      }
    }
  }
}
</script>