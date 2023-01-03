export default class EmployeeService {
  static GetEmployee() {
    return fetch("http://127.0.0.1:5000/employee/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateEmployee(id, body) {
    return fetch(`http://127.0.0.1:5000/employee/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertEmployee(body) {
    return fetch("http://127.0.0.1:5000/employee/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteEmployee(id, body) {
    return fetch(`http://127.0.0.1:5000/employee/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
