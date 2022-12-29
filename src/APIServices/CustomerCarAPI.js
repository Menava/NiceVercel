export default class CustomerCarService {
  static GetCustomerCar() {
    return fetch("/customer/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateCustomerCar(id, body) {
    return fetch(`/customer/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertCustomerCar(body) {
    return fetch("/customercar/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  // static InsertCustomerCar() {
  //   return fetch("/customercar/add", {
  //     method: "POST",
  //   }).then((resp) => resp.json());
  // }

  static DeleteCustomerCar(id, body) {
    return fetch(`/customer/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
