export default class ItemPurchaseService {
  static GetItemPurchases() {
    return fetch("http://127.0.0.1:5000/item_purchase/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetItemPurchase(id) {
    return fetch(`http://127.0.0.1:5000//item_purchase/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateItemPurchase(id, body) {
    return fetch(`http://127.0.0.1:5000/item_purchase/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertItemPurchase(body) {
    return fetch("http://127.0.0.1:5000/item_purchase/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteItemPurchase(id, body) {
    return fetch(`http://127.0.0.1:5000/item_purchase/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
