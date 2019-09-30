import React from 'react';
import Todocard from './Todocard'
import Addform from './Addform'

class Todolist extends React.Component{
    render(){
        return(
            <div className="Todolist">
                {this.props.todo ? this.props.todo.map(c =>{
                    return <Todocard id={c.id} content={c.content} isdone={c.isdone} stateRefresh={this.props.stateRefresh}/>
                }):''}
                <Addform stateRefresh={this.props.stateRefresh}/>
            </div>
        )
    }
}

export default Todolist