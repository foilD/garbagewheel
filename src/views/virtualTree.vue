<template>
    <div>
        <div class="container">
            <virtualTree :data="treeData"></virtualTree>
        </div>
        
        <!-- <el-tree :data="treeData" show-checkbox></el-tree> -->
    </div>
</template>

<script>
import virtualTree from '../components/vitural-tree/index.vue'
import flat from '../utils/flat.js'
export default {
    name:"virtualTreeDescripe",
    components:{
        virtualTree
    },
    data(){
        return{
            treeData:[]
        }
    },
    beforeMount(){
        this.treeData = flat.createTreeData()
        let root = [{key:"0",label:"根节点",title:"根节点",children:this.treeData}]
        this.treeData = root
        console.log(this.treeData)
    }
    
    
}
</script>

<style scoped>
.container{
    height: 350px;
    width: 100%;
    background-color: #ffffff;
    overflow: auto;
}
</style>