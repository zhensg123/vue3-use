<template>
  <div class="about">
    <h1 @click="changeObj">This is an about page</h1>
    <p>{{obj}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      obj: {
        num: 1
      }
    }
  },
  watch: {
    obj: {
      handler(){
        console.log(22111111222)
      },
      deep: true
    }
  },
  methods: {
  changeObj(){
    this.obj.uu = 111
    setTimeout(()=>{
      delete this.obj.num
    }, 2000)
  }
  }
}
</script>
