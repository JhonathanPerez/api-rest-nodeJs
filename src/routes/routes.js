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

router.get('/', async (req, res) => {
	findAllUsers()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			console.log(err);
		})
})


router.get('/:id', async (req, res) => {
	try {
		const getUser = await findUserById(req.params.id);

		if (getUser.length !== 0) {
			res.json(getUser);
		} else {
			res.json({
				code: 400,
				msg: `The user doesn't exist :(`
			})
		}
	} catch (err) {
		console.log("We got an error: ", err);
	}
})

router.post('/', async (req, res) => {
	if (validateEmail(req.body.email)) {
		try {
			const getUser = await findUserByEmail(req.body.email);
			if (getUser.length == 0) {
				const user = await createUser(req.body.firstName, req.body.lastName, req.body.email)
				res.json(user);
			} else {
				res.json({
					code: 400,
					msg: "Email is already token"
				})
			}
		} catch (err) {
			console.log("We got an error: ", err);
		}
	} else {
		res.json({
			code: 400,
			msg: "Email is not valid, try again"
		})
	}
})

router.put('/:id', async (req, res) => {
	const getUser = await findUserById(req.params.id);

	if (validateEmail(req.body.email)) {

		if (getUser.length !== 0) {
			try {
				await updateUser(req.body.firstName, req.body.lastName, req.body.email, req.params.id);

				res.json({
					code: 200,
					msg: `The user was updated successfully :)`
				})
			} catch (err) {
				console.log(err);
			}
		} else {
			res.json({
				code: 400,
				msg: `The user doesn't exist :(`
			})
		}
	} else {
		res.json({
			code: 400,
			msg: `The email is not valid, try again`
		})
	}
})

router.delete('/:id', async (req, res) => {
	const getUser = await findUserById(req.params.id);

	if (getUser.length !== 0) {
		try {
			await deleteUser(req.params.id);

			res.json({
				code: 200,
				msg: `The user ${getUser[0].dataValues.email} was deleted successfully!`
			})
		} catch (err) {
			console.log(err);
		}
	} else {
		res.json({
			code: 400,
			msg: `The user doesn't exist :(`
		})
	}
})

module.exports = router;





