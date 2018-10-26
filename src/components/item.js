import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price,
            editing: false,
            purchasing: false,
            activeMonth: this.props.activeMonth,
            activeYear: this.props.activeYear
        }
    }

    delete() {
        this.props.delete(this.props.index, this.props.list);
    }

    edit() {
        this.setState({
            editing: true,
            purchasing: false
        });
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

    cancelEdit(event) {
        event.preventDefault();
        this.setState({editing: false});
    }

    purchaseStart(event) {
        event.preventDefault();
        this.setState({
            purchasing: true,
            editing: false
        })
    }

    purchaseConfirm(event) {
        event.preventDefault();
        this.props.purchase(this.state.name, this.state.price, this.state.activeMonth, this.state.activeYear);
        this.delete();
        this.setState({
            purchasing: false,
        })
    }

    cancelPurchase(event) {
        event.preventDefault();
        this.setState({purchasing: false})
    }

    render() {
        let standardForm =
            <React.Fragment>
                <span className="itemRowItem"><button onClick={this.delete.bind(this)}>Delete</button></span>
                <span className="itemRowItem"><button onClick={this.edit.bind(this)}>Edit</button></span>
                <span className="itemRowItem"><button onClick={this.purchaseStart.bind(this)}>Purchase</button></span>
            </React.Fragment>

        let editForm = null;
        let purchaseForm = null;

        if (this.state.editing) {
            standardForm = null;
            editForm =
                <div className="itemRow currentEdit">
                    <input className="itemRowItem" type="text" name="name" placeholder={this.props.name} value={this.state.name} onChange={this.handleChange.bind(this)} />
                    <input className="itemRowItem" type="number" name="price" min="0" placeholder={this.props.price} value={this.state.price} onChange={this.handleChange.bind(this)} />
                    <span className="itemRowItem"><button onClick={this.update.bind(this)}>Update</button></span>
                    <span className="itemRowItem"><button onClick={this.cancelEdit.bind(this)}>Cancel</button></span>
                </div>
        }

        if (this.state.purchasing) {
            standardForm = null;
            purchaseForm =
                <div className="itemRow currentEdit">
                    <select className="itemRowItem">
                        <option>{this.props.activeMonth}</option>
                    </select>
                    <select className="itemRowItem">
                        <option>{this.props.activeYear}</option>
                    </select>
                    <span className="itemRowItem"><button onClick={this.purchaseConfirm.bind(this)}>Purchase!</button></span>
                    <span className="itemRowItem"><button onClick={this.cancelPurchase.bind(this)}>Cancel</button></span>
                </div>
        }

        return (
            <React.Fragment>
            <div id={this.props.name} className="itemRow">
                <span className="itemRowItem">{this.props.name}</span>
                <span className="itemRowItem">${this.props.price}</span>
                {standardForm}
            </div>
            {editForm}
            {purchaseForm}
            </React.Fragment>
        )
    }
}

export default Item;