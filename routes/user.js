const express = require("express")
const router = express.Router()

router.post('/:id',(req,res)=>{
    res.send("사용자 등록 완료")
})
router.get('/',(req,res)=>{
    res.send("사용자 전체 목록")
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    res.send(`사용자 1명 목록 :${id}`)
})
router.put('/',(req,res)=>{
    res.send("사용자 1명 수정")
})
router.delete('/:id',(req,res)=>{
    const id=req.params.id
    res.send(`사용자 1명 삭제 :${id}`)
})
module.exports=router