<template>
  <div>
    <div>
      <h2>BoardUpdate</h2>
    </div>
    <div>
      <table>
        <tr>
          <th>제목</th>
          <td><input type="text" v-model="boardUpdateParam.title" /></td>
        </tr>
        <tr>
          <th>내용</th>
          <td><input type="text" v-model="boardUpdateParam.content" /></td>
        </tr>
      </table>
    </div>
    <div>
      <button @click="boardUpdate">수정</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BoardUpdate",
  data: () => ({
    // 글 수정이라는 것은 기존에 존재하던 내용을 바꾸는 것
    // 따라서 새로운 내용을 글 작성과 마찬가지로 보내줘야한다
    // update 쿼리를 떠올려보면 좋다
    // UPDATE Board SET title = ?, content = ? WHERE boardId = ?
    // 위의 쿼리문을 완성하기 위해서는 3개의 변수가 필요하다!!
    boardUpdateParam: {
      boardId: 0,
      title: "",
      content: "",
    },
  }),
  created() {
    console.log(this.$route.params);
    this.boardUpdateParam.boardId = this.$route.params.boardId;

    this.boardInfo();
  },
  methods: {
    // 글 수정 페이지로 왔을 때, 수정 전의 글 내용을 가져오기 위한 조회 용도
    // info와 거의 흡사하다
    boardInfo: function () {
      axios
        .get("http://localhost:8090/board/detail", {
          params: this.boardUpdateParam,
        })
        .then((result) => {
          console.log(result);
          // BE에 request를 보낼 때 사용했던 객체를 재활용해도 상관없음
          // 화면에 바인딩용도
          this.boardUpdateParam.title = result.data.title;
          this.boardUpdateParam.content = result.data.content;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally();
    },
    //실제 글 수정 request 메서드
    // 여기서부터는 글 작성과 거의 흡사하다
    boardUpdate: function () {
      // 이런것도 추가하면 좋음
      // confirm() 함수는 yes or no에 따라 boolean 값을 반환
      // 아니오를 클릭시, false 반환 => false 일때 return은 거기서 멈춘다는 뜻
      let updateCheck = confirm("글을 수정하시겠습니까?");
      if (updateCheck === false) {
        return;
      }
      axios
        .post("http://localhost:8090/board/boardUpdate", this.boardUpdateParam)
        .then((result) => {
          console.log(result);
          alert("글이 수정되었습니다.");
          // 쓰기 요청이 완료된 뒤 다시 글 목록으로 이동한다
          // 단순 이동이기 때문에 따로 parameter는 보내지 않는다.
          this.$router.push({
            name: "BoardMain",
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
  },
};
</script>

<style>
</style>