export default class CustomerCarService {
  static GetCustomerCar() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/customer/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateCustomerCar(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/customer/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertCustomerCar(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/customercar/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  // static InsertCustomerCar() {
  //   return fetch("https://genshinimpact1234.pythonanywhere.com/customercar/add", {
  //     method: "POST",
  //   }).then((resp) => resp.json());
  // }

  static DeleteCustomerCar(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/customer/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
