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
        this.setState({editing: true});
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

    purchase(event) {
        event.preventDefault();
        this.props.purchase(this.props.name, this.props.price);
        this.delete();
    }

    render() {
        let cancelButton = null;
        let deleteButton = <button onClick={this.delete.bind(this)}>Delete</button>
        let editButton = <button onClick={this.edit.bind(this)}>Edit</button>
        let updateButton = null;
        let editForm = null;
        let purchaseButton = <button onClick={this.purchase.bind(this)}>Purchase</button>

        let nameInput = <input type="text" name="name" placeholder={this.props.name} value={this.state.name} onChange={this.handleChange.bind(this)} />
        let priceInput = <input type="number" name="price" min="0" placeholder={this.props.price} value={this.state.price} onChange={this.handleChange.bind(this)} />

        if (this.state.editing) {
            updateButton = <button onClick={this.update.bind(this)}>Update</button>
            cancelButton = <button onClick={this.cancel.bind(this)}>Cancel</button>
            purchaseButton = null;
            editForm =
                        <div class="itemRow currentEdit">
                            <span className="itemRowItem">{nameInput}</span>
                            <span className="itemRowItem">{priceInput}</span>
                            <span className="itemRowItem">{updateButton}</span>
                            <span className="itemRowItem">{cancelButton}</span>
                        </div>;
            deleteButton = null;
            editButton = null;
            nameInput = null;
            priceInput = null;
        }

        return (
            <React.Fragment>
            <div id={this.props.name} className="itemRow">
                <span className="itemRowItem">{this.props.name}</span>
                <span className="itemRowItem">${this.props.price}</span>
                <span className="itemRowItem">{deleteButton}</span>
                <span className="itemRowItem">{editButton}</span>
                <span className="itemRowItem">{purchaseButton}</span>
            </div>
            {editForm}
            </React.Fragment>
        )
    }
}

export default Item;
