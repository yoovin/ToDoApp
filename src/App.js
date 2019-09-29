import React from 'react';
import './App.css';
import Todolist from './component/Todolist'

class App extends React.Component{

constructor(props){
  super(props)
  this.state = {
    todo:''
  }
}

stateRefresh = () =>{
  this.callApi()
  .then(res => this.setState({todo:res}))
  .catch(err => console.log(err))
}

callApi = async () => {
  const response = await fetch('/api/todo')
  const body = await response.json()
  console.log('callApied!')
  return body
}

componentDidMount(){
  this.callApi()
  .then(res => this.setState({todo:res}))
  .catch(err => console.log(err))
}

  render(){
    return(
      <div>
        <h1>Todos</h1>
        <Todolist todo={this.state.todo} stateRefresh={this.stateRefresh}/>
      </div>
    )
  }
}

export default App;