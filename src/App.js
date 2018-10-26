import React, { Component } from 'react';
import './App.css';

import Item from './components/item';
import NewItemForm from './components/newitemform';
import DatePicker from './components/datepicker';
import MonthlyInfo from './components/monthlyinfo';

class App extends Component {
    constructor() {
        super();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.state = {
            wants: [{name: 'computer', price: 300}],
            needs: [{name: 'random bills', price: 100}],
            activeMonth: months[new Date().getMonth()],
            activeYear: new Date().getFullYear().toString(),
            purchases: {},
        }
    }

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

    purchase(name, price, month, year) {
        var newPurchases = this.state.purchases;
        if (!newPurchases[month]) {
            newPurchases[month] = []
        }
        newPurchases[month].push({
            name: name,
            price: price});
        this.setState({
            purchases: newPurchases
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
            />
        );
        // const purchasedItems = this.state.purchases[this.state.activeMonth].map((purchasedItem, index)=>
        //     <Item
        //         name={purchasedItem.name}
        //         price={purchasedItem.price}
        //         key={purchasedItem.name}
        //         index={index}
        //         activeMonth={this.state.activeMonth}
        //         activeYear={this.state.activeYear}
        //         delete={this.delete.bind(this)}
        //         update={this.update.bind(this)}
        //         purchase={this.purchase.bind(this)}
        //         list='purchasedItems'
        //     />
        // )

        return (
            <div>
                <DatePicker
                    month={this.state.activeMonth}
                    year={this.state.activeYear}
                    onChange={this.handleDateChange.bind(this)}
                />

                <MonthlyInfo
                    month={this.state.activeMonth}
                    year={this.state.activeYear}
                    purchases={this.state.purchases[this.state.activeMonth]}
                />

                <div className="wantsAndNeeds">
                    <div className="expenseBlock">
                        <h3>Cool stuff I want:</h3>
                        <div className="productTable">
                            {allWants}
                        </div>
                        <NewItemForm
                            handleSubmit={this.addNew.bind(this)} list='wants'/>
                    </div>

                    <div className="expenseBlock">
                        <h3>Important stuff I need:</h3>
                        <div className="productTable">
                            {allNeeds}
                        </div>
                        <NewItemForm
                            handleSubmit={this.addNew.bind(this)} list='needs'/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
