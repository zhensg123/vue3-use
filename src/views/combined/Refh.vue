
<script>
    
import { h, ref, reactive } from 'vue'
export default {
  setup() {

    const readersNumber = ref([1111])
    const book = reactive({ title: 'Vue 3 Guide' })
    console.log(readersNumber.value, 'v')
    // 请注意这里我们需要显式使用 ref 的 value
    return () => h('div', [readersNumber.value, book.title])
  }
}

</script>