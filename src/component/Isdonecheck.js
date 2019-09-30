import React from 'react';
import axios from 'axios'
import Checkicon from '../fontawesome/Checkicon'

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
            <div className="Isdonecheck">
                <button className="Checkicon" title={this.state.carddone ? "취소" : "완료"}
                onClick={this.handleChecked}><Checkicon size="3x"/></button>
            </div>
        )
    }
}

export default Isdonecheck