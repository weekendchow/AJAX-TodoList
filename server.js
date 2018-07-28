const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let lists = [
  {
    id: 1,
    name:'MERN'
  },
  {
    id:2,
    name:'express'
  },
  {
    id:3,
    name:'react'
  }
];

let currentId = 3;

const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());

app.get('/lists', (req, res) => {
  res.send({ lists: lists });
});

app.post('/lists', (req, res) => {
  let listName = req.body.name;
  currentId++;

  lists.push({
    id: currentId,
    name: listName
  });

  res.send('Successful created!');
})

app.put('/lists/:id', (req, res) => {
  let id = req.params.id;
  let newName = req.body.newName;
  let found = false;

  lists.forEach((list, index) => {
    if(!found && list.id === Number(id)){
      list.name = newName;
    }
  });

  res.send('Successful updated!')
});

app.delete('/lists/:id', (req, res) => {
  let id = req.params.id;

  let found = false;

  lists.forEach((list, index) => {
    if(!found && list.id === Number(id)){
      lists.splice(index, 1);
    }
  });

  res.send('Successful deleted!')
})


app.listen(PORT, () => {
  console.log('Server listening on ' + PORT)
});
