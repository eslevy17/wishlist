import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price,
            editing: false,
        }
    }

    delete() {
        this.props.delete(this.props.index, this.props.list);
    }

    edit() {
        this.setState({editing: true})
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    update(event) {
        event.preventDefault();
        let updatedItem = {
            name: this.state.name,
            price: this.state.price
        }
        this.props.update(updatedItem, this.props.index, this.props.list);
        this.setState({
            editing: false
        })
    }

    cancel(event) {
        event.preventDefault();
        this.setState({editing: false});
    }

    render() {
        let cancelButton = null;
        let deleteButton = <button onClick={this.delete.bind(this)}>Delete</button>
        let editButton = <button onClick={this.edit.bind(this)}>Edit</button>
        let updateButton = null;
        let editForm = null;

        let nameInput = <input type="text" name="name" placeholder={this.props.name} value={this.state.name} onChange={this.handleChange.bind(this)} />
        let priceInput = <input type="number" name="price" min="0" placeholder={this.props.price} value={this.state.price} onChange={this.handleChange.bind(this)} />

        if (this.state.editing) {
            updateButton = <button onClick={this.update.bind(this)}>Update</button>
            cancelButton = <button onClick={this.cancel.bind(this)}>Cancel</button>
            editForm =
                        <tr>
                            <td>{nameInput}</td>
                            <td>{priceInput}</td>
                            <td>{updateButton}</td>
                            <td>{cancelButton}</td>
                        </tr>

            deleteButton = null;
            editButton = null;
            nameInput = null;
            priceInput = null;
        }

        return (
            <React.Fragment>
            <tr>
                <td>{this.props.name}</td>
                <td>${this.props.price}</td>
                <td>{deleteButton}</td>
                <td>{editButton}</td>
            </tr>
            {editForm}
            </React.Fragment>
        )
    }
}

export default Item;
