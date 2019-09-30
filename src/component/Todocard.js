import React from 'react';
import Tododelete from './Tododelete';
import Todoupdate from './Todoupdate';
import Isdonecheck from './Isdonecheck';


class Todocard extends React.Component{

    render(){
        return(
            <div className="todocard">
                <Todoupdate id={this.props.id}  content={this.props.content} stateRefresh={this.props.stateRefresh}/>
                <Isdonecheck id={this.props.id} isdone={this.props.isdone} stateRefresh={this.props.stateRefresh}/>
                <Tododelete id={this.props.id}  stateRefresh={this.props.stateRefresh}/>
            </div>
        )
    }
}

export default Todocard