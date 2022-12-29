export default class CustomerService {
  static GetCustomer() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/customer/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateCustomer(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/customer/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertCustomer(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/customer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteCustomer(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/customer/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
