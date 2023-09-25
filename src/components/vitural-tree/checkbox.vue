<template>
    <div class="check-box" :class="checkStatus" @click="handleClick"></div>
    
</template>

<script>
export default {
    name:"checkBox",
    props:{
        status:{
            type:String,
            default : "is-checked"
        }
    },
    computed:{
        checkStatus(){
            if(this.status==="not-checked"){
                return "not-checked"
            }
            if(this.status==="is-checked"){
                return "is-checked"
            }
            if(this.status==="is-part-checked"){
                return "is-part-checked"
            }
        }
    },
    methods:{
        handleClick(){
            console.log(this.status)
            if(this.status!="is-checked"){
                this.$emit('checkClick')
            }else{
                this.$emit('disCheckClick')
            }
        }
    }
}
</script>

<style scoped lang="scss">
.check-box{
    margin-right: 5px;
    display: inline-block;
    cursor: pointer;
    position: relative;
    width: 10px;
    height: 10px;
    border: 1px solid #dcdfe6;
    &:hover{
        border-color: #409eff;
    }
    &.is-checked, &.is-part-checked{
        background-color: #409eff;
        border-color: #409eff;
        
    }
    &::after{
        transform: scale(0);
        // transition: all .5s;
    }
    &.is-checked::after{
        border-color: #409eff;
        transform: scale(0.8);
        content: '\2713';
        position: absolute;
        top:-7px;
        color: aliceblue;
    }
    &.is-part-checked::after{
        border-color: #409eff;
        transform: scale(1.4);
        content: '-';
        position: absolute;
        top:-7.5px;
        left: 1px;
        color:aliceblue
    }

}
</style>

