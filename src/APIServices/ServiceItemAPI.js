export default class ServiceItemService {
  static GetServiceItems() {
    return fetch("http://127.0.0.1:5000/serviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateServiceItem(formData) {
    return fetch(`http://127.0.0.1:5000/serviceitem/update/`, {
      method: "PUT",
      body: formData,
    }).then((resp) => resp.json());
  }

  static InsertServiceItem(formData) {
    return fetch("http://127.0.0.1:5000/serviceitem/add/", {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
  }

  static DeleteServiceItem(id, body) {
    return fetch(`http://127.0.0.1:5000/serviceitem/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
