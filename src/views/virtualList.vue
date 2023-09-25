<template>
    <div>
        <div class="container">
            <virtualList :data="listData"></virtualList>
        </div>
    </div>
</template>

<script>
import virtualList from '../components/virtual-list/index.vue'
import {faker} from '@faker-js/faker'
export default {
    name : 'virtualDescripe',
    components:{
        virtualList
    },
    data(){
        return{
            listData:[]
        }
    },
    mounted(){
        for(let i = 0;i<1000;i++){
            this.listData.push(faker.lorem.sentence(10,20))
        }
        // console.log(this.listData)
    }
}
</script>

<style scoped>
.container{
    height: 350px;
    width: 90%;
    background-color: #ffffff;
    overflow: auto;
}
</style>