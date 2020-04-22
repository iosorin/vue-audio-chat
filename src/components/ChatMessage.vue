<template>
  <div class="message" :class="{'owner': owner}">
    {{message.text}}
    <br />
    <audio v-if="message.audioUrl" :src="message.audioUrl" controls></audio>
    <span class="sender">FROM {{owner ? 'you' : message.sender}}</span>
  </div>
</template>

<script>
export default {
  props: ["message", "owner"]
};
</script>

<style>
.message {
  background: ghostwhite;
  color: black;
  border-radius: 5px;
  padding: 12px;
  display: inline-block;
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}
.owner {
  background: antiquewhite;
  margin-left: 10px;
  margin-right: auto;
}
</style>
