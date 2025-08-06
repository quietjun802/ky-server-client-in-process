const express = require("express");
const router = express.Router();

// 메모리 데이터
let books = [
  { id: 1, title: "javascript", auther: "김**" },
  { id: 2, title: "html",       auther: "김**" },
  { id: 3, title: "css",        auther: "김**" },
];

let initId =4

const findeIndexId = (idParam) => {
  return books.findIndex(b => b.id === Number(idParam));
};


router.post('/', (req, res) => {
  const { title, auther } = req.body;

  if (typeof title !== 'string' || title.trim() === '' ||
      typeof auther !== 'string' || auther.trim() === '') {
        return res.status(400).json({ message: "title, auther가 비어있습니다." });
  }

  const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
  const newBook = {
    id: maxId + 1,
    title: title.trim(),
    auther: auther.trim()
  };

  books.push(newBook);

  res.status(201).json({
    message: "도서 등록 완료",
    books
  });
});


router.get('/',(req,res)=>{
  try {
    res.status(200).json({message:"전체도서 가져오기",books})
  } catch (error) {
    console.error("전체 도서 가져오기 중 오류")
    res.status(500).json({message:"서버오류"})
  }
})

router.get('/:id', (req, res) => {
  const bookId = req.params.id;
  const index = findeIndexId(bookId);

  if (index === -1) {
    return res.status(404).json({ message: "해당 도서를 찾을 수 없습니다." });
  }

  res.status(200).json({
    message: "도서 조회 성공",
    book: books[index]
  });
});

router.put("/:id", (req, res) => {
  try {
    const bookId = Number(req.params.id);

    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
      return res.status(404).json({ message: "해당 도서를 찾을 수 없습니다." });
    }

    const updateData = req.body;

    books[index] = {
      ...books[index],
      ...updateData,
    };

    res.status(200).json({
      message: "도서 정보 수정 완료",
      book: books[index],
    });
  } catch (error) {
    console.error("도서 수정 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});


module.exports=router