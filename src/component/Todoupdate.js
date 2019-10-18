import React from 'react';
import axios from 'axios'

class Todoupdate extends React.Component{

    state = {
        isModify:false,
        todo:this.props.content
    }
    textInput = null
    

    componentDidMount(){
        
    }

    setTag = () =>{
        if(this.state.isModify === false){
            return(<text onClick={this.handleInputText}>{this.props.content}</text>)
        }else if(this.state.isModify === true){
            return(
                <input 
                    className="Updatetext"
                    ref={ref => this.textInput = ref}
                    size={
                        this.state.todo.length*2 < 80
                        ? this.state.todo.length*2
                        : 80
                    } 
                    type="text" 
                    value={this.state.todo} 
                    onChange={this.handleValueChange}
                    onBlur={this.handleInputText}
                    ></input>
            )
        }
    }

    handleValueChange = (e)=>{
        this.setState({todo:e.target.value})
    }

    handleInputText = async () => {
        if(this.state.isModify === false) {
            await this.setState({isModify:true})
            await this.textInput.focus()
        }else if(this.state.todo.length === 0){

            await alert('내용은 한글자 이상 있어야 합니다!')
            await this.setState({isModify:false, todo:this.props.content})

        } else if(this.state.isModify === true && this.state.todo !== this.props.content){
            this.modifyTodo()
            .then((res)=>{
                console.log(res)
                this.setState({isModify:false})
                this.props.stateRefresh()
        })
        .catch(err=>console.log(err))
        }
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

    priventNullContent = async () => {
    }
    modifyTodo = ()=>{
        return axios({
            method:'post',
            url:'/api/todo/update',
            data:{
                user:this.props.user,
                id:this.props.id,
                content:this.state.todo
            }
        })
    }

    render(){
        return(<div className="Todotext">
            {this.setTag()}
            </div>)
    }
}

export default Todoupdate