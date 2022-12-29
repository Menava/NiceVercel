export default class ServiceItemService {
  static GetServiceItems() {
    return fetch("/serviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateServiceItem(formData) {
    return fetch(`/serviceitem/update/`, {
      method: "PUT",
      body: formData,
    }).then((resp) => resp.json());
  }

  static InsertServiceItem(formData) {
    return fetch("/serviceitem/add/", {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
  }

  static DeleteServiceItem(id, body) {
    return fetch(`/serviceitem/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
