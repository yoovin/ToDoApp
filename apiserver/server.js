const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('tododb.json')
const db = low(adapter)
const shortid = require('shortid')

// db.defaults({}).write()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Routers

// Read
app.get('/api/todo/:user', (req, res) => { 
    var user = req.params.user
    var todos = db.get(`${user}`).value()
    res.json(todos)
    // res.send(todos)
})

// Create
app.post('/api/todo', (req, res) => { 

  var user = req.body.user

  if(!req.body.content || user === null){
    console.log('todo add에서 404로 응답했음!')
  return res.status(400).send()
  }

  if(db.get(user).value() === undefined){
    db.set(user, []).write()
  }
  var newId = shortid.generate()
  db.get(user)
  .push({
    id: newId,
    content:req.body.content,
    isdone:false
  }).write()
  console.log(`user:${req.body.user} id:${newId} content:${req.body.content} 추가`)

  return res.status(200).send()
})

//Delete
app.post('/api/todo/delete/', (req, res)=>{ 
  var reqId = req.body.id
  db.get(`${req.body.user}`)
    .remove({id:reqId})
    .write()
  console.log(`user:${req.body.user} id: ${reqId} 삭제`)
  return res.status(200).send()
  
})

//Update
app.post('/api/todo/update', (req, res)=>{ 
  var reqId = req.body.id
  var reqContent = req.body.content
  db.get(`${req.body.user}`)
    .find({id:reqId})
    .assign({content:reqContent})
    .write()

    console.log(`user:${req.body.user} id: ${reqId} Content:${reqContent} 수정`)
    return res.status(200).send()
  }
)

//Donecheck 
app.post('/api/todo/isdone', (req, res) => { 
  var reqId = req.body.id
  var reqDone = req.body.isdone
  db.get(`${req.body.user}`)
    .find({id:reqId})
    .assign({isdone:reqDone})
    .write()
    console.log(`user:${req.body.user} id: ${reqId} ${reqDone.toString()} Checked`)
    return res.status(200).send()
    }
)

app.listen(port, ()=> console.log(`API 서버가 ${port}에서 돌아가는중!`))