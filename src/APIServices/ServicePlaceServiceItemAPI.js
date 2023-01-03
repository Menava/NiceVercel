export default class ServicePlaceServiceItemService {
  static GetServicePlaceServiceItems() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetServicePlaceServiceItem(servicePlace_id) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/get/${servicePlace_id}/`,
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
      `https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/update/byserviceplaceID/${id}/${newID}`,
      {
        method: "PUT",
      }
    ).then((resp) => resp.json());
  }

  static UpdateServicePlaceServiceItem(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertServicePlaceServiceItem(formData) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/add/", {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
  }

  static DeleteServicePlaceServiceItem(id, body) {
    console.log("test", id);
    console.log("test", body);
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/delete/${id}/`,
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
    return fetch(`https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/edit/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static AppendItem(body) {
    console.log("test", body);
    return fetch("https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/append", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static GetTestMethod(servicePlace_id) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/serviceplaceserviceitem/test/${servicePlace_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }
}
