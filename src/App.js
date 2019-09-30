import React from 'react';
import './App.css';
import Todolist from './component/Todolist'
import Todoslide from './component/Todoslide';

class App extends React.Component{

constructor(props){
  super(props)
  this.state = {
    todo:'',
    menu:true
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

selectMenu = () => {
  !this.state.menu ? this.setState({menu:true}) : this.setState({menu:false})

}

componentDidMount(){

  this.callApi()
  .then(res => this.setState({todo:res}))
  .catch(err => console.log(err))

}

  render(){
    return(
      <body>
        <Todoslide menu={this.state.menu} selectMenu={this.selectMenu}/>
        <h1 className="title">Todos</h1>
        <Todolist todo={this.state.todo} menu={this.state.menu} stateRefresh={this.stateRefresh}/>
      </body>
    )
  }
}

export default App;