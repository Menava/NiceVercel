export default class GeneralPurchaseService {
  static GetGeneralPurchases() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/generalpurchase/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetGeneralPurchase(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com//generalpurchase/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateGeneralPurchase(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/generalpurchase/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertGeneralPurchase(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/generalpurchase/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteGeneralPurchase(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/generalpurchase/delete/${id}/`, {
      method: "DELETE",
    }).then((resp) => resp.json());
  }
}
