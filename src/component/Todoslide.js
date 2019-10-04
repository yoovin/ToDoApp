import React from 'react';

class Todoslide extends React.Component{

    render(){
        if(this.props.menu){
            return(
            <div className="Donenav">
                <div className="Done" onClick={this.props.selectMenu}>Not Done</div>
            </div>
            )
        }
        else{
            return(
                <div className="Donenav">
                    <div className="Notdone" onClick={this.props.selectMenu}>Done</div>
                </div>
            )
        }
    }
}

export default Todoslide