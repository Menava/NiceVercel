export default class EmployeeService {
  static GetEmployee() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/employee/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateEmployee(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/employee/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertEmployee(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/employee/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteEmployee(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/employee/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
