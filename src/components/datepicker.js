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
        document.getElementById('yearSelector').options[1].selected = true;
    }

    handleChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    render() {
        var yearList = [];
        for (var i = -1; i < 2; i ++) {
            yearList.push(new Date().getFullYear() + i)
        }
        var newYearList = yearList.map(year =>
            <option key={year} value={year}>{year}</option>
        )

        return (
            <div className="datepicker">
                <label htmlFor="yearSelector"> Details for </label>
                <select id="yearSelector" name="activeYear" onChange={this.handleChange.bind(this)}>
                    {newYearList}
                </select>
            </div>
        )
    }
}

export default DatePicker;
