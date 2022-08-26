<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo :title="`更新个人主页`" />
      </NavigationNavBar>
    </template>

    <template #content>
      <!-- 基础信息 -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-upload
              action="http://124.220.16.124:8099/upload/setFilesNote"
              :show-file-list="false"
              :multiple="false"
              :limit="1"
            >
              <img
                style="border-radius: 6px; border: 1px solid #f6f6f6; width: 64px; height: 64px"
                :src="userInfo.photo"
                alt=""
              />
            </el-upload>
            <div class="ml12" style="width: 100%">
              <el-input :maxlength="20" v-model="userInfo.userName" placeholder="名称不能为空哦" />
              <el-input :maxlength="36" v-model="userInfo.userIntro" placeholder="还没有任何简介" />
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-select v-model="userInfo.userGender" class="m-2" placeholder="性别">
              <el-option
                v-for="item in [
                  { label: '男', value: '1' },
                  { label: '女', value: '0' },
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="9">
            <!-- 邮箱 -->
            <el-input :maxlength="20" v-model="userInfo.userEmail" placeholder="还没有设置邮箱" />
          </el-col>
          <el-col :span="9">
            <!-- 手机号 -->
            <el-input :maxlength="11" v-model="userInfo.userPhone" placeholder="还没有关联手机号" />
          </el-col>
        </el-row>
        <el-row :gutter="24" class="mt20" style="margin-bottom: 6px">

          <el-col :span="6">
          <!-- 任职 -->
            <el-input :maxlength="30" v-model="userInfo.userOffice" placeholder="任职" />
          </el-col>
           <el-col :span="9">
          <!-- 生日 -->
            <el-date-picker
              v-model="userInfo.userBirth"
              type="date"
              placeholder="还没有选择出生日"
              size="small"
              value-format="YYYY-MM-DD"
            />
          </el-col>
          <el-col :span="9">
        <!-- IP属地 -->
            <el-input :maxlength="10" disabled v-model="userInfo.userRegion" placeholder="IP属地" />
        </el-col>
        </el-row>
      </el-card>
      <!-- 扩展信息 -->
      <el-card class="box-card mt20">
        <template #header>
          <div class="card-header">
            <span>扩展信息</span>
            <el-switch v-model="userInfo.showExtend" />
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-input :maxlength="20" v-model="userExtend.major" placeholder="所学专业" />
          </el-col>
          <el-col :span="8">
            <el-select v-model="userExtend.workyears" placeholder="工作年限">
              <el-option
                v-for="item in ['0-1年', '1-3年', '3-5年' , '5-7年', '7-10年', '10年以上']"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input :maxlength="20" v-model="userExtend.residence" placeholder="户籍归属" />
          </el-col>
        </el-row>
      </el-card>
      <!-- 自定义外链 -->
      <el-card class="box-card mt12">
        <template #header>
          <div class="card-header">
            <span>自定义外链</span>
            <el-switch v-model="userInfo.showLinks" />
          </div>
        </template>
        <el-row :gutter="24" class="mt20" style="margin-bottom: 6px" v-for="(item, key) in userLinks" :key="key">
          <el-col :span="8"><el-input :maxlength="30" v-model="item.label" placeholder="说明，例：gitHub地址" /></el-col>
          <el-col :span="13"><el-input v-model="item.value" placeholder="链接，例：https://github.com/kabudaaixuexi" /></el-col>
          <el-col :span="3">
              <el-button type="primary" @click="() => handleDelLink(item)" size="small" :icon="Minus" circle />
          </el-col>
        </el-row>
        <el-button style="margin-left: 94%;" class="mt20" type="primary" @click="handleAddLink" :icon="Plus" circle />
      </el-card>

      <el-button type="primary" class="mt20" style="margin-left: 52%;" size="large" @click="handleSubmit">更新</el-button>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
import { useRoute, useRouter } from "vue-router";
import Cookies from "js-cookie";
import { onMounted, computed } from "vue";
import Store from "@/store";
import Api from "@/api";
import { useState } from "@akar/vue-hooks";
import { Edit, Plus, Minus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getUuiD } from "@/utils"
const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo") || "{}"));

// 扩展信息
const [userExtend, setUserExtend] = useState(JSON.parse(Cookies.get("userInfo") || "{}").userExtend || {})
// 外链
const [userLinks, setUserLinks] = useState(JSON.parse(JSON.parse(Cookies.get("userInfo") || "{}").userLinks || '[]'))


const route = useRoute();
const router = useRouter();

const handleDelLink = (el) => {
  setUserLinks(userLinks.value.filter(item => item.key != el.key))
}
const handleAddLink = () => {
  setUserLinks([
    ...userLinks.value, {
      label: "",
      value: "",
      key: getUuiD()
    }
  ])
}
const handleSubmit = async () => {
  await Api.postModify({
    ...userInfo.value,
    userLinks: JSON.stringify(userLinks.value.filter(i => i.label || i.value)),
    userExtend: JSON.stringify(userExtend.value),
    role: 0,
  })
  router.back()
};
onMounted(async () => {
  document.title = `更新个人信息`;
  const { data: user } = await Api.getUser({ uid: route.params.uid });
  const { data: res } = await Api.getRegion()
  user.userRegion = res.address
  setUserInfo(user);
  setUserLinks(JSON.parse(user.userLinks || '[]'))
  setUserExtend(JSON.parse(user.userExtend || '{}'))
});
</script>

<style lang="scss" scoped>
.box-card {
  width: 60%;
  &:deep() {
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-input:nth-of-type(1) {
        .el-input__inner {
          font-weight: 600;
          font-size: 16px;
        }
        .el-input__wrapper {
          box-shadow: none !important;
        }
      }
    }
    .el-select {
      width: 80px;
      .el-input__inner {
      }
      .el-input__suffix {
        display: none;
      }
    }

    .el-input {
      .el-input__inner {
        font-weight: 400;
        font-size: 12px;
      }
      .el-input__wrapper {
        box-shadow: none !important;
        background-color: #fff;
        .el-input__prefix {
          opacity: 0;
          width: 4px;
        }
      }
    }
  }
}
</style>
