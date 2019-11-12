import React, { Component } from 'react';

class Counter extends Component {

    componentDidUpdate(prevProps, prevState){
        if(prevProps.counter.value !== this.props.counter.value){

        }
    }

    componentWillUnmount() {

    }

    state = {
        value:this.props.counter.value,
        tags: ["tag1","tag2","tag3"]
    };

    renderTags() {
        if (this.state.tags.length === 0) return <p>There are no tags</p>

        return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    }

    handleIncrement = (product) => {
        this.setState({value: this.state.value + 1})
    }

    doHandleIncrement = () => {
        this.handleIncrement({id: 1});
    };

    render() { 
        console.log('props',this.props);       
        return (
            
            // <div>
            //     {this.state.tags.length === 0 && "Please create a new tag"}
            //     {this.renderTags()}
            // </div>
                <div className="row">
                    <div className="col-1">
                        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                    </div>
                    <div className="col">
                        <button 
                            onClick = {() => this.props.onIncrement(this.props.counter)}
                            className="btn btn-secondary btn-sm"
                        >
                            +
                        </button>
                        <button 
                            onClick = {() => this.props.onDecrement(this.props.counter)}
                            className="btn btn-secondary btn-sm m-2"
                            disabled={this.props.counter.value === 0 ? "disabled":""}
                        >
                            -
                        </button>
                        <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                    
                    
                </div>
            );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";

        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;
        return value === 0 ? 'Zero' : value
    }
}
 
export default Counter;