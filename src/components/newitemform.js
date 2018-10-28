import React, { Component } from 'react';

class NewItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        }
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handlePriceChange(event) {
        this.setState({
            price: parseInt(event.target.value)
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.name === ''){
            alert('Please enter a name!')
            return
        }
        if (this.state.price === ''){
            alert('Please enter a price!')
            return
        }
        this.props.handleSubmit(this.state, this.props.list);
        this.setState({
            name: '',
            price: ''
        })
        document.getElementById(this.props.list + 'Input').focus();
    }

    render() {
        return (
            <React.Fragment>
                <h4>Add new:</h4>
                <form className="gridForm" onSubmit={this.handleSubmit.bind(this)}>

                    <label className="gridFormLabel" htmlFor="name">Name:</label>
                    <input
                        id={this.props.list + 'Input'}
                        className="gridFormInput"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleNameChange.bind(this)}
                    />

                    <label className="gridFormLabel" htmlFor="price">Price:</label>
                    <input
                        className="gridFormInput"
                        type="number"
                        name="price"
                        min="0"
                        value={this.state.price}
                        onChange={this.handlePriceChange.bind(this)}
                    />

                <button className="gridFormSubmit" type="submit" value="Submit">Submit</button>

                </form>
            </React.Fragment>
        )
    }
}

export default NewItemForm;
