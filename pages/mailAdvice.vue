<template>
  <div>
    <p>mail advice</p>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'authenticated',
  head () {
    return {
      title: 'メール相談'
    }
  }
}
</script>