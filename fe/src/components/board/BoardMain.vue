<template>
  <div>
    <!-- 제목 부분 -->
    <div>
      <h1>BoardMain</h1>
    </div>
    <!-- 내용 부분: table 형식으로 글 목록을 뿌려준다 -->
    <div>
      <table style="border: 1px solid">
        <!-- table header -->
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>기타</th>
        </tr>
        <!-- table contents -->
        <!-- 반복문이 실행되는 곳: 왜? 반복되는 것은 내용이나까 -->
        <!-- axios request를 쏜 뒤 받은 response를 data()에 선언한 boardList 배열에 담고, 여기서 뿌려준다! -->
        <!-- 제목 클릭시 해당 글의 상세로 이동 -->
        <!-- 상세로 이동하기 위한 메서드 호출: 호출시 해당 글의 id값을 같이 보낸다. -->
        <tr v-for="(board, index) in boardList" :key="index">
          <td>{{ index + 1 }}</td>
          <td style="cursor: pointer" @click="boardInfoBind(board.boardId)">{{ board.title }}</td>
          <td></td>
        </tr>
      </table>
    </div>
    <!-- 버튼 부분 -->
    <div>
      <button @click="boardWriteBind">글 쓰기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BoardMain",
  data: () => ({
    // 화면에 바인딩하거나 response로 오는 data를 받기위해 객체형식으로 변수 선언
    // 추후 뿌려줄 내용에 따라 추가가능
    // 현재는 title만
    board: {
      title: "",
    },
    // response는 일반적으로 배열로 내려온다. 따라서 배열을 받을 준비를 하자
    // result를 배열에 담고 template에서 해당 배열을 v-for로 뿌려준다
    boardList: [],
  }),

  created() {
    this.search();
  },
  methods: {
    // 전체 글 목록을 조회하는 메서드
    // 최초에는 검색조건이 없기때문에 request할 때, 따로 보내는 parameter가 없으나 추후 추가 가능
    search: function () {
      console.log("search");
      // get 방식의 request: 일반적으로 조회하는 기능을 수행할 때 get을 쓴다
      // BE의 url 및 BE로 보낼 파라미터를 세팅
      // 데이터를 조회 후 받아온 result가 then -> catch -> finally순으로 실행됨
      axios
        .get("http://localhost:8090/board/boardList", {
          params: this.board,
        })
        .then((result) => {
          console.log(result);
          // result를 data()에 정의해놓은 boardList에 담아서 template에 뿌려주자
          // result가 어떤 자료형으로 오는지 직접 콘솔로 찍어서 확인 후 맞는 자료형에 담아준다
          this.boardList = result.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally();
    },
    boardWriteBind: function () {
      this.$router.push({
        name: 'BoardForm',
      })
    },
    
    // 글 상세 페이지 이동을 위한 메서드
    // template 화면으로부터 특정 글을 클릭했을 때 실행되는 메서드
    // 클릭되는 순간 해당 글의 id값을 전달 하고, 여기 메서드에서 해당 id값을 전달 받는다.
    boardInfoBind: function(boardId){
      // router push를 사용하기 위해서는 이동하고자 하는 컴포넌트의 이름 또는 path(경로)를 알아야한다
      // 둘 중 하나를 알면 선택하여 이동할 수 있다.
      // path 또는 name은 router에서 미리 정의 해놓아야한다.
      // 또한 보낼 때, 현재 component에서 이동할 component로 파라미터를 보낼 수 있다.
      this.$router.push({
        name:'BoardInfo',
        params: {
          boardId: boardId
        }
      })

    }
  },
};
</script>

<style lang="scss" scoped>
</style>