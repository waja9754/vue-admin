 
 <template>
  <div>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" max-height="100%" stripe>
      <el-table-column label="JobNumber" prop="jobNumber"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column label="Password" prop="password"/>
      <el-table-column align="right">
        <template slot="header">
          <el-button icon="el-icon-search" @click="Search()" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="Add()" circle></el-button>
          <el-button type="info" icon="el-icon-message" @click="Refresh()" circle></el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="Edit(scope.row.jobNumber,scope.row.name,scope.row.password)">Edit</el-button>
          <el-dialog  :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="jobNumber" :label-width="formLabelWidth">
                    <el-input v-model="form.jobNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="password" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="EditConfirm()" v-if="selectURL==='Edit'">修 改</el-button>
                <el-button type="primary" @click="AddConfirm()" v-if="selectURL==='Add'">添 加</el-button>
              </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="Delete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 100, 200]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :pager-count="7">
    </el-pagination>
  </div>
</template>

<script>
  import {HomeList, Delete,EditConfirm,AddConfirm,GetHomeList} from '@/api/home.js';
  
  export default {
    data() { 

      return {
        tableData: [],
        search:"",
        dialogFormVisible: false,
        form:[],
        formLabelWidth: '120px',
        selectURL:"Edit",
        currentPage: 1,
        total:1,
        pagesize:10,
      }
    },

    mounted(){
       let data = this.$qs.stringify({
            value:'',
            currentPage:this.currentPage,
            pagesize:this.pagesize,
        });
      HomeList(data).then( response =>{
          this.tableData = response.data.data;
          this.currentPage = response.data.currentPage;
          this.total = this.tableData.length;
          console.log(response)
        }).catch(error =>{
          console.log(error)
        })
        
    },
    methods: {
      GetHomeList(data){
        HomeList(data).then( response =>{
          this.tableData = response.data.data;
          this.currentPage = response.data.currentPage;
          this.total = this.tableData.length;
          console.log(response)
        }).catch(error =>{
          console.log(error)
        })
      },

      Refresh(){
        let data = this.$qs.stringify({
            value:'',
            currentPage:1,
            pagesize:this.pagesize,
        });
        HomeList(data).then( response =>{
          this.tableData = response.data.data;
          this.currentPage = response.data.currentPage;
          this.total = this.tableData.length;
          console.log(response)
        }).catch(error =>{
          console.log(error)
        })
      },

      Search() {
        this.$prompt('Please enter the content to query', 'Search', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            let data = this.$qs.stringify({ 
              value:value,
              currentPage:1,
              pagesize:this.pagesize,
            });
            HomeList(data).then( response =>{
              this.tableData = response.data.data;
              this.currentPage = response.data.currentPage;
              this.total = this.tableData.length;
              console.log(response)
            }).catch(error =>{
              console.log(error)
            })
        }).catch(() => {
        });
      },

      Add() {
        this.dialogFormVisible = true;
        this.selectURL = "Add";
        this.form = {
          jobNumber:'',
          name:'',
          password:'',
        }
      },

      AddConfirm(){
        this.dialogFormVisible = false;
        let data = this.$qs.stringify({
          jobNumber:this.form.jobNumber,
          name:this.form.name,
          password:this.form.password,
        });
        console.log(data);
        AddConfirm(data).then(response =>{
          this.tableData = response.data.data;
          HomeList(data).then( response =>{
              this.tableData = response.data.data;
              this.currentPage = response.data.currentPage;
              this.total = this.tableData.length;
            }).catch(error =>{
            })
        }).catch(error =>{
          console.log(error)
        })
      },

      Edit(jobNumber,name,password) {
        this.dialogFormVisible = true;
        this.selectURL = "Edit";
        this.form = {
          jobNumber:jobNumber,
          name:name,
          password:password,
        }
      },

      EditConfirm(){
        this.dialogFormVisible = false;
        let data = this.$qs.stringify({
          jobNumber:this.form.jobNumber,
          name:this.form.name,
          password:this.form.password,
        });
        console.log(data);
        EditConfirm(data).then(response =>{
          this.tableData = response.data.data;
          console.log(response.data.data)
        }).catch(error =>{
          console.log(error)
        })
      },

      Delete(id){
        console.log(id);
        let data = this.$qs.stringify({
            id:id
        });
        Delete(data).then(response =>{
          this.tableData = response.data.data;
          console.log(response.data.data)
        }).catch(error =>{
          console.log(error)
        })
      },

      handleSizeChange(val) {
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
    }
  }
</script>
<style scoped lang="less">
    
</style>
