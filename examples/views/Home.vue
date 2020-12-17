<template>
  <div class="home">
    <h1>我是组件</h1>
    <dd-popup title="呲呲呲" v-if="flag" @ok="ok" @cancel="cancel"/>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data(){
    return{
      flag:true
    }
  },
  methods:{
    ok(){
      this.flag = false
    },

    cancel(){
      this.flag = false
    }

  }
}
</script>
