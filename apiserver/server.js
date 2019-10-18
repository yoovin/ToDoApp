const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('tododb.json')
const db = low(adapter)
const shortid = require('shortid')

db.defaults({user1:[], user2:[]}).write()
// db.set("user3", []).write() 새로 테이블 만들기

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/todo/:user', (req, res)=>{ // read
    var user = req.params.user
    var todos = db.get(`${user}`).value()
    res.json(todos)
})

app.post('/api/todo', (req, res) => { // add

  if(!req.body.content){
    console.log('todo add에서 404로 응답했음!')
  return res.status(400).send()
  }

  var newId = shortid.generate()
  db.get(`${req.body.user}`)
  .push({
    id: newId,
    content:req.body.content,
    isdone:false
  }).write()
  console.log(`id ${newId} content:${req.body.content} 추가`)

  return res.status(200).send()
})

app.post('/api/todo/delete/', (req, res)=>{ //delete
  var reqId = req.body.id
  db.get(`${req.body.user}`)
    .remove({id:reqId})
    .write()
  console.log(`id: ${reqId} 삭제`)
  return res.status(200).send()
  
})

app.post('/api/todo/update', (req, res)=>{ //update
  var reqId = req.body.id
  var reqContent = req.body.content
  db.get(`${req.body.user}`)
    .find({id:reqId})
    .assign({content:reqContent})
    .write()

    console.log(`id: ${reqId} Content:${reqContent} 수정`)
    return res.status(200).send()
  }
)

app.post('/api/todo/isdone', (req, res) => { //isdone 
  var reqId = req.body.id
  var reqDone = req.body.isdone
  db.get(`${req.body.user}`)
    .find({id:reqId})
    .assign({isdone:reqDone})
    .write()
    console.log(`id: ${reqId} ${reqDone.toString()} Checked`)
    return res.status(200).send()
    }
)
app.listen(port, ()=> console.log(`API 서버가 ${port}에서 돌아가는중!`))