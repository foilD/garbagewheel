 <template>
  <div class="home">
    
    <el-container>
      <!-- <el-aside ></el-aside> -->
      <el-container>
        <el-header></el-header>
        <el-container>
          <el-aside>
            <el-menu @select="handleSelect">
              <el-menu-item v-for="item in menuArr" :key="item.key" :index="item.key">
                {{item.des}}
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
        <el-footer></el-footer>
      </el-container>
      <!-- <el-aside ></el-aside> -->
    </el-container>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data(){
    return{
      menuArr:[
        {name:"virtualList",des:"虚拟列表",key:"1",route:"/home/component/vitural-list"},
        {name:"virtualTree",des:"虚拟树",key:"2",route:"/home/component/virtual-tree"}
      ],
    }
  },
  methods:{
    handleSelect(index){
      // console.log(this.$router.currentRoute)
      let selectMenu = this.menuArr.find((element)=>{return element.key==index})
      this.$router.currentRoute.path!=selectMenu.route&&this.$router.push(selectMenu.route)
    }
  }
  
}
</script>

<style scoped>
.el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
.el-header{
  border-bottom: 1px solid #e0e0e0;
}
  
  .el-container .el-container .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
    /* border-right: 1px solid #e0e0e0; */
  }
  
  .el-main {
    background-color: #ffffff;
    /* border-left: 1px solid #e0e0e0; */
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
  }

  .el-menu-item{
    text-align: left;
  }
</style>
