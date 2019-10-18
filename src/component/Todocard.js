import React from 'react';
import Tododelete from './Tododelete';
import Todoupdate from './Todoupdate';
import Isdonecheck from './Isdonecheck';
import {Animated} from "react-animated-css";


class Todocard extends React.Component{

    render(){
        return(
            <Animated animationIn="fadeIn" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                <div className="todocard" >
                    <Todoupdate user={this.props.user} id={this.props.id}  content={this.props.content} stateRefresh={this.props.stateRefresh}/>
                    <Isdonecheck user={this.props.user} id={this.props.id} isdone={this.props.isdone} stateRefresh={this.props.stateRefresh}/>
                    <Tododelete user={this.props.user} id={this.props.id}  stateRefresh={this.props.stateRefresh}/>
                </div>
            </Animated>
        )
    }
}

export default Todocard