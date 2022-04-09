<template>
  <div>
    <div>Here is BoardInfo</div>
    <div>
      <div>제목: {{ boardInfoParam.title }}</div>
      <div>내용: {{ boardInfoParam.content }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BoardInfo",
  data: () => ({
    boardInfoParam: {
      boardId: 0,
      title: "",
      content: "",
    },
  }),
  created() {
    // vue life-cycle: created()
    // created 시점에 vue에서 data binding 작업이 일어난다
    // boardInfo(글 상세)같은 경우, router push에 의해 해당 글의 상세로 이동 되었을 때,
    // 따로 버튼을 누르는 등의 행동이 없더라도 해당 글의 내용이 화면상에 자동으로 매핑되어야한다.
    // 따라서 vue component가 초기화 되는 시점에 해당 글의 정보를 조회한 뒤 변수를 바인딩하고 화면을 매핑해야 한다.

    // BoardMain으로 부터 router push로 이쪽으로 넘어올 때 보냈던 parameter를 확인하자
    // console로 this를 찍어보면 많은 부분들이 정의되어 있고, data들을 확인할 수 있다.
    // router parameter를 확인하기 위해서는
    // this.$route 부분을 console에 찍어보면 확읺가능하다
    // 글 내용 조회는 특정 id에 해당하는 내용을 조회하는 것이기 때문에
    // BE에 조회 요청시 글의 id값을 같이 보내주어야한다.
    console.log(this.boardId);
    console.log(this.$route.params.boardId);
    this.boardInfo();
  },
  methods: {
    boardInfo: function () {
      // BE로 보낼 파라미터 => 객체형식
      // boardInfoParam이라는 객체에 boardId값을 세팅하여 보낼 예정
      // 현재 글에 대한 상세를 받아와야하기 때문에, router push를 통해 받아온 id값을 여기서 세팅
      // boardInfoParam에는 id, title, content가 있고, 사실 FE BE 세팅을 맞춰야한다 했지만, 보낼 때 값이 없어도되긴함..ㅋ

      // result의 자료형을 확인하고 화면에 매핑을 위한 data 바인딩 작업을 then절에서 해줘야함
      this.boardInfoParam.boardId = this.$route.params.boardId;
      axios
        .get("http://localhost:8090/board/detail", {
          params: this.boardInfoParam,
        })
        .then((result) => {
          console.log(result);
          // BE에 request를 보낼 때 사용했던 객체를 재활용해도 상관없음
          // 화면에 바인딩용도
          this.boardInfoParam.title = result.data.title;
          this.boardInfoParam.content = result.data.content;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally();
    },
  },
};
</script>

<style>
</style>