import React from 'react';
import axios from 'axios'

class Addform extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            todo:''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
    }

    addTodo = () =>{
        return axios({
            method:'post',
            url:'/api/todo',
            data:{
                content:this.state.todo
            }
        })
    }

    handleValueChange(e){
        this.setState({todo:e.target.value})
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.addTodo()
        .then((res) => {
            console.log(res.data)
            this.props.stateRefresh()
            this.setState({todo:''})
        })
    }

    render(){
        return(
            <div className="Addform">
                <form onSubmit={this.handleFormSubmit}>
                <input className="Todoinput" size={this.state.todo.length*2} type="text" name="content" value={this.state.todo} onChange={this.handleValueChange} placeholder="add Todo"></input>
                <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default Addform