import React, { Component } from 'react';

class MonthlyChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeYear: this.props.year,
            purchases: this.props.purchases,
        }
    }

    componentWillReceiveProps(newProps) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var targetMonth;
        for (var i = 0; i < 12; i ++) {
            document.getElementById('monthBar' + i).style.borderBottom = '6px solid transparent';
            if (months[i] === newProps.month) {
                targetMonth = i;
            }
        }
        document.getElementById('monthBar' + targetMonth).style.borderBottom = '6px solid dodgerblue'
        this.setState({
            purchases: newProps.purchases
        });
    }

    componentDidMount() {
        document.getElementById('monthBar' + new Date().getMonth()).style.borderBottom = '6px solid dodgerblue'
    }

    getMonthlyDetail(monthName, monthNum) {
        this.props.getMonthlyDetail(monthName);
        for (var i = 0; i < 12; i ++) {
            document.getElementById('monthBar' + i).style.borderBottom = '6px solid transparent'
        }
        document.getElementById('monthBar' + monthNum).style.borderBottom = '6px solid dodgerblue'
    }

    render() {
        let purchases = [];
        let maxTotalSpent = this.props.standardLimit;
        let multiplier = maxTotalSpent / 180;
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        for (var k = 0; k < months.length; k ++) {
            let totalSpent = 0;
            if (this.state.purchases) {
                if (this.state.purchases[months[k]]) {
                    if (this.state.purchases[months[k]].purchases) {
                        for (var m = 0; m < this.state.purchases[months[k]].purchases.length; m++) {
                            totalSpent += this.state.purchases[months[k]].purchases[m].price;
                            if (totalSpent > maxTotalSpent) {
                                maxTotalSpent = totalSpent
                                multiplier = maxTotalSpent / 180
                            }
                        }
                    }

                }
            }
        }
        // var multiplier = 3;

        for (var i = 0; i < months.length; i ++) {
            let totalSpent = 0;
            if (this.state.purchases) {
                if (this.state.purchases[months[i]]) {
                    if (this.state.purchases[months[i]].purchases) {
                        for (var j = 0; j < this.state.purchases[months[i]].purchases.length; j++) {
                            totalSpent += this.state.purchases[months[i]].purchases[j].price;
                        }
                    }

                }
            }

            let monthNum = i;
            let monthName = months[i];
            purchases.push(
                <div key={months[i]} className="singleMonthBar">
                    <div className="singleBarAvailableDiv" style={{height: maxTotalSpent/multiplier + 'px'}} onClick={() => this.getMonthlyDetail(monthName, monthNum)}>
                        <div className="singleBarSpentDiv" style={{height: totalSpent/multiplier + 'px'}}></div>
                    </div>
                    <p>{months[i].substring(0,3)}</p>
                    <p>${totalSpent}</p>
                    <div id={'monthBar' + monthNum} className="invisibleTriangle"></div>
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
