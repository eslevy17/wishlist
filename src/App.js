import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Item from './components/item'
import NewItemForm from './components/newitemform'

class App extends Component {
    constructor() {
        super();
        this.state = {
            wants: [{name: 'computer', price: 300}],
            needs: [{name: 'random bills', price: 100}]
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

    render() {
        const allWants = this.state.wants.map((want, index) =>
            <Item
                name={want.name}
                price={want.price}
                key={want.name}
                index={index}
                delete={this.delete.bind(this)}
                update={this.update.bind(this)}
                list='wants'
            />
        )
        const allNeeds = this.state.needs.map((need, index) =>
            <Item
                name={need.name}
                price={need.price}
                key={need.name}
                index={index}
                delete={this.delete.bind(this)}
                update={this.update.bind(this)}
                list='needs'
            />
        )


        return (
            <div>
                <div className="expenseBlock">
                    <h3>Cool stuff I want:</h3>
                    <table className="productTable">
                        <tbody>
                            {allWants}
                        </tbody>
                    </table>
                    <NewItemForm
                        handleSubmit={this.addNew.bind(this)} list='wants'/>
                </div>

                <div className="expenseBlock">
                    <h3>Important stuff I need:</h3>
                    <table className="productTable">
                        <tbody>
                            {allNeeds}
                        </tbody>
                    </table>
                    <NewItemForm
                        handleSubmit={this.addNew.bind(this)} list='needs'/>
                </div>
            </div>
        );
    }
}

export default App;
