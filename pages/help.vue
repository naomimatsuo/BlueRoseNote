<template>
  <div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <NuxtLink to="/agreement">利用規約について</NuxtLink>
      </li>
      <li class="list-group-item">
        <NuxtLink to="/privacyPolicy">プライバシーポリシーについて</NuxtLink>
      </li>
      <li class="list-group-item">退会について</li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'authenticated',
  head () {
    return {
      title: 'ヘルプ'
    }
  }
}
</script>