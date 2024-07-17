
// Create an employee record from an array
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Create multiple employee records from an array of arrays
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Add a timeIn event to an employee's record
  function createTimeInEvent(dateTime) {
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateTime.split(" ")[1], 10),
      date: dateTime.split(" ")[0]
    });
    return this;
  }
  
  // Add a timeOut event to an employee's record
  function createTimeOutEvent(dateTime) {
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(dateTime.split(" ")[1], 10),
      date: dateTime.split(" ")[0]
    });
    return this;
  }
  
  // Calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    const inEvent = this.timeInEvents.find(event => event.date === date);
    const outEvent = this.timeOutEvents.find(event => event.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
  }
  
  // Calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  }
  
  // Calculate total wages for an employee
  function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(event => event.date);
    const payable = eligibleDates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate.call(this, date);
      }.bind(this), 0);
      return payable;
  }
  
  // Find an employee by first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
  }
  
  // Calculate payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, record) => {
      return memo + allWagesFor.call(record);
    }, 0);
  }