export default class ItemPaymentService {
  static GetItemPayments() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/item_payment/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetItemPayment(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com//item_payment/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateItemPayment(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/item_payment/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertItemPayment(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/item_payment/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteItemPayment(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/item_payment/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
