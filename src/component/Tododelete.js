import React from 'react';
import axios from 'axios'
import Trashicon from '../fontawesome/Trashicon';

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
        <div className="Deletebutton">
            <form onSubmit={this.handleFormDelete}><button className="Deleteicon" type="submit" title="삭제"><Trashicon size="3x"/></button></form>
        </div>
        )
    }
}

export default Tododelete

