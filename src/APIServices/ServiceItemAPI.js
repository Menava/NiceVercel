export default class ServiceItemService {
  static GetServiceItems() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/serviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateServiceItem(formData) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/serviceitem/update/`, {
      method: "PUT",
      body: formData,
    }).then((resp) => resp.json());
  }

  static InsertServiceItem(formData) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/serviceitem/add/", {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
  }

  static DeleteServiceItem(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/serviceitem/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
