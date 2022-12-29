export default class ServicePlaceServiceItemService {
  static GetServicePlaceServiceItems() {
    return fetch("/serviceplaceserviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetServicePlaceServiceItem(servicePlace_id) {
    return fetch(
      `/serviceplaceserviceitem/get/${servicePlace_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }

  static UpdateServicePlaceServiceItemV2(id, newID) {
    return fetch(
      `/serviceplaceserviceitem/update/byserviceplaceID/${id}/${newID}`,
      {
        method: "PUT",
      }
    ).then((resp) => resp.json());
  }

  static UpdateServicePlaceServiceItem(body) {
    return fetch("/serviceplaceserviceitem/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertServicePlaceServiceItem(formData) {
    return fetch("/serviceplaceserviceitem/add/", {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
  }

  static DeleteServicePlaceServiceItem(id, body) {
    console.log("test", id);
    console.log("test", body);
    return fetch(
      `/serviceplaceserviceitem/delete/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((resp) => resp.json());
  }
  static EditItemQuantity(id, body) {
    return fetch(`/serviceplaceserviceitem/edit/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static AppendItem(body) {
    console.log("test", body);
    return fetch("/serviceplaceserviceitem/append", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static GetTestMethod(servicePlace_id) {
    return fetch(
      `/serviceplaceserviceitem/test/${servicePlace_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }
}
