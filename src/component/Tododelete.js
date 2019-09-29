import React from 'react';
import axios from 'axios'

class Tododelete extends React.Component{
    constructor(props){
        super(props)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.handleFormDelete = this.handleFormDelete.bind(this)
      }
    
    deleteTodo = () => {
        return axios({
            method:'post',
            url:'/api/todo/delete',
            data:{
                id:this.props.id
            }
        })
    } 
    
    handleFormDelete(e){
        e.preventDefault()
        this.deleteTodo()
        .then((res)=>{
            console.log(res.data)
            this.props.stateRefresh()
        })
        .catch(err=>console.log(err))
    }
    
    render(){
        return(
            <form onSubmit={this.handleFormDelete}>
                    <button type="submit">삭제</button>
                </form>
        )
    }
}

export default Tododelete

