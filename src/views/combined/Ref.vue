<template>
    <p>使用vue3的setup，使用ref和reactive</p>
    <div>{{readersNumber}}---{{book}}</div>
    <div ref="refs">测试ref</div>

    {{ user.name }}
</template>
<script>
import {ref, reactive, onMounted} from 'vue'
export default {
    setup(){
       const readersNumber = ref(0)
           const refs = ref(null)
      const book = reactive({ title: 'Vue 3 Guide' })
      const user = ref({ name: 'Alice' })

      onMounted(() => {
        // DOM 元素将在初始渲染后分配给 ref
        console.log(refs.value, '33333')
        console.log(user.value, '33111333')

      })
      // 暴露给 template
      return {
        readersNumber,
        book,
        refs,
        user
      }
    }
}
</script>
