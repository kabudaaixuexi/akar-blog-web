<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
        <div style="margin-left: 18px">
          <SearchCorporation @select="handleSelectSearch" :list="list" :path="'resultDetail'" />
        </div>
      </NavigationNavBar>
    </template>
    <template #content>
      <LayoutSection has-divider flex-content>
        <template #head>
          <CommonDrawes :list="list" :currentDrawe="currentDrawe" :changeDrawe="changeDrawe" />
        </template>
        <!-- <CommonTableHeader /> -->
        <CommonTableBody :list="list" />
      </LayoutSection>
    </template>

    <template #sideRight>
      <BlogRanking  :type="6"/>
      <BlogRanking  :type="7"/>
      <BlogRanking  :type="9"/>
      <BlogRanking  :type="8"/>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted } from "vue";
import BlogRanking from '@/components/Plates/BlogRanking.vue'
import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";

import CommonForm from "@/modules/Common/components/CommonForm.vue";
import CommonTableHeader from "@/modules/Common/components/TableHeader.vue";
import CommonTableBody from "@/modules/Common/components/TableBody.vue";
import CommonDrawes from '@/modules/Common/components/CommonDrawes.vue'

import SearchCorporation from "@/components/SearchSelect/SearchCorporation.vue";
import Api from "@/api";
import Cookies from "js-cookie";
import { useState } from "@akar/vue-hooks";
import Store from '@/store'

import * as Driver from '@/libs/driver.min.js'
console.log(Driver.Driver,'Driver');


const [list, setList] = useState([]);
const [currentDrawe, setCurrentDrawe] = useState(0)
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
// 获取文章列表
const getNoteList = async (drawe) => {
  if (Number(drawe)) {
    const { data } = await Api.getNoteListPublished({type: 1, drawe })
    setList(data);
  }else {
    const { data } = await Api.getNoteListPublished({})
    setList(data)
  }
};
// 选择分类
const changeDrawe = (e) => {
  getNoteList(e)
  setCurrentDrawe(e)
}

function handleSelectSearch(name?: string) {
  console.log("搜索文章名: ", name);
}

onMounted(async () => {
  getNoteList(undefined);
const driver = new Driver({
  // className: 'scoped-class',        // className to wrap driver.js popover
  animate: true,                    // Whether to animate or not
  opacity: 0.5,                    // Background opacity (0 means only popovers and without overlay)
  padding: 10,                      // Distance of element from around the edges
  // allowClose: true,                 // Whether the click on overlay should close or not
  overlayClickNext: false,          // Whether the click on overlay should move next
  doneBtnText: '我知道了',              // Text on the final button
  closeBtnText: '跳过',            // Text on the close button for this step
  stageBackground: '#ffffff',       // Background color for the staged behind highlighted element
  nextBtnText: '下一步',              // Next button text for this step
  prevBtnText: '上一步',          // Previous button text for this step
  showButtons: true,               // Do not show control buttons in footer
  keyboardControl: false,            // Allow controlling through keyboard (escape to close, arrow keys to move)
  scrollIntoViewOptions: {},        // We use `scrollIntoView()` when possible, pass here the options for it if you want any
  onHighlightStarted: (Element) => {}, // Called when element is about to be highlighted
  onHighlighted: (Element) => {},      // Called when element is fully highlighted
  onDeselected: (Element) => {},       // Called when element has been deselected
  onReset: (Element) => {},            // Called when overlay is about to be cleared
  onNext: (Element) => {},                    // Called when moving to next step on any step
  onPrevious: (Element) => {},                // Called when moving to previous step on any step
});

// Define the steps for introduction
driver.defineSteps([
  {
    element: '#content-section-container',
    popover: {
      title: '文章列表',
      description: '伙伴们发表到社区的文章',
      position: 'right'
    },
    // onNext: () => {
    //   // Prevent moving to the next step
    //   driver.preventMove();

    //   // Perform some action or create the element to move to
    //   // And then move to that element
    //   setTimeout(() => {
    //     driver.moveNext();
    //   }, 4000);
    // }
  },
  {
    element: '#side-layout-area-menu-bar-left',
    popover: {
      className:'aaaa',
      title: '文章排行',
      description: '社区内所有文章排行榜',
      position: 'left'
    }
  },
]);

// Start the introduction
driver.start();
});
</script>

<style lang="scss" scoped>
.create-action {
  padding: 10px 20px;
  width: 100%;
  font-weight: 600;
}
</style>
