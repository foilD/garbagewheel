<template>
    <!-- <div style="height:100%;width:100%"> -->
        <!-- <check-box :status="status" @checkClick="checkClick" @disCheckClick="disCheckClick"></check-box> -->
        <div  ref="virtualTree" class="container" :style="{height:height,width:width}" @scroll="handleScroll">
            <div class="treeeHolder" :style="{height:indeedHeight}"></div>
            <div class="virtualTree" :style="{transform:`translate3d(0,${offsetTop}px,0)`}">
                <div v-for="item in screenTree" :key="item.key">
                    <span :style="{'margin-left':item.level*10+'px'}">
                        <span class="icon" v-if="item.hasChild&&item.fold"  @click="strenchItem(item)" ><i class="el-icon-caret-right" ></i></span>
                        <span class="icon" v-if="item.hasChild&&!item.fold"  @click="strenchItem(item)"><i class="el-icon-caret-bottom" ></i></span>
                    </span>
                    <check-box @checkClick="checkClick(item)" @disCheckClick="disCheckClick(item)" :status="item.checkStatus"></check-box>
                    <span>{{item.label}}</span>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import checkBox from './checkbox.vue'

// let flatData = []

export default {
    name:"virtualTree",
    components:{checkBox},
    props:{
        data : {
            type : Array,
            default : ()=>[]
        },
        itemSize:{
            type:Number,
            default:20
        },
        height:{
            type : String,
            default : "100%"
        },
        width:{
            type : String,
            default : "100%"
        },
        scale:{
            type : Number,
            default : 1
        }
        
    },
    data(){
        return{
            status:"not-check",
            flatData :[],
            start:0,
            end:0,
            screenHeight:0,
            itemCount:0,
            offsetTop:0,
            above:0,
            below:0
            // screenTree:[]
        }
    },
    computed:{
        indeedData(){
            // console.log(this.flatData.filter((item)=>item.strench))
            return this.flatData.filter((item)=>item.strench)
        },
        indeedHeight(){
            // console.log(this.indeedData.length)
            return this.indeedData.length*this.itemSize+"px"
        },
        screenTree(){
            // console.log(this.indeedData.slice(this.start,this.end))
            return this.indeedData.slice(this.start,this.end)
        }
    },

    methods:{
        disCheckClick(item){
            item.checkStatus = "not-checked"
            let index = 0
            let level = item.level
            let temp = null
            console.log(111,item)
            // console.log(item===this.flatData[0])
            item.parentNode.forEach((element)=>{
                // element.count = element.count + item.count
                if(!item.hasChild){
                    element.count--
                }
                
            })
            for(index;index<this.flatData.length;index++){
                if(this.flatData[index]===item){
                    break
                }
            }
            index = index + 1
            for(index;index<this.flatData.length;index++){
                temp = this.flatData[index]
                if(temp.level<=level){
                    break
                }
                temp.parentNode.forEach(element=>{
                    if(!temp.hasChild&&temp.checkStatus=="is-checked"){
                        element.count--
                    }
                    
                })
                this.flatData[index].checkStatus = 'not-checked'
            }
            item.parentNode.forEach(element=>{
                if(element.count==0){
                    element.checkStatus="not-checked"
                }else if(element.count<element.all){
                    element.checkStatus="is-part-checked"
                }else if(element.count===element.all){
                    element.checkStatus="is-checked"
                }
            })
            item.parentNode.forEach(element=>{
                console.log(element.count)
            })
        },
        checkClick(item){
            item.checkStatus = "is-checked"
            let index = 0
            let level = item.level
            let temp = null
            // console.log(item===this.flatData[0])
            console.log(111,item.parentNode)
            item.parentNode.forEach(element => {
                element.checkStatus = "is-part-checked"
                if(!item.hasChild){
                    element.count++
                }
            });
            for(index;index<this.flatData.length;index++){
                if(this.flatData[index]===item){
                    break
                }
            }
            index = index+1
            for(index;index<this.flatData.length;index++){
                temp = this.flatData[index]
                if(temp.level<=level){
                    break
                }
                // console.log(index,temp)
                temp.parentNode.forEach(element=>{
                    // console.log(temp.checkStatus)
                    if(!temp.hasChild&&temp.checkStatus!="is-checked"){
                        // console.log(element.count)
                        element.count++
                    }
                })
                temp.checkStatus = "is-checked"
            }
            item.parentNode.forEach(element=>{
                if(element.count==0){
                    element.checkStatus="not-checked"
                }else if(element.count<element.all){
                    element.checkStatus="is-part-checked"
                }else if(element.count===element.all){
                    element.checkStatus="is-checked"
                }
            })
        },
        allCount(element){
            let count = 0
            if(!element.children){
                count = 1
            }else{
                for(let i = 0;i<element.children.length;i++){
                    count+=this.allCount(element.children[i])
                }
            }
            return count
        },
        flatTree(tree,parentNode=[],level=0){
            let flatArr = []
            for(let treeItem of tree){
                const {children,...rest} = treeItem
                // console.log(rest)
                let tem = {...rest,parentNode,checkStatus:"not-checked",strench:!parentNode.length,level:level,hasChild:!!children,fold:true,count:0,all:this.allCount(treeItem)}
                flatArr.push(tem)
                if(children){
                        flatArr = flatArr.concat(this.flatTree(children,[tem,...parentNode],level+1))
                }
            }
            return flatArr 
        },
        strenchItem(item){
            let index = 0
            let level = item.level+1
            let temp = undefined
            item.fold = !item.fold
            // console.log(item)
            // console.log(this.flatData[1].parentNode==item)
            // console.log(this.flatData)
            
            for(index;index<this.flatData.length;index++){
                if(this.flatData[index]===item){
                    break
                }
            }

            index = index + 1
            while(index<this.flatData.length){
                temp = this.flatData[index]
                if(temp.level<level){
                    break
                }
                if(!item.fold&&temp.level===level){
                    temp.strench=true
                    // temp.fold = false
                }else if(item.fold&&temp.level>=level){
                    temp.strench=false
                    temp.fold=true
                }
                // this.flatData[index].strench = !this.flatData[index].strench
                index++
            }
            // console.log(index)
            
        

            // if(!item.fold){
            //     this.flatData.forEach(element => {
            //         if(element.parentNode.includes(item)){
            //             element.strench = true                
            //         }
            //     });  
            // }
            
        },
        handleScroll(){
            // console.log(this.$refs['virtualTree'].scrollTop)
            let scrollTop = this.$refs['virtualTree'].scrollTop
            this.start = Math.max(Math.floor(scrollTop/this.itemSize)-this.above,0)
            // this.start = Math.floor(scrollTop/this.itemSize)
            // this.end = this.start+this.itemCount
            this.end = Math.min(this.start+this.above+this.below+this.itemCount,this.indeedData.length)
            // console.log(this.start,this.end,this.above)
            this.offsetTop = this.start*this.itemSize
        }
    },
    mounted(){
        this.flatData = this.flatTree(this.data)
        console.log(this.data)
        this.screenHeight = this.$el.clientHeight
        this.itemCount = Math.ceil(this.screenHeight/this.itemSize)
        this.above = this.itemCount
        this.below = this.itemCount
        this.start = 0
        this.end = this.start+this.itemCount
        console.log(this.end)
        // console.log(this.$el.clientHeight)
        console.log(this.flatData)
    }
}
</script>

<style scoped>
.container{
    /* background-color: #e0e0e0; */
    position: relative;
    overflow: auto;
}
.treeeHolder{
    position: absolute;
    z-index: -1;
    width: 100%;
}
.virtualTree{
    position: absolute;
}
.icon{
    margin-right: 5px;
    cursor: pointer;
}
.downRow{
    transform: rotate(90deg);
}
</style>