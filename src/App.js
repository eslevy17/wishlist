import React, { Component } from 'react';
import './App.css';

import Item from './components/item';
import NewItemForm from './components/newitemform';
import DatePicker from './components/datepicker';
import MonthlyInfo from './components/monthlyinfo';
import MonthlyChart from './components/monthlychart';

class App extends Component {
    constructor() {
        super();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.state = {
            wants: [
                {name: 'computer', price: 300},
                {name: 'shoes', price: 100},
                {name: 'socks', price: 40},
            ],
            needs: [
                {name: 'random bills', price: 100},
                {name: 'other bills', price: 50},
                {name: 'even more bills', price: 80},
            ],
            activeMonth: months[new Date().getMonth()],
            activeYear: new Date().getFullYear().toString(),
            purchases: {},
        }
    }

    // purchases will eventually look like this:
    //
    // purchases: {
    //     2018: {
    //         January: {
    //             limit: 500,
    //             purchases: []
    //         },
    //         February: {
    //             limit: 400,
    //             purchases: []
    //         },
    //         March: {
    //             limit: 500,
    //             purchases: []
    //         }
    //     },
    //     2019: {
    //         January: {
    //             limit: 500,
    //             purchases: []
    //         },
    //         February: {
    //             limit: 400,
    //             purchases: []
    //         }
    //     }
    // }

    addNew(newItem, list) {
        var oldItems = this.state[list].slice();
        oldItems.push(newItem);
        this.setState({
            [list]: oldItems
        })
    }

    delete(index, list) {
        var oldItems = this.state[list].slice();
        oldItems.splice(index, 1);
        this.setState({
            [list]: oldItems
        })
    }

    update(updatedItem, index, list) {
        var oldItems = this.state[list].slice();
        oldItems[index] = updatedItem;
        this.setState({
            [list]: oldItems
        })
    }

    handleDateChange(name, newValue) {
        this.setState({
            [name]: newValue
        })
    }

    purchase(name, price, list, month, year) {
        var newPurchases = this.state.purchases;
        if (!newPurchases[year]) {
            newPurchases[year] = {}
        }
        if (!newPurchases[year][month]) {
            newPurchases[year][month] = {limit: 500, purchases: []}
        }
        newPurchases[year][month].purchases.push({
            name: name,
            price: price,
            list: list
        });
        this.setState({
            purchases: newPurchases
        })
    }

    updatePurchasedItem(updatedItem, index, list, month, year) {
        var newPurchases = this.state.purchases;
        newPurchases[year][month].purchases[index] = updatedItem;
        this.setState({
            purchases: newPurchases
        })
    }

    deletePurchasedItem(index, list, month, year) {
        var newPurchases = this.state.purchases;
        newPurchases[year][month].purchases.splice(index, 1);
        this.setState({
            purchases: newPurchases
        })
    }

    getMonthlyDetail(month) {
        this.setState({
            activeMonth: month
        })
    }

    render() {
        const allWants = this.state.wants.map((want, index) =>
            <Item
                name={want.name}
                price={want.price}
                key={want.name}
                index={index}
                activeMonth={this.state.activeMonth}
                activeYear={this.state.activeYear}
                delete={this.delete.bind(this)}
                update={this.update.bind(this)}
                purchase={this.purchase.bind(this)}
                list='wants'
                purchased={false}
            />
        );
        const allNeeds = this.state.needs.map((need, index) =>
            <Item
                name={need.name}
                price={need.price}
                key={need.name}
                index={index}
                activeMonth={this.state.activeMonth}
                activeYear={this.state.activeYear}
                delete={this.delete.bind(this)}
                update={this.update.bind(this)}
                purchase={this.purchase.bind(this)}
                list='needs'
                purchased={false}
            />
        );

        var purchasedItems = null;
        var yearlyPurchasedItems = null;
        if (this.state.purchases[this.state.activeYear]) {
            yearlyPurchasedItems = this.state.purchases[this.state.activeYear];
            if (this.state.purchases[this.state.activeYear][this.state.activeMonth]) {
                purchasedItems = this.state.purchases[this.state.activeYear][this.state.activeMonth].purchases;
            }
        }

        return (
            <div className="mainApp">
                <DatePicker
                    month={this.state.activeMonth}
                    year={this.state.activeYear}
                    onChange={this.handleDateChange.bind(this)}
                />

                <MonthlyChart
                    month={this.state.activeMonth}
                    year={this.state.activeYear}
                    purchases={yearlyPurchasedItems}
                    getMonthlyDetail={this.getMonthlyDetail.bind(this)}
                />

                <MonthlyInfo
                    month={this.state.activeMonth}
                    year={this.state.activeYear}
                    updatePurchasedItem={this.updatePurchasedItem.bind(this)}
                    deletePurchasedItem={this.deletePurchasedItem.bind(this)}
                    purchases={purchasedItems}
                />

                <div className="wantsAndNeeds">
                    <div className="expenseBlock">
                        <h3>Cool stuff I want:</h3>
                        <div>
                            {allWants}
                        </div>
                        <NewItemForm
                            handleSubmit={this.addNew.bind(this)}
                            list='wants'
                        />
                    </div>

                    <div className="expenseBlock">
                        <h3>Important stuff I need:</h3>
                        <div>
                            {allNeeds}
                        </div>
                        <NewItemForm
                            handleSubmit={this.addNew.bind(this)}
                            list='needs'
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
