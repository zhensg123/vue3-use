<template>
111111
</template>
<script>
import { ref, onMounted } from 'vue'

export default {
    setup (){
  const repositories = ref([])
  const getUserRepositories =  () => {
    console.log('测试组合式api里面的声明周期函数')
  }

  onMounted(getUserRepositories) // 在 `mounted` 时调用 `getUserRepositories`

  return {
    repositories,
    getUserRepositories
  }
}
}
</script>
