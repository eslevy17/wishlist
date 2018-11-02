import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

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
            wants: [],
            needs: [],
            activeMonth: months[new Date().getMonth()],
            activeYear: new Date().getFullYear().toString(),
            purchases: {},
            standardLimit: 500
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
    componentDidMount() {
        this.getWants();
        this.getNeeds();
        this.getLimits();
        this.getPurchases();
    }

    getWants() {
        axios.get('/api/wants')
            .then(data => this.setState({wants: data.data}))
            .catch(errs => console.log(errs))
    }

    getNeeds() {
        axios.get('/api/needs')
            .then(data => this.setState({needs: data.data}))
            .catch(errs => console.log(errs))
    }

    getLimits() {
        axios.get('/api/limits')
            .then(data => {
                var purchases = this.state.purchases;
                for (var i = 0; i < data.data.length; i ++) {
                    if (!purchases[data.data[i].year]) {
                        purchases[data.data[i].year] = {}
                    }
                    if (!purchases[data.data[i].year][data.data[i].month]) {
                        purchases[data.data[i].year][data.data[i].month] = {}
                    }
                    purchases[data.data[i].year][data.data[i].month].limit = data.data[i].limitation;
                }
                this.setState({
                    purchases: purchases
                })
            })
            .catch(errs => console.log(errs))
    }

    getPurchases() {
        axios.get('/api/purchases')
            .then(data => {
                var purchases = this.state.purchases;
                for (var i = 0; i < data.data.length; i ++) {
                    if (!purchases[data.data[i].year]) {
                        purchases[data.data[i].year] = {};
                    }
                    if (!purchases[data.data[i].year][data.data[i].month]) {
                        purchases[data.data[i].year][data.data[i].month] = {};
                    }
                    if (!purchases[data.data[i].year][data.data[i].month].purchases) {
                        purchases[data.data[i].year][data.data[i].month].purchases = [];
                    }
                    if (!purchases[data.data[i].year][data.data[i].month].limit) {
                        purchases[data.data[i].year][data.data[i].month].limit = this.state.standardLimit;
                    }
                    purchases[data.data[i].year][data.data[i].month].purchases.push(data.data[i])
                }
                this.setState({
                    purchases: purchases
                })
            })
            .catch(errs => console.log(errs))
    }

    addNew(newItem, list) {
        axios.post('/api/' + list, newItem)
            .then(data => {
                if (list == 'wants') {
                    this.getWants();
                }
                if (list == 'needs') {
                    this.getNeeds();
                }
                var oldItems = this.state[list].slice();
                oldItems.push(newItem);
                this.setState({
                    [list]: oldItems
                })
            })
            .catch(errs => {
                alert('Something went wrong!');
                console.log(errs);
            })
    }

    delete(index, list, id) {
        axios.delete('/api/' + list + '/' + id)
            .then(data => {
                var oldItems = this.state[list].slice();
                oldItems.splice(index, 1);
                this.setState({
                    [list]: oldItems
                })
            })
            .catch(errs => {
                alert('Something went wrong!');
                console.log(errs);
            })
    }

    update(updatedItem, index, list) {
        axios.put('/api/' + list, updatedItem)
            .then(data => {
                if (list == 'wants') {
                    this.getWants();
                }
                if (list == 'needs') {
                    this.getNeeds();
                }
                var oldItems = this.state[list].slice();
                oldItems[index] = updatedItem;
                this.setState({
                    [list]: oldItems
                })
            })
            .catch(errs => {
                alert('Something went wrong!');
                console.log(errs);
            })
    }

    handleDateChange(name, newValue) {
        this.setState({
            [name]: newValue
        })
    }

    purchase(name, price, list, month, year, id) {
        var newItem = {
            id: id,
            name: name,
            price: price,
            list: list,
            month: month,
            year: year
        }
        axios.post('/api/purchases', newItem)
            .then(data => {
                var newPurchases = this.state.purchases;
                if (!newPurchases[year]) {
                    newPurchases[year] = {}
                }
                if (!newPurchases[year][month]) {
                    newPurchases[year][month] = {}
                }
                if (!newPurchases[year][month].limit) {
                    newPurchases[year][month].limit = this.state.standardLimit
                }
                if (!newPurchases[year][month].purchases) {
                    newPurchases[year][month].purchases = []
                }
                newPurchases[year][month].purchases.push({
                    name: name,
                    price: price,
                    list: list
                });
                this.setState({
                    purchases: newPurchases
                })
            })
            .catch(errs => {
                alert('Something went wrong!');
                console.log(errs);
            })
    }

    updatePurchasedItem(updatedItem, index, list, month, year, id) {
        axios.put('/api/purchases', updatedItem)
            .then(data => {
                this.getPurchases();
                var newPurchases = this.state.purchases;
                newPurchases[year][month].purchases[index] = updatedItem;
                this.setState({
                    purchases: newPurchases
                })
            })
            .catch(errs => {
                alert('Something went wrong!');
                console.log(errs);
            })
    }

    deletePurchasedItem(index, list, month, year, id) {
        axios.delete('/api/purchases/' + id)
            .then(data => {
                this.getPurchases();
                var newPurchases = this.state.purchases;
                newPurchases[year][month].purchases.splice(index, 1);
                this.setState({
                    purchases: newPurchases
                })
            })
            .catch(errs => {
                alert('Something went wrong!');
                console.log(errs);
            })
    }

    getMonthlyDetail(month) {
        this.setState({
            activeMonth: month
        })
    }

    updateMonthlyLimit(year, month, newLimit) {
        var newLimitObject = {
            year: year,
            month: month,
            limitation: parseInt(newLimit)
        }
        axios.post('/api/limits', newLimitObject)
            .then(data => {
                this.getLimits();
                this.getPurchases();
            })
            .catch(errs => console.log(errs))
    }

    render() {
        const allWants = this.state.wants.map((want, index) =>
            <Item
                name={want.name}
                price={want.price}
                key={want.id}
                id={want.id}
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
                key={need.id}
                id={need.id}
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
        var monthlyLimit = this.state.standardLimit;
        if (this.state.purchases[this.state.activeYear]) {
            yearlyPurchasedItems = this.state.purchases[this.state.activeYear];
            if (this.state.purchases[this.state.activeYear][this.state.activeMonth]) {
                monthlyLimit = this.state.purchases[this.state.activeYear][this.state.activeMonth].limit;
                purchasedItems = this.state.purchases[this.state.activeYear][this.state.activeMonth].purchases;
            }
        }

        return (
            <div className="mainApp">
                <div className="records">
                    <DatePicker
                        month={this.state.activeMonth}
                        year={this.state.activeYear}
                        onChange={this.handleDateChange.bind(this)}
                    />

                    <MonthlyChart
                        month={this.state.activeMonth}
                        year={this.state.activeYear}
                        purchases={yearlyPurchasedItems}
                        standardLimit={this.state.standardLimit}
                        getMonthlyDetail={this.getMonthlyDetail.bind(this)}
                    />

                    <MonthlyInfo
                        month={this.state.activeMonth}
                        year={this.state.activeYear}
                        monthlyLimit={monthlyLimit}
                        updatePurchasedItem={this.updatePurchasedItem.bind(this)}
                        deletePurchasedItem={this.deletePurchasedItem.bind(this)}
                        updateMonthlyLimit={this.updateMonthlyLimit.bind(this)}
                        purchases={purchasedItems}
                    />
                </div>

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
