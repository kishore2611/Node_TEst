const router = require('express').Router()
const { register, login } = require('../controllers/AuthController');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authentication')



//AUTH
router.post('/register', register)
router.post('/logIn', login)



//CRUD
router.get('/getUser', verifyToken, getUser)
router.put('/updateUser', verifyToken, updateUser)
router.delete('/deleteUser', verifyToken, deleteUser)





module.exports = router;