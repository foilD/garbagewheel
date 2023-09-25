<template>
    <div ref="virtualList" :style="{height:height,width:width}" class="container" @scroll="handleScroll">
        <div class="listHolder" :style="{height:listHeight}"></div>
        <div class="visualList" :style="{transform:`translate3d(0,${offsetTop}px,0)`}">
            <div
            v-for="(item,index) in screenList"
            :key="item"
            :style="{height:itemSize+'px'}"
            style="border-bottom:1px solid #d0d0d0;box-sizing:border-box"><span style="color:red">{{start+index+1+". "}}</span>{{item}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "virtualList",
    props:{
        data:{
            type : Array,
            default:()=>[]
        },
        height:{
            type : String,
            default : "100%"
        },
        width:{
            type : String,
            default : "100%"
        },
        itemSize:{
            type : Number,
            default : 60
        },
        scale:{
            type : Number,
            default : 1
        }
    },
    data(){
        return{
            viewHeight : 0,
            itemCount : 0,
            start : 0,
            end : 0,
            offsetTop:'',
            above:0,
            down:0
        }
    },
    computed:{
        listHeight(){
            // console.log(this.data)
            return this.itemSize*this.data.length+"px"
        },
        screenList(){
            return this.data.slice(this.start,this.end)
        }
    },
    methods:{
        handleScroll(){
            // console.log(this.$refs.vir)
            let scrollTop = this.$refs['virtualList'].scrollTop
            console.log(scrollTop)
            this.start = Math.max(Math.floor(scrollTop/this.itemSize)-this.above,0)
            this.end = Math.min(this.start+this.itemCount+this.above+this.down,this.data.length)
            console.log(this.start,this.end)
            this.offsetTop = this.start*this.itemSize
        }
    },
    mounted(){
        this.viewHeight = this.$el.clientHeight
        this.itemCount = Math.ceil(this.$el.clientHeight/this.itemSize)
        this.end = this.start+this.itemCount
        this.above = this.itemCount*this.scale
        this.down = this.itemCount*this.scale
        // console.log(this.$el.clientHeight)
    }
}
</script>

<style scoped>
    .container{
        /* background-color: #e0e0e0; */
        position: relative;
        overflow: scroll;
    }
    .listHolder{
        width: 1px;
        z-index: -1;
        position: absolute;
    }
    .visualList{
        position: absolute;
    }
</style>