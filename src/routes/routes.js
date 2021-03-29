const { Router } = require('express');
const router = Router();
const { Users } = require('../../models');


const findAllUsers = async () => {
	try {
		return await Users.findAll();
	} catch (err) {
		console.log("We got an error: ", err);
	}
}

const findUserByEmail = async (email) => {
	try {
		return await Users.findAll({
			where: {
				email: email
			}
		});
	} catch (err) {
		console.log("We got an error: ", err);
	}
}

const findUserById = async (id) => {
	try {
		return await Users.findAll({
			where: {
				id: id
			}
		});
	} catch (err) {
		console.log("We got an error: ", err);
	}
}

const createUser = async (firstName, lastName, email) => {
	try {
		return await Users.create({
			firstName: firstName,
			lastName: lastName,
			email: email
		});
	} catch (err) {
		console.log("We got an error: ", err);
	}
}

const updateUser = async (firstName, lastName, email, id) => {
	try {
		await Users.update({
			firstName: firstName,
			lastName: lastName,
			email: email
		},
			{
				where: {
					id: id
				}
			});
	} catch (err) {
		console.log("We got an error on update: ", err);
	}
}

const deleteUser = async (id) => {
	try {
		await Users.destroy({
			where: {
				id: id
			}
		});
	} catch (err) {
		console.log(err);
	}
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

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





