import React, { Component } from 'react';

class MonthlyChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: this.props.purchases
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            purchases: newProps.purchases
        });
        console.log(this.state.purchases)
    }

    render() {
        let purchases = [];
        let maxTotalSpent = 0;
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        for (var k = 0; k < months.length; k ++) {
            let totalSpent = 0;
            if (this.state.purchases[months[k]]) {
                for (var m = 0; m < this.state.purchases[months[k]].length; m++) {
                    totalSpent += this.state.purchases[months[k]][m].price;
                    if (totalSpent > maxTotalSpent) {
                        maxTotalSpent = totalSpent
                    }
                }
            }
        }

        for (var i = 0; i < months.length; i ++) {
            let totalSpent = 0;
            if (this.state.purchases[months[i]]) {
                for (var j = 0; j < this.state.purchases[months[i]].length; j++) {
                    totalSpent += this.state.purchases[months[i]][j].price;
                }
            }
            purchases.push(
                <div key={months[i]} className="monthBar">
                    <div style={{width:'40px', height: (maxTotalSpent - totalSpent)/2 + 'px', backgroundColor:'pink', margin: '0 auto'}}></div>
                    <div style={{width:'40px', height: totalSpent/2 + 'px', backgroundColor:'red', margin: '0 auto'}}></div>
                    <p>{months[i].substring(0,3)}</p>
                    <p>${totalSpent}</p>
                </div>
            )
        }

        return (
            <div className="monthChartRow">
                {purchases}
            </div>
        )
    }
}

export default MonthlyChart;
