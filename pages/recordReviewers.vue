<template>
  <div>
    <nav class="nav">
      <li class="nav-item mx-1">
        <a id="application-tab" data-toggle="pill" role="tab" class="nav-link text-center nav-link__top" href="#application-content" aria-controls="community-content" :aria-selected="{showApplicationsTab}" :class="{ active: showApplicationsTab}" @click="changeTab">申請一覧</a>
      </li>
      <li class="nav-item mx-1">
        <a id="reviewer-tab" data-toggle="pill" role="tab" class="nav-link text-center nav-link__top" href="#reviewer-content" aria-controls="record-content" :aria-selected="{showReviewersTab}" :class="{ active: showReviewersTab}" @click="changeTab">許可者一覧</a>
      </li>
    </nav>
    <!-- content area -->
    <div>
      <ApplicationList v-if="showApplicationsTab" />
      <ReviewerList v-if="showReviewersTab" />
    </div>
  </div>
</template>

<script>
import ReviewerList from '~/components/reviewerList'
import ApplicationList from '~/components/applicationList'

export default {
  components: {
    ReviewerList,
    ApplicationList
  },
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      showApplicationsTab: true,
      showReviewersTab: false
    }
  },
  head () {
    return {
      title: '記録閲覧者'
    }
  },
  methods: {
    changeTab (event) {
      this.showReviewersTab = false;
      this.showApplicationsTab = false;

      if (event.target.id === 'reviewer-tab') {
        this.showReviewersTab = true;
        return;
      }
      this.showApplicationsTab = true;
    }
  }
}
</script>

<style scoped>
.nav-link__top {
  width: 8.0rem;
}

a.active {
  border-bottom: solid 2.5px #85b8c9;
  font-weight: bolder;
  color: #54727c;
}
</style>