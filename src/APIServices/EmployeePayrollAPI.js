export default class EmployeePayrollService {
  static GetEmployeePayrolls() {
    return fetch("/employee-payroll/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetEmployeePayroll(id) {
    return fetch(`//employee-payroll/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateEmployeePayroll(id, body) {
    return fetch(`/employee-payroll/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertEmployeePayroll(body) {
    return fetch("/employee-payroll/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteEmployeePayroll(id) {
    return fetch(`/employee-payroll/delete/${id}/`, {
      method: "DELETE",
    }).then((resp) => resp.json());
  }
}
