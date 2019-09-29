import React from 'react';
import axios from 'axios'

class Todoupdate extends React.Component{
    state = {
        isModify:false,
        todo:this.props.content
    }

    setTag = () =>{
        if(this.state.isModify === false){
            return(<text onClick={this.handleInputText}>{this.props.content}</text>)
        }else if(this.state.isModify === true){
            return(
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" value={this.state.todo} onChange={this.handleValueChange}></input>
                <button onClick={this.handleInputText}>취소</button>
                <input type="submit" value="수정"></input>
            </form>
            )
        }
    }

    handleValueChange = (e)=>{
        this.setState({todo:e.target.value})
    }

    handleInputText = () => {
        if(this.state.isModify === false) this.setState({isModify:true})
        else this.setState({isModify:false, todo:this.props.content})
    }

    handleFormSubmit = (e)=>{
        e.preventDefault()
        this.modifyTodo()
        .then((res)=>{
            console.log(res)
            this.setState({isModify:false})
            this.props.stateRefresh()
        })
        .catch(err=>console.log(err))
    }

    modifyTodo = ()=>{
        return axios({
            method:'post',
            url:'/api/todo/update',
            data:{
                id:this.props.id,
                content:this.state.todo
            }
        })
    }

    render(){
        return(
            this.setTag()
            )
    }
}

export default Todoupdate