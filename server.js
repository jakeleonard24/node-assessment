const express = require ('express'),
      bodyParser = require('body-parser')
      usersCtrl = require('./usersCtrl');

const app = express();
app.use(bodyParser.json());

app.get('/api/users', usersCtrl.getUsers);
app.get('/api/users/:id', usersCtrl.getUser);
app.get('/api/admins', usersCtrl.getUserAdmins);
app.get('/api/nonadmins', usersCtrl.getNotAdmins);
app.get('/api/user_type/:type', usersCtrl.getAllType);
app.put('/api/users/:id', usersCtrl.updateUser);
app.post('/api/users', usersCtrl.createUser);
app.delete('/api/users/:id', usersCtrl.deleteUser);



const PORT = 3000;
app.listen(PORT, () => console.log('listening on port', PORT));