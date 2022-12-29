export default class ItemPurchaseService {
  static GetItemPurchases() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/item_purchase/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetItemPurchase(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com//item_purchase/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateItemPurchase(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/item_purchase/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertItemPurchase(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/item_purchase/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteItemPurchase(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/item_purchase/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
