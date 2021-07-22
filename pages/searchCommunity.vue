<template>
  <SearchCommunity />
</template>

<script>
import SearchCommunity from '~/components/searchCommunity'

export default {
  components: {
    SearchCommunity
  },
  layout: 'user',
  middleware: 'authenticated',
  head () {
    return {
      title: 'コミュニティ検索'
    }
  }
}
</script>