const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.send();
})


router.get('/:id', (req, res) => {
	res.json();
})

router.post('/', (req, res) => {
	res.json();
})

router.put('/', (req, res) => {
	res.json();
})

router.delete('/', (req, res) => {
	res.json();
})

module.exports = router;





