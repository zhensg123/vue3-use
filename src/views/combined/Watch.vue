
<template>
  <div>
    <el-input v-model="counter"> </el-input>
    <el-input v-model="twiceTheCounter"> </el-input>
  </div>
</template>
<script>
import { ref, watch, computed } from "vue";
export default {
  setup() {
    const counter = ref(3);
    watch(counter, () => {
      console.log("The new counter value is: " + counter.value);
    });
    const twiceTheCounter = computed({
        set(value){
            counter.value = value/2
        },
        get(){
            return counter.value * 2
        }
    });
    return {
      counter,
      twiceTheCounter
    };
  },
  created(){
    console.log(this.twiceTheCounter, 9090)
    var a;
    console.log('1 a:' + 1)
    // eslint-disable-next-line no-constant-condition
    if(true) {
        
        // eslint-disable-next-line no-func-assign
        a = 1
        // eslint-disable-next-line no-inner-declarations
        function a(){}
        // eslint-disable-next-line no-func-assign
        a = 5
        console.log(a, '222')
    }
    console.log(a, 333)
  }
};
</script>