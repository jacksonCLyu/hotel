import React, { Component } from 'react';
import { connect } from 'dva';

class User extends Component{
    render()
    {
        return <div>{this.props.name}aa</div>;
    }
}

export default connect(state => {
    const {name} = state.user;
    return { name };
})(User);