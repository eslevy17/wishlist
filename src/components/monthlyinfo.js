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

    render() {
        var spent = 0;
        for (var i = 0; i < this.props.purchases.length; i ++) {
            spent += this.props.purchases[i].price
        }

        const purchases = this.props.purchases.map(purchase =>
            <li>{purchase.name} (${purchase.price})</li>
        )

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
