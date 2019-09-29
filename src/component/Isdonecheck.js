import React from 'react';
import axios from 'axios'

class Isdonecheck extends React.Component{
    state={
        carddone:this.props.isdone
    }


    handleChecked = () =>{
        this.setState({carddone:!this.state.carddone})
        this.doneTodo()
        .then((res)=>{
            console.log(res)
            this.props.stateRefresh()
        })
    }

    doneTodo = () => {
        return axios({
            method:'post',
            url:'/api/todo/isdone',
            data:{
                id:this.props.id,
                isdone:!this.state.carddone
            }
        })
    }

    render(){
        return(
            <input type="checkbox" onChange={this.handleChecked} defaultChecked={this.props.isdone}></input>
        )
    }
}

export default Isdonecheck