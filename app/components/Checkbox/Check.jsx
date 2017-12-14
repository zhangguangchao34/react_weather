import React from 'react';
import { Link } from 'react-router';
import './Check.css';

// common less
import '../../libs/styles/bootstrap.min.css';
import '../../styles/main.css';
require('bootstrap');


const Check = React.createClass({
    getInitialState() {
        return {
            check: false,
            options: this.props.options,
            callbackList: []
        }
    },

    onChangeCheckbox: function(e){
        var target = e.target;
        var index = e.target.getAttribute('data-index');
        var value = e.target.getAttribute('data-value');
        var options = this.state.options;
        var callbackList = this.state.callbackList;
       

        options[index].value = value;
        options[index].checked =  !options[index].checked;

        if(options[index].checked) {
            callbackList.push({key: index, value: value});
        }else {
            for(var i = 0; i < callbackList.length; i ++){
                if(callbackList[i].value === value){
                    callbackList.splice(i,1);
                    break;
                }
            }
        }

        this.setState({
            options: options
        });

        if(this.props.callback){
            this.props.callback(callbackList);
        }

    },
    resetState: function(option){
        this.setState({
            options: option
        });
    },

    renderSimpleCheck: function(){
        var list = [];
        var _this = this;
        var options = this.state.options;

        $.map(options, function(item, index){
            list.push(<li key={index} ><input type="checkbox" data-index={index} data-value={item.value} checked={item.checked} onChange={_this.onChangeCheckbox}/>
                <label>{item.text}</label></li>);
        });
        

//  <input type="checkbox" checked={this.state.check} onChange={this.onChangeCheckbox}/>
                // <label>bbb</label>
        return list;
    },

    render() {
        return (
           <div>
                <ul>
                    {this.renderSimpleCheck()}
                </ul>
               
           </div>
        )
    }
});

export default Check