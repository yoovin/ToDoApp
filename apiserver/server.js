const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

var todos = [
    {
        id:1,
        content:'밥먹기',
        isdone: false
      },
      {
        id:2,
        content:'잠자기',
        isdone: true
      },
      {
        id:3,
        content: '화장실가기',
        isdone: false
      },
      {
        id:4,
        content: '놀러가기',
        isdone: false
      }
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/todo', (req, res)=>{ // read
    res.json(todos)
})

app.post('/api/todo', (req, res) => { // add

  if(!req.body.content){
  return res.status(400).send()
  }

  var newId = !todos.length ?
   1 : todos[todos.length -1].id + 1

   var newTodo = {
     id:newId,
     content:req.body.content,
     isdone:false
   }
  todos.push(newTodo)
  console.log(`id ${newId} content:${req.body.content} 추가`)
  console.log(req.body)
})

app.post('/api/todo/delete/', (req, res)=>{
  reqId = req.body.id
  for(var i=0; i<todos.length; i++){
    if(todos[i].id === reqId){
      todos.splice(i,1)
      console.log(`id: ${reqId} 삭제`)
    }
  }
  
})

app.listen(port, ()=> console.log(`API 서버가 ${port}에서 돌아가는중!`))