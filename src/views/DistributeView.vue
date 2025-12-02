<template>
  <el-card class="cardStyle">
    <el-page-header @back="goBack" content="捐赠页面"></el-page-header>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="userPhone">
        <el-input v-model="ruleForm.userPhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="userAddress">
        <el-input v-model="ruleForm.userAddress" autocomplete="off"></el-input>
      </el-form-item>
      <div style="display: flex; align-items: center;">
        <span style="margin-right: 10px;">省：</span>
        <el-select v-model="ruleForm.distributeProvince" filterable placeholder="请选择省" class="selectStyle"
          @change="showCities()">
          <el-option v-for="province in ProvinceList" :key="province.provinceName" :label="province.provinceName"
            :value="province.provinceName" />
        </el-select>
        <span style="margin-right: 10px;">市：</span>
        <el-select v-model="ruleForm.distributeCity" filterable placeholder="请选择市" class="selectStyle"
          @change="showCounties()">
          <el-option v-for="city in CityList" :key="city.cityName" :label="city.cityName" :value="city.cityName" />
        </el-select>
        <span style="margin-right: 10px;">县：</span>
        <el-select v-model="ruleForm.distributeCounty" filterable placeholder="请选择县" class="selectStyle">
          <el-option v-for="county in CountyList" :key="county.countyName" :label="county.countyName"
            :value="county.countyName" />
        </el-select>
      </div>

      <el-form-item label="捐赠物类型" prop="distributeType">
        <el-select style="margin-left: -1000px;" v-model="ruleForm.distributeType" placeholder="请选择物品类型">
          <el-option label="食品" value="食品"></el-option>
          <el-option label="衣物" value="衣物"></el-option>
          <el-option label="生活用品" value="生活用品"></el-option>
          <el-option label="学习用品" value="学习用品"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="捐赠图片" prop="distributeImage">
        <el-upload class="upload-demo" ref="upload" action="api/distribute/uploadDistributeImg"
          :on-success="handleSuccess" :on-error="handleError">
          <el-button style="margin-left: -1100px;" slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>


      <el-form-item label="捐赠备注" >
            <el-input type="textarea" :rows="4" v-model="ruleForm.distributeMark" autocomplete="off"></el-input>
          </el-form-item>
    </el-form>

    

    <div>
      <el-button type="primary" @click="distributeSubmit()">提交</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userInfo: '',
      userid: '',
      userMsg: {
        userId: '',
        userName: '',
        userAddress: '',
        userIdCard: '',
        userPhone: '',
        userSex: '',
        userState: '',
      },
      formLabelWidth: '120px',
      ruleForm: {
        userName: '',
        userPhone: '',
        userAddress: '',
        distributeImage: '',
        distributeProvince: '',
        distributeCity: '',
        distributeCounty: '',
        distributeType: '',
        distributeMark: '',
      },
      rules: {
        userName: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
        userPhone: [{ required: true, message: '电话号码不能为空', trigger: 'blur' }],
        userAddress: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
        distributeImage: [{ required: true, message: '捐赠图片不能为空', trigger: 'blur' }],
        distributeType: [{ required: true, message: '捐赠物类型不能为空', trigger: 'blur' }],

      },

      ProvinceList: [],
      CityList: [],
      CountyList: [],
      provinceId: '',
      cityId: '',
      countyId: '',
      userId: '',

    };
  },

  methods: {
    getUserId() {
      var usertxt = sessionStorage.getItem("userMsg");
      usertxt = JSON.parse(usertxt)
      this.userInfo = usertxt
      this.userid = this.userInfo[0].userId

    },
    getUserInfoMsg() {
      this.$axios.get(
        "/user/getUserInfoMsg",
        {
          params: {
            userId: this.userid,
          }
        }
      ).then(res => {
        if (res.data.total >= 1) {
          this.userMsg = res.data.data[0]
          this.ruleForm.userName = this.userMsg.userName
          this.ruleForm.userPhone = this.userMsg.userPhone
          this.ruleForm.userAddress = this.userMsg.userAddress


        } else {
          this.$message.error('获取用户个人信息失败');
        }

      }).catch(err => { //通讯失败或报错

      })
    },
    getCountyMsg() {
      var countyDetailMsg = sessionStorage.getItem("DetailCountyInfo")
      countyDetailMsg = JSON.parse(countyDetailMsg)
      var userMsg = sessionStorage.getItem("userMsg")
      userMsg = JSON.parse(userMsg)

      this.ruleForm.distributeProvince = countyDetailMsg.provinceName
      this.ruleForm.distributeCity = countyDetailMsg.cityName
      this.ruleForm.distributeCounty = countyDetailMsg.countyName
      this.countyId = countyDetailMsg.countyId
      this.userId = userMsg[0].userId
    },
    goBack() {
      if (this.$route.path != '/CountyDetailView') {
                this.$router.push('/CountyDetailView')
              }
    },
    showAllProvinces() {
      this.$axios.get(
        "/province/showAllProvinces",
        {
          params: {
          }
        }
      ).then(res => {  //业务：
        if (res.data.code == 0) {
          this.ProvinceList = res.data.data

        } else {
          this.$message.error('暂未有省名单');
        }

      }).catch(err => { //通讯失败或报错

      })
    },

    showCityList(provinceId) {
      // this.SearchCityId = ''
      this.ruleForm.distributeCity = ''
      this.$axios.get(
        "/city/showCities",
        {
          params: {
            provinceId: provinceId
          }
        }
      ).then(res => {  //业务：
        console.log("res")
        if (res.data.code == 0) {
          this.CityList = res.data.data

        } else {
          this.$message.error('查询市失败');
        }

      }).catch(err => { //通讯失败或报错

      })
    },
    showCities() {
      this.$axios.get(
        "/province/getProvinceIdByName",
        {
          params: {
            provinceName: this.ruleForm.distributeProvince
          }
        }
      ).then(res => {  //业务：
        if (res.data.code == 0) {
          this.provinceId = res.data.data
          // alert(this.provinceId) 
          this.showCityList(this.provinceId)

        } else {
          this.$message.error('查询指定省的id失败');
        }

      }).catch(err => { //通讯失败或报错

      })
    },

    showCountyLitss(cityId) {

      this.ruleForm.distributeCounty = ''
      this.$axios.get(
        "/county/showCountyLitss",
        {
          params: {
            cityId: cityId
          }
        }
      ).then(res => {  //业务：
        console.log("res")
        if (res.data.code == 0) {
          this.CountyList = res.data.data

        } else {
          this.$message.error('查询县失败');
        }

      }).catch(err => { //通讯失败或报错

      })
    },
    showCounties() {
      this.$axios.get(
        "/city/getCityIdByName",
        {
          params: {
            cityName: this.ruleForm.distributeCity
          }
        }
      ).then(res => {  //业务：
        if (res.data.code == 0) {
          this.cityId = res.data.data
          this.showCountyLitss(this.cityId)

        } else {
          this.$message.error('查询指市区的id失败');
        }

      }).catch(err => { //通讯失败或报错

      })
    },

    //捐赠图片上传成功和失败回调方法
    handleSuccess(response, file, fileList) {
      this.ruleForm.distributeImage = response.data
    },
    handleError(err, file) {
      this.$message.error("文件上传失败");
    },
    distributeSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {

          this.$axios.post(
            "/distribute/insertDistribute",null,
            {
              params: {
                userName: this.ruleForm.userName,
                userPhone: this.ruleForm.userPhone,
                sendAddress: this.ruleForm.userAddress,
                receiveProvince: this.ruleForm.distributeProvince,
                receiveCity: this.ruleForm.distributeCity,
                receiveCounty: this.ruleForm.distributeCounty,
                distributeImage: this.ruleForm.distributeImage,
                distributeType: this.ruleForm.distributeType,
                countyId: this.countyId,
                userId: this.userId,
                distributeMark: this.ruleForm.distributeMark,
              }
            }
          ).then(res => {  //业务：
            if (res.data.code == 0) {
              this.$message({
                message: '提交成功！',
                type: 'success'
              });
              if (this.$route.path != '/CountyDetailView') {
                this.$router.push('/CountyDetailView')
              }
            } else {
              this.$message.error('提交捐赠失败');
            }

          }).catch(err => { //通讯失败或报错

          })

        } else { // 校验不通过
          this.$alert("请将捐赠信息填写完整！")
        }
      })
    },


  },
  mounted() {
    this.getUserId()
    this.getUserInfoMsg()
    this.getCountyMsg()
    this.showAllProvinces()
  },
}
</script>

<style scoped>
.cardStyle {
  height: 700px;
  padding: 20px;
}

.el-form-item {
  margin-bottom: 15px;
}

.selectStyle {
  width: 200px;
}
</style>