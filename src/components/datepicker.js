import React, { Component } from 'react';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: this.props.month,
            currentYear: this.props.year
        }
    }

    componentDidMount() {
        document.getElementById('monthSelector').options[new Date().getMonth()].selected = true;
        document.getElementById('yearSelector').options[0].selected = true;
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            currentMonth: newProps.month
        })
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (var i = 0; i < months.length; i ++) {
            if (months[i] === newProps.month) {
                break
            }
        }
        document.getElementById('monthSelector').options[i].selected = true;
    }

    handleChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    render() {
        var yearList = [];
        for (var i = 0; i < 5; i ++) {
            yearList.push(new Date().getFullYear() + i)
        }
        var newYearList = yearList.map(year =>
            <option key={year} value={year}>{year}</option>
        )

        return (
            <div className="datepicker">
            <label htmlFor="monthSelector"> Viewing </label>
                <select id="monthSelector" name="activeMonth" onChange={this.handleChange.bind(this)}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>

                <label htmlFor="yearSelector"> of </label>
                <select id="yearSelector" name="activeYear" onChange={this.handleChange.bind(this)}>
                    {newYearList}
                </select>
            </div>
        )
    }
}

export default DatePicker;
