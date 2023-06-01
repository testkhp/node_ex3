const express = require('express')
const app = express()
const port = 3000

//ejs 파일 사용하고 싶을 때?
app.set("view engine","ejs")
//정적파일들(css,js,img) 사용하고 싶을 때?
app.use(express.static('public'))

app.use(express.json()) //입력한 데이터값 객체형식으로 전달받음
app.use(express.urlencoded({ extended: true })) // 입력값을 한번더 검증하는 유효성 검사 진행

 
//라우터 설정
app.get('/', (req, res) => {
  res.render("index.ejs")
})

//글작성페이지
app.get('/insert', (req, res) => {
    res.render("insert.ejs")
})

//글작성후 해당 데이터들을 보여주는 상세페이지로 이동
// app.get  -> 입력값들이 주소창에 그대로 보여줌 
// 주소창내에서 데이터 수정가능  (게시글 목록 / 검색기능)

// app.post -> 보안설정 입력값이 노출되지 않음
// 회원가입,로그인,게시글 작성 등등

app.post('/detail', (req, res) => {
    //insert에서 넘겨준 데이터값 확인
    //get방식으로 form태그에서 입력한 데이터값을 담는 객체 query
    // console.log(req.query)
    //post방식으로 form태그에서 입력한 데이터값을 담는 개체 body
    // console.log(req.body)
    //form태그에서 넘겨받은 데이터값을 다른 ejs 파일에 전달 -> 출력
    /* 1. insert 에서 입력함 -> 
       2. url주소에 입력값 전달 -> 
       3.index.js 에 넘겨줌(자바스크립트 객체형식으로 변환) -> 
       4. 보여줄 페이지에 데이터값 전달
    */
    // res.render("detail.ejs",{users:req.query})
    res.render("detail.ejs",{users:req.body})
})


//서버가 시작이 됬을 때 사용되는 코드
app.listen(port, () => {
  console.log("서버가 정상적으로 실행되고 있습니다.")
})