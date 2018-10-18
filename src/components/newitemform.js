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
    }

    render() {
        return (
            <React.Fragment>
                <h4>Add new:</h4>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <table className="newItemForm">
                        <tbody>
                        <tr>
                            <th><label htmlFor="name">Name:</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleNameChange.bind(this)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><label htmlFor="price">Price:</label></th>
                            <td>
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    value={this.state.price}
                                    onChange={this.handlePriceChange.bind(this)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </React.Fragment>
        )
    }
}

export default NewItemForm;
