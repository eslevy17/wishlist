import React, { Component } from 'react';

class MonthlyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: this.props.month,
            year: this.props.year,
            limit: 500,
            purchases: this.props.purchases,
        }
    }

    componentWillReceiveProps(newProps) {
        for (var newProp in newProps) {
            this.setState({[newProp]: newProps[newProp]});
        }
    }

    editPurchasedItem(index) {

    }

    render() {
        var spent = 0;
        var purchases = <li>Nothing yet!</li>;
        if (this.props.purchases) {
            for (var i = 0; i < this.props.purchases.length; i ++) {
                spent += this.props.purchases[i].price
            }
            purchases = this.props.purchases.map((purchase, index) =>
                <li key={index}>
                    {purchase.name} (${purchase.price})
                    <button onClick={this.editPurchasedItem.bind(this, index)}>Edit</button>
                </li>
            )
        }

        return (
            <div>
                <h4>Current Month: {this.state.month} of {this.state.year}</h4>
                <p>Limit: ${this.state.limit}</p>
                <p>Spent: ${spent}</p>
                <p>Available: ${this.state.limit - spent}</p>
                <hr />
                <p>Purchases so far:</p>
                <ul>
                    {purchases}
                </ul>
            </div>
        )
    }

}

export default MonthlyInfo;
