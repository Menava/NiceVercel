export default class ItemService {
  static GetItems() {
    return fetch("/item/get", {
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
    return fetch(`/item/update/${id}/`, {
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
    return fetch("/item/add/", {
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
    return fetch(`/item/delete/${id}/`, {
      method: "PUT",
    });
  }
}
