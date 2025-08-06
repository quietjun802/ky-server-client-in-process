const express = require("express");
const router = express.Router()

let boards=require('../models/boardModel')


router.get('/',(req,res)=>{
    try {
        res.status(200).json({message:"전체 게시물 가져오기",boards})
    } catch (error) {
        res.status(500).json({message:"서버오류",error})
    }
})

router.get('/:id',(req,res)=>{
     try {
        const boardId = Number(req.params.id)

        const index = boards.findIndex(b => b.id === boardId);

        if (index === -1) {
            return res.status(404).json({ message: "없어" });
        }

        res.status(200).json({ message: "1개 조회 완료", board: boards[index] });
    } catch (error) {
        console.error("조회 중 오류", error);
        res.status(500).json({ message: "서버 내부 오류 발생" });
    }
});

router.post("/",(req,res)=>{
    try {
        const {title,content}=req.body

        if(!title||!content){
            return  res.status(400).json({message:"제목과 내용을 모두 입력하세요"})
        }

        const newBoard={
            id:Date.now(),
            title,
            content
        }
        boards.push(newBoard)
        res.status(200).json({ message: "게시물 등록 성공", board: boards });
    } catch (error) {
        res.status(500).json({ message: "서버 내부 오류 발생" });
    }
})

router.put('/:id',(req,res)=>{
     try {
        const boardId = Number(req.params.id)

        const index = boards.findIndex(b => b.id === boardId);

        if (index === -1) {
            return res.status(404).json({ message: "없어" });
        }

        const updateData = req.body

        boards[index]={
            ...boards[index],
            ...updateData
        }
        res.status(200).json({ message: "1개 게시물 수정하기", boards: boards[index] })

    } catch (error) {
        console.error("조회 중 오류", error);
        res.status(500).json({ message: "서버 내부 오류 발생" });
    }
});

router.delete("/:id",(req,res)=>{
    try {
        const boardId = Number(req.params.id)

        const index=boards.findIndex(u=>u.id===boardId)

        if(index===-1){
            return res.status(404).json({message:"삭제할 사용자가 없습니다."})
        }

        boards.splice(index,1)
        res.status(201).json({message:"사용자 1명 삭제 완료",boards})        
    } catch (error) {
        console.error("사용자 삭제중 오류",error)
        res.status(500).json({message:"서버 내부 오류 발생"})
        
    }
})



module.exports = router