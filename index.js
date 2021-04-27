/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (empArgs) {
    return {firstName : empArgs[0],
    familyName : empArgs[1],
    title : empArgs[2],
    payPerHour : empArgs[3],
    timeInEvents : [],
    timeOutEvents : []}
}

let createEmployeeRecords = function (employees) {
    return employees.map( employee => createEmployeeRecord(employee) )
}

let createTimeInEvent = function (timeIn) {
    const hr = parseInt(timeIn.slice(11,13))*100
    const day =  timeIn.slice(0,10)
    this.timeInEvents.push({type: "TimeIn", hour: hr, date: day})
    return this
}

let createTimeOutEvent = function (timeOut) {
    const hr = parseInt(timeOut.slice(11,13))*100
    const day =  timeOut.slice(0,10)
    this.timeOutEvents.push({type: "TimeOut", hour: hr, date: day})
    return this
}

let hoursWorkedOnDate = function (date) {
    const timeIn = this.timeInEvents.find(time => time["date"] === date)
    const timeOut = this.timeOutEvents.find(time => time["date"] === date)
    return (timeOut["hour"] - timeIn["hour"])/100
}

let wagesEarnedOnDate = function (date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

let calculatePayroll = function (emps) {
    return emps.reduce(function (memo, emp) {
        return memo + allWagesFor.call(emp)
    }.bind(this), 0)
}