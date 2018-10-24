import React, { Component } from 'react';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: '',
            currentYear: ''
        }

    }
    componentWillMount() {
        this.setState({
            currentMonth: this.props.month,
            currentYear: this.props.year
        })
    }

    handleChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    render() {

        return (
            <div className="datepicker">
            <label htmlFor="monthpicker"> Viewing </label>
                <select name="activeMonth" onChange={this.handleChange.bind(this)}>
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

                <label htmlFor="yearpicker"> of: </label>
                <select name="activeYear" onChange={this.handleChange.bind(this)}>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                </select>
            </div>
        )
    }
}

export default DatePicker;
