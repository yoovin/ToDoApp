import React from 'react';
import axios from 'axios'

class Todocard extends React.Component{
    constructor(props){
        super(props)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.handleFormDelete = this.handleFormDelete.bind(this)
      }

    deleteTodo(){
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
            <div>
                {this.props.id}
                <text>{this.props.content}</text>
                <button>완료</button>
                <button>수정</button>
                <form onSubmit={this.handleFormDelete}>
                    <button type="submit">삭제</button>
                </form>
                
            </div>
        )
    }
}

export default Todocard