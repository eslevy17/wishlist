import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            price: parseInt(this.props.price),
            list: this.props.list,
            id: this.props.id,
            purchased: this.props.purchased,
            editing: false,
            midEdit: false,
            purchasing: false,
            activeMonth: this.props.activeMonth,
            activeYear: this.props.activeYear
        }
    }

    delete() {
        this.props.delete(this.props.index, this.props.list, this.props.id);
    }

    edit() {
        this.setState({
            editing: true,
            purchasing: false
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            midEdit: true
        });
    }

    update(event) {
        event.preventDefault();
        let updatedItem = {
            id: this.state.id,
            name: this.state.name,
            price: parseInt(this.state.price),
            list: this.props.list
        }
        this.props.update(updatedItem, this.props.index, this.props.list);
        this.setState({
            editing: false,
            midEdit: false
        })
    }

    cancelEdit(event) {
        event.preventDefault();
        this.setState({
            editing: false,
            midEdit: false
        });
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
        this.props.purchase(this.state.name, parseInt(this.state.price), this.state.list, this.state.activeMonth, this.state.activeYear);
        this.delete();
        this.setState({
            purchasing: false,
            midEdit: false
        })
    }

    cancelPurchase(event) {
        event.preventDefault();
        this.setState({
            purchasing: false,
            midEdit: false
        })
    }

    componentDidUpdate() {
        if (this.state.purchasing && !this.state.midEdit) {
            document.getElementById('itemMonthSelector').options[new Date().getMonth()].selected = true;
            document.getElementById('itemYearSelector').options[1].selected = true;
        }
    }

    render() {
        var purchaseButton = null;
        if (!this.state.purchased) {
            purchaseButton = <span className="itemRowItem textAlignCenter"><button onClick={this.purchaseStart.bind(this)}>Purchase</button></span>
        }

        let standardForm =
            <React.Fragment>
                {purchaseButton}
                <span className="itemRowItem textAlignCenter"><button onClick={this.edit.bind(this)}>Edit</button></span>
                <span className="itemRowItem textAlignCenter"><button onClick={this.delete.bind(this)}>Delete</button></span>
            </React.Fragment>

        let editForm = null;
        let purchaseForm = null;

        if (this.state.editing) {
            standardForm = null;
            editForm =
                <div className="itemRow currentEdit">
                    <input className="itemRowItem" type="text" name="name" placeholder={this.props.name} value={this.state.name} onChange={this.handleChange.bind(this)} />
                    <input className="itemRowItem" type="number" name="price" min="0" placeholder={this.props.price} value={this.state.price} onChange={this.handleChange.bind(this)} />
                    <span className="itemRowItem textAlignCenter"><button onClick={this.update.bind(this)}>Update</button></span>
                    <span className="itemRowItem textAlignCenter"><button onClick={this.cancelEdit.bind(this)}>Cancel</button></span>
                </div>
        }

        if (this.state.purchasing) {
            var yearList = [];
            for (var i = -1; i < 2; i ++) {
                yearList.push(new Date().getFullYear() + i)
            }
            var newYearList = yearList.map(year =>
                <option key={year} value={year}>{year}</option>
            )

            standardForm = null;
            purchaseForm =
                <div className="itemRow currentEdit">
                    <select id="itemMonthSelector" name="activeMonth" className="itemRowItem" onChange={this.handleChange.bind(this)}>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <select id="itemYearSelector" name="activeYear" className="itemRowItem" onChange={this.handleChange.bind(this)}>
                        {newYearList}
                    </select>
                    <span className="itemRowItem textAlignCenter"><button onClick={this.purchaseConfirm.bind(this)}>Purchase!</button></span>
                    <span className="itemRowItem textAlignCenter"><button onClick={this.cancelPurchase.bind(this)}>Cancel</button></span>
                </div>;
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
