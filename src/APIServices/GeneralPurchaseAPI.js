export default class GeneralPurchaseService {
  static GetGeneralPurchases() {
    return fetch("http://127.0.0.1:5000/generalpurchase/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetGeneralPurchase(id) {
    return fetch(`http://127.0.0.1:5000//generalpurchase/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateGeneralPurchase(id, body) {
    return fetch(`http://127.0.0.1:5000/generalpurchase/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertGeneralPurchase(body) {
    return fetch("http://127.0.0.1:5000/generalpurchase/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteGeneralPurchase(id) {
    return fetch(`http://127.0.0.1:5000/generalpurchase/delete/${id}/`, {
      method: "DELETE",
    }).then((resp) => resp.json());
  }
}
