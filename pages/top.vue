<template>
  <div>
    <!-- profile back image -->
    <div class="rounded-0 w-100">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#c0c0c0" />
        <text x="50%" y="50%" fill="#ffffff" dy=".3em">Image cap</text>
      </svg>
    </div>
    <div class="mx-0 p-3 d-flex align-items-center">
      <!-- profile image -->
      <div class="image">
        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded-circle" width="75" />
      </div>
      <div class="ml-3 w-100">
        <h5>user name</h5>
      </div>
    </div>
    <!-- tab area -->
    <nav class="nav">
      <li class="nav-item mx-1">
        <a id="record-tab" data-toggle="pill" role="tab" class="nav-link text-center nav-link__top" href="#record-content" aria-controls="record-content" :aria-selected="{showRecordTab}" :class="{ active: showRecordTab}" @click="changeTab">記録</a>
      </li>
      <li class="nav-item mx-1">
        <a id="communiry-tab" data-toggle="pill" role="tab" class="nav-link text-center nav-link__top" href="#community-content" aria-controls="community-content" :aria-selected="{showCommunityTab}" :class="{ active: showCommunityTab}" @click="changeTab">コミュニティ</a>
      </li>
      <!-- <li class="nav-item mx-1">
        <a id="scholor-tab" data-toggle="pill" role="tab" class="nav-link text-center nav-link__top" href="#scholor-content" aria-controls="scholor-content" :aria-selected="{showScholorTab}" :class="{ active: showScholorTab}" @click="changeTab">文献</a>
      </li> -->
    </nav>
    <!-- content area -->
    <div>
      <p>content</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'authenticated',
  data () {
    return {
      showRecordTab: true,
      showCommunityTab: false,
      showScholorTab: false
    }
  },
  head () {
    return {
      title: 'BLUE ROSE NOTE'
    }
  },
  methods: {
    changeTab (event) {
      this.showRecordTab = false;
      this.showCommunityTab = false;
      this.showScholorTab = false;

      if (event.target.id === 'record-tab') {
        this.showRecordTab = true;
        return;
      }
      if (event.target.id === 'communiry-tab') {
        this.showCommunityTab = true;
        return;
      }
      this.showScholorTab = true;
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