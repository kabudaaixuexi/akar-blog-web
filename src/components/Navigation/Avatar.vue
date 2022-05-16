<template>
  <el-dropdown class="navigation-avatar" trigger="click">
    <div style="padding: 0 12px">
      <img v-if="userInfo.photo" :src="userInfo.photo" />
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
</template>

<script lang="ts">
import Cookie from "js-cookie";
import { computed, defineComponent } from "vue";
import Store from "@/store";
import { getUuiD } from "@/utils";
import { SwitchButton, User, Switch, Right } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "NavigationAvatar",
  components: {
    SwitchButton,
    User,
    Switch,
    Right,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userInfo = JSON.parse(Cookie.get("userInfo") || "{}");

    const logined = userInfo && Object.getOwnPropertyNames(userInfo).length;
    const commandList = computed(() => [
      {
        visible: true,
        label: `${userInfo.userName || `游客${getUuiD()}`}`,
        icon: "user",
        click: () => {},
      },
      {
        visible: true,
        label: `前往极简版`,
        icon: "right",
        click: () => {
          window.open("http://124.220.16.124/simplel291dvdg.html#/");
        },
      },
      {
        visible: !logined,
        label: "前往登录",
        icon: "right",
        click: () => {
          router.push({ path: `/user`, replace: true });
        },
      },
      {
        visible: logined,
        label: "退出登录",
        icon: "switch-button",
        click: () => {
          // Cookie.remove('token')
          console.log(Cookie.get("userInfo"));

          Cookie.remove("userInfo");
          Store.setState(null, "userInfo");
          router.push({ path: `/user`, replace: true });
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
  align-items: center;
  cursor: pointer;
  user-select: none;
  img {
    transition: .2s;
    width: 26px;
    border: 1px solid $color-primary;
    border-radius: 50%;
  }
}
.navigation-avatar__dropdown-command {
  display: flex;
  align-items: center;
  user-select: none;
  white-space: nowrap;
}
</style>
