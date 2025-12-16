<!--
 * @fileName: 
 * @Date: 2023-03-20 15:34:15
 * @Author: manYao.zhu
-->
<template>
  <div class="exchange-code" @click="exchangeCode">{{ state.text }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive<any>({
  display: false,
  text: '显示代码'
});
const exchangeCode = (evt) => {
  const nextHtml = evt.target.nextElementSibling;
  const innerHtml = nextHtml.querySelector('.material-theme-palenight');
  const height = innerHtml.clientHeight;
  state.display = !state.display;

  if (state.display) {
    nextHtml.style.height = height + 'px';
    state.text = '隐藏代码';
  } else {
    nextHtml.style.height = 0;
    state.text = '显示代码';
  }
};
</script>

<style>
.exchange-code {
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  text-align: center;
  padding: 5px 0;
  cursor: pointer;
  /* color: #10b981; */
  margin: 15px 0 0;
}
</style>
