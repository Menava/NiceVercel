export default class ItemService {
  static GetItems() {
    return fetch("http://127.0.0.1:5000/item/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateItem(id, body) {
    for (var pair of body.entries()) {
      console.log("body", pair[0] + ", " + pair[1]);
    }
    return fetch(`http://127.0.0.1:5000/item/update/${id}/`, {
      method: "PUT",
      body: body,
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.status;
      }
    });
  }

  static InsertItem(formData) {
    return fetch("http://127.0.0.1:5000/item/add/", {
      method: "POST",
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.status;
      }
    });
  }

  static DeleteItem(id) {
    return fetch(`http://127.0.0.1:5000/item/delete/${id}/`, {
      method: "PUT",
    });
  }
}
