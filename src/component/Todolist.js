import React from 'react';
import Todocard from './Todocard'
import Addform from './Addform'

class Todolist extends React.Component{
    render(){
        return(
            <div className="Todolist">
                {this.props.todo ? this.props.todo.map(c =>{
                    if(this.props.menu === true && c.isdone === false){
                        return <Todocard id={c.id} content={c.content} isdone={c.isdone} stateRefresh={this.props.stateRefresh}/>
                    }else if(this.props.menu === false && c.isdone === true){
                        return <Todocard id={c.id} content={c.content} isdone={c.isdone} stateRefresh={this.props.stateRefresh}/>
                    }
                }):''}
                <Addform stateRefresh={this.props.stateRefresh}/>
            </div>
        )
    }
}

export default Todolist