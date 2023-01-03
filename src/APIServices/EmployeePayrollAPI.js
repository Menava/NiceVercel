export default class EmployeePayrollService {
  static GetEmployeePayrolls() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/employee-payroll/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetEmployeePayroll(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com//employee-payroll/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateEmployeePayroll(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/employee-payroll/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertEmployeePayroll(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/employee-payroll/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteEmployeePayroll(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/employee-payroll/delete/${id}/`, {
      method: "DELETE",
    }).then((resp) => resp.json());
  }
}
