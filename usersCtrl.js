const users = require('./userData.json');
let id = users.length + 1

module.exports = {

    getUsers(req, res) {
        let selectUsers = [];
        if(req.query.hasOwnProperty('age')){
            users.forEach((user) => {
                if(user.age < req.query.age) {
                    selectUsers.push(user)
                }
            })
            res.status(200).send(selectUsers)
        } 

        else if (req.query.hasOwnProperty('lastname')) {
            users.forEach((user) => {
                if(user.last_name === req.query.lastname){
                    selectUsers.push(user)
                }
            })
            res.status(200).send(selectUsers)
        }

        else if (req.query.hasOwnProperty('email')){
            users.forEach((user) => {
                if(user.email === req.query.email) {
                    selectUsers.push(user)
                }
            })
            res.status(200).send(selectUsers)
        }

        else if (req.query.hasOwnProperty('favorites')){
            users.forEach((user) => {
                user.favorites.forEach((fav) => {
                    if(fav === req.query.favorites){
                        selectUsers.push(user)
                    }
                })
            })
            res.status(200).send(selectUsers)
        } else {
            res.status(200).send(users)
        }
    },

    getUser(req, res) {
        users.forEach((user) => {
            if(user.id === +req.params.id){
                res.status(200).send(user)
            }
        })
        res.status(404).json(null)
        
    },

    getUserAdmins(req, res) {
        let selectUsers = [];
        users.forEach((user) => {
            if(user.type === 'admin'){
                selectUsers.push(user)
            }
        })
        res.status(200).send(selectUsers)
    },

    getNotAdmins(req, res) {
        let selectUsers = [];
        users.forEach((user) => {
            if(user.type !== 'admin'){
                selectUsers.push(user)
            }
        })
        res.status(200).send(selectUsers);
    },

    getAllType(req, res) {
        let selectUsers = [];
        users.forEach((user) => {
            if(user.type === req.params.type) {
                selectUsers.push(user);
            }
        })
        res.status(200).send(selectUsers);
    },

    updateUser(req,res) {
        const {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
        users.forEach((user) => {
            if(user.id === req.params.id){
                user.first_name = first_name
                user.last_name = last_name
                user.email = email
                user.gender = gender
                user.language = language
                user.age = age
                user.city = city
                user.state = state
                user.type = type;
                user.favorites = favorites;
            }
        })
        res.status(200).send(users);
    },

    createUser(req, res) {
        const {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
        users.push({
            id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            language: language,
            age: age,
            city: city,
            state: state,
            type: type,
            favorites: favorites
        });
        id++
        res.status(200).send(users);
    },

    deleteUser(req, res){
        users.forEach((user, index) => {
            if(user.id === +req.params.id){
                users.splice(index, 1)
            }
        })
        res.status(200).send(users)
    }

}