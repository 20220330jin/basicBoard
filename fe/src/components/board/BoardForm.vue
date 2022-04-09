<template>
  <div>
    <div>
      <h1>Board Form</h1>
    </div>
    <div>
      <div>
        <span>제목</span>
        <span>
          <input type="text" v-model="boardWriteParam.title" />
        </span>
      </div>
      <div>
        <span>내용</span>
        <span>
          <input type="text" v-model="boardWriteParam.content" />
        </span>
      </div>
    </div>
    <div>
      <button @click="boardWrite">등록</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardForm",
  data: () => ({
    boardWriteParam: {
      title: "",
      content: "",
    },
  }),
  methods: {
    boardWrite: function () {
      alert("아직 기능 구현 중입니다.");
    },
  },
};
</script>

<style>
</style>