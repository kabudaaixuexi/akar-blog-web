<template>
  <el-dropdown class="navigation-avatar cp" trigger="click">
    <div style="padding: 0 12px">
      <img v-if="userInfo.userPortrait" :src="userInfo.userPortrait" />
      <img v-else src="@/assets/images/navigation-avatar.webp" />
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(cmdItem, index) in commandList.filter((ev) => ev.visible)"
          :key="index"
          @click="handleCommand(cmdItem)"
        >
          <div class="navigation-avatar__dropdown-command">
            <el-icon>
              <component :is="cmdItem.icon" />
            </el-icon>
            <span>{{ cmdItem.label }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <Trans1s />
</template>

<script lang="ts">
import Cookie from "js-cookie";
import { computed, defineComponent } from "vue";
import Store from "@/store";
import { getUuiD } from "@/utils";
import Trans1s from "@/components/Trans1s/index.vue"
import { SwitchButton, User, Switch, Right } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "NavigationAvatar",
  components: {
    SwitchButton,
    User,
    Switch,
    Right,
    Trans1s
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userInfo = JSON.parse(Cookie.get("userInfo") || "{}");
    console.log(JSON.parse(userInfo.extData || '{}'),'userInfo');

    const logined = userInfo && Object.getOwnPropertyNames(userInfo).length;
    const commandList = computed(() => [
      {
        visible: true,
        label: `${userInfo.userName ? '个人主页' : `游客${getUuiD()}`}`,
        icon: "user",
        click: () => {
          userInfo.userName && router.push({ path: `/uf/${userInfo.userName}/hp`, replace: true });
        },
      },
      {
        visible: !logined,
        label: "前往登录",
        icon: "right",
        click: () => {
          router.push({ path: `/u`, replace: true });
        },
      },
      {
        visible: logined,
        label: "退出登录",
        icon: "switch-button",
        click: () => {
          Cookie.remove('token')
          Cookie.remove("userInfo");
          router.push({ path: `/u`, replace: true });
        },
      },
    ]);

    const handleCommand = (cmdItem) => {
      console.log("cmdItem", cmdItem);
      cmdItem?.click();
    };
    return {
      commandList,
      userInfo,
      handleCommand,
    };
  },
});
</script>
<style lang="scss">
.navigation-avatar {
  display: flex;
  padding-right: 6px;
  align-items: center;
  user-select: none;
  img {
    width: 35px;
    border-radius: 50%;
    transition: all .5s;
  }

}
.navigation-avatar__dropdown-command {
  display: flex;
  align-items: center;
  user-select: none;
  white-space: nowrap;
}
</style>
