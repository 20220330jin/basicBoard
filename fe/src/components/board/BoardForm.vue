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
import axios from 'axios';
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
      // INSERT 관련 요청은 POST방식을 쓴다
      axios.post('http://localhost:8090/board/boardWrite', this.boardWriteParam)
        .then(result => {
          console.log(result);
          // 쓰기 요청이 완료된 뒤 다시 글 목록으로 이동한다
          // 단순 이동이기 때문에 따로 parameter는 보내지 않는다.
          this.$router.push({
            name: 'BoardMain'
          })
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {})
    },
  },
};
</script>

<style>
</style>