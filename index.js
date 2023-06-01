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

//블로그 리스트에 뿌려줄 데이터들 준비 (추후에는 데이터베이스에서 세팅)
const blogData = [{
        no:1,
        title:"블로그 제목1",
        context:"해당 블로그 글 내용은 이러쿵 저러쿵 입니다.1",
        author:"관리자"
    },
    {
        no:2,
        title:"블로그 제목2",
        context:"해당 블로그 글 내용은 이러쿵 저러쿵 입니다.2",
        author:"관리자"
    },
    {
        no:3,
        title:"블로그 제목3",
        context:"해당 블로그 글 내용은 이러쿵 저러쿵 입니다.3",
        author:"관리자"
    },
    {
        no:4,
        title:"블로그 제목1",
        context:"해당 블로그 글 내용은 이러쿵 저러쿵 입니다.4",
        author:"관리자"
    },
    {
        no:5,
        title:"블로그 제목1",
        context:"해당 블로그 글 내용은 이러쿵 저러쿵 입니다.5",
        author:"관리자"
    },
    {
        no:6,
        title:"블로그 제목1",
        context:"해당 블로그 글 내용은 이러쿵 저러쿵 입니다.6",
        author:"관리자"
    }]

//블로그 리스트 페이지로
app.get('/bloglist', (req, res) => {
    res.render("blogList.ejs",{test:blogData})
})

//블로그 리스트에서 해당하는 목록 하나를 눌렀을 때 해당 상세페이지 화면으로 이동
//url parameter 웹브라우저 주소창에 데이터 실어서 보내주는 작업
app.get('/blogdetail/:no',(req,res)=>{
    //a태그에 주소에 포함되어 있는 데이터값을 출력할 때 사용   /blogdetail/5 <--- 데이터값
    // console.log(req.params.no)
    res.render("blogDetail.ejs",{data:blogData[req.params.no]})
})



//서버가 시작이 됬을 때 사용되는 코드
app.listen(port, () => {
  console.log("서버가 정상적으로 실행되고 있습니다.")
})