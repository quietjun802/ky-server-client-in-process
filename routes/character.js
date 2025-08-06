const express = require("express");
const router = express.Router();

let characters = require("../models/characterModel");

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: '전체 캐릭터 가져오기',
            characters
        });
    } catch (error) {
        res.status(500).json({ message: "서버오류", error });
    }
});

router.get('/:id', (req, res) => {
    try {
        const characterId = Number(req.params.id);
        const character = characters.find(item => item.id === characterId);

        if (!character) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없음' });
        }

        return res.status(200).json({
            message: '캐릭터 1명 가져오기',
            character
        });
    } catch (error) {
        res.status(500).json({ message: "서버오류", error });
    }
});

router.post('/', (req, res) => {
    try {
        const { name, level, isOnline } = req.body;

        if (!name || level===undefined) {
            return res.status(400).json({ message: '이름과 레벨을 모두 입력하세요' });
        }

        const newChar = {
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false
        };

        characters.push(newChar);

        res.status(201).json({ message: '캐릭터 등록 성공', characters });
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});

// 1개 데이터 수정하기
router.put('/:id', (req, res) => {
    try {
        const characterId = Number(req.params.id);
        const index = characters.findIndex(item => item.id === characterId);

        if (index === -1) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없음' });
        }

        const updateData = req.body;

        characters[index] = {
            ...characters[index],
            ...updateData
        };

        res.status(200).json({
            message: '캐릭터 수정 완료',
            character: characters[index]
        });
    } catch (error) {
        res.status(500).json({ message: "서버오류", error });
    }
});

// 1개 데이터 삭제하기
router.delete('/:id', (req, res) => {
    try {
        const characterId = Number(req.params.id)
        const index = characters.findIndex(item => item.id === characterId)

        if (index === -1) {
            return res.status(404).json({ message: '게시물을 찾을수 없음' })
        }

        characters.splice(index,1)
        res.status(200).json({
            message: '1개 게시물 삭제하기 완료',
            characters
        })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})


module.exports = router;
