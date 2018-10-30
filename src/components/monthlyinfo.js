import React, { Component } from 'react';
import Item from './item.js'

class MonthlyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: this.props.month,
            year: this.props.year,
            limit: 500,
            newLimit: 500,
            editingLimit: false,
            purchases: this.props.purchases,
        }
    }

    componentWillReceiveProps(newProps) {
        for (var newProp in newProps) {
            this.setState({[newProp]: newProps[newProp]});
        }
    }

    updatePurchasedItem(updatedItem, index, list, month, year) {
        this.props.updatePurchasedItem(updatedItem, index, list, this.state.month, this.state.year)
    }

    deletePurchasedItem(index, list) {
        this.props.deletePurchasedItem(index, list, this.state.month, this.state.year)
    }

    editLimit() {
        this.setState({editingLimit: true})
    }

    cancel() {
        this.setState({editingLimit: false})
    }

    handleLimitChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateLimit() {
        this.setState({
            limit: this.state.newLimit,
            editingLimit: false
        })
    }

    render() {
        var spent = 0;
        var limit = this.state.limit;
        var wants = [];
        var needs = [];
        if (this.props.purchases) {
            for (var i = 0; i < this.props.purchases.length; i ++) {
                spent += this.props.purchases[i].price;
                if (this.props.purchases[i].list === 'wants') {
                    wants.push(this.props.purchases[i])
                }
                if (this.props.purchases[i].list === 'needs') {
                    needs.push(this.props.purchases[i])
                }
            }

            wants = wants.map((item, index) =>
                <Item
                    name={item.name}
                    price={item.price}
                    key={item.name}
                    index={index}
                    activeMonth={this.state.month}
                    activeYear={this.state.year}
                    update={this.updatePurchasedItem.bind(this)}
                    delete={this.deletePurchasedItem.bind(this)}
                    list='wants'
                    purchased={true}
                />
            );

            needs = needs.map((item, index) =>
                <Item
                    name={item.name}
                    price={item.price}
                    key={item.name}
                    index={index}
                    activeMonth={this.state.month}
                    activeYear={this.state.year}
                    update={this.updatePurchasedItem.bind(this)}
                    delete={this.deletePurchasedItem.bind(this)}
                    list='needs'
                    purchased={true}
                />
            );
        }

        var spentbar;
        var limitbar;
        if (spent <= limit) {
            spentbar = <div className="spentBar" style={{width: (spent/limit) * 100 + '%'}}></div>
            limitbar = <div className="availableBar" style={{width: ((limit - spent)/limit) * 100 + '%'}}></div>
        }
        else {
            spentbar = <div className="spentBar" style={{width: '100%'}}></div>
            limitbar = null;
        }
        var editLimitButton = <button onClick={this.editLimit.bind(this)}>Edit</button>;
        if (this.state.editingLimit) {
            editLimitButton =
                <React.Fragment>
                    <input
                        type="number"
                        name="newLimit"
                        className="skinnyInput"
                        value={this.state.newLimit}
                        placeholder={this.state.newLimit}
                        onChange={this.handleLimitChange.bind(this)}
                    ></input>
                    <button onClick={this.updateLimit.bind(this)}>Update</button>
                    <button onClick={this.cancel.bind(this)}>Cancel</button>
                </React.Fragment>
        }

        return (
            <div className="monthlyInfo">
                <h3>Details for: {this.state.month} of {this.state.year}</h3>
                <span className="limitRow">
                    <p><b>Spent:</b> ${spent}</p>
                    <p><b>Available:</b> ${this.state.limit - spent}</p>
                    <p><b>Limit: </b> ${this.state.limit} {editLimitButton}</p>
                </span>
                <div className="progressBar">
                    {spentbar}
                    {limitbar}
                </div>

                <div className="purchasesThisMonth">
                    <div>
                        <span className="centerMe"><h4>Wants:</h4></span>
                        <div>{wants}</div>
                    </div>
                    <div>
                        <span className="centerMe"><h4>Needs:</h4></span>
                        <div>{needs}</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MonthlyInfo;
