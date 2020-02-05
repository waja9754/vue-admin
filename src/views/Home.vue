 <template>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column label="JobNumber" prop="jobnumber"/> -->
      <el-table-column prop="name" label="Name"></el-table-column>
      <!-- <el-table-column label="Password" prop="password"/> -->
      <el-table-column align="right">
        <!-- <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template> -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
  import {HomeList} from '@/api/home.js';
  export default {
    data() { 

      return {
        tableData: []
        // search: ""
      }
    },

    mounted(){
      HomeList().then( response =>{
          this.tableData = response.data.data;
          console.log(tableData)
        }).catch(error =>{
          console.log(error)
        })
    },
    methods: {
      handleEdit(index) {
        alert(index);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

    }
  }
</script>
<style scoped lang="less">

</style>
