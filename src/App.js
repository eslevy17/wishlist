import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Item from './components/item';
import NewItemForm from './components/newitemform';
import DatePicker from './components/datepicker';
import MonthlyInfo from './components/monthlyinfo';

class App extends Component {
    constructor() {
        super();
        this.state = {
            wants: [{name: 'computer', price: 300}],
            needs: [{name: 'random bills', price: 100}],
            activeMonth: 'January',
            activeYear: '2018',
            purchases: {
                January: [{name: 'computer',
                            price: 40}],
                February: [],
                March: [],
                April: [],
                May: [],
                June: [],
                July: [],
                August: [],
                September: [],
                October: [],
                November: [],
                December: [],
            },
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

    purchase(name, price) {
        var newPurchases = this.state.purchases;
        newPurchases[this.state.activeMonth].push({
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
                delete={this.delete.bind(this)}
                update={this.update.bind(this)}
                purchase={this.purchase.bind(this)}
                list='needs'
            />
        );
        const purchases = this.state.purchases.January.map((purchase) =>
            <p>{purchase}</p>
        );

        return (
            <div>
                <DatePicker month={this.state.activeMonth} year={this.state.activeYear} onChange={this.handleDateChange.bind(this)} />
                <MonthlyInfo month={this.state.activeMonth} year={this.state.activeYear} purchases={this.state.purchases[this.state.activeMonth]}/>

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
