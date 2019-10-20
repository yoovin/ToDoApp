import React from 'react';
import './App.scss';
import Todolist from './component/Todolist'
import Todoslide from './component/Todoslide';
import Headforanimate from './component/Headforanimate'
import Googlelogin from 'react-google-login'
import {GoogleLogout} from 'react-google-login'
import googleClientTemp from './googleClientTemp.json'

class App extends React.Component{

constructor(props){
  super(props)
  this.state = {
    todo:'',
    menu:true,
    user:null,
    name:null,
    login:false
  }
}

stateRefresh = () =>{
  this.callApi()
  .then(res => this.setState({todo:res}))
  .catch(err => console.log(err))
}

callApi = async () => {
  const response = await fetch(`/api/todo/${this.state.user}`)
  const body = await response.json()
  console.log('callApied!')
  return body
}

selectMenu = () => {
  !this.state.menu ? this.setState({menu:true}) : this.setState({menu:false})
}

responseGoogle = (res) => {
  console.log(res)
  window.sessionStorage.setItem('user', res.googleId)
  window.sessionStorage.setItem('name', res.profileObj.name)
  window.sessionStorage.setItem('login', true)
  this.setState({
    user: window.sessionStorage.getItem('user'),
    name: window.sessionStorage.getItem('name'),
    login: true
})
  this.stateRefresh()
}

logout = () => {
  // window.sessionStorage.clear()
  this.setState({login:false})
}

responseFail = (err) => {
  console.log(err)
}

componentDidMount(){
  this.setState({user: window.sessionStorage.getItem('user')})
  this.setState({name: window.sessionStorage.getItem('name')})
  this.setState({login: window.sessionStorage.getItem('login')})

  console.log(this.state)
  
  this.stateRefresh()

}

  render(){
    if(this.state.login){
      return(
        <body>
          <Headforanimate/>
          <GoogleLogout
            clientId={googleClientTemp.client_id}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.responseFail}
          ></GoogleLogout>
          <Todoslide menu={this.state.menu} selectMenu={this.selectMenu}/>
          <h1 className="title">{this.state.name}의 해야할일</h1>
          <Todolist user={this.state.user} 
          todo={this.state.todo} 
          menu={this.state.menu} 
          stateRefresh={this.stateRefresh}
          />
        </body>
        )
    }else {
      return(
        <Googlelogin
          clientId = {googleClientTemp.client_id}
          buttonText = "Sign in with Google"
          onSuccess = {this.responseGoogle}
          onFailure = {this.responseFail}
          coockePolicy={'single_host_origin'}
      /> )
    }
    
    
  }
}

export default App;