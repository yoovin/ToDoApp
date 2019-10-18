import React from 'react';
import Todocard from './Todocard'
import Addform from './Addform'

class Todolist extends React.Component{
    state = {
        height: 900
    }

    list = null

    render(){
        return(
            <div className="Todolist">
                {this.props.menu === true ? <Addform user={this.props.user} stateRefresh={this.props.stateRefresh}/> : ''}
                {this.props.todo ? this.props.todo.map(c =>{
                    if(this.props.menu === true && c.isdone === false){
                        return <Todocard user={this.props.user} id={c.id} content={c.content} isdone={c.isdone} stateRefresh={this.props.stateRefresh}/>
                    }else if(this.props.menu === false && c.isdone === true){
                        return <Todocard user={this.props.user} id={c.id} content={c.content} isdone={c.isdone} stateRefresh={this.props.stateRefresh}/>
                    }else{
                        return ''
                    }
                }):''}
            </div>
        )
    }
}

export default Todolist