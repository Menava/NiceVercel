export default class ServicePlaceService {
  static GetServicePlaces() {
    return fetch("/serviceplace/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetServicePlace(id) {
    return fetch(`//serviceplace/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateServicePlace(id, body) {
    return fetch(`/serviceplace/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateServicePlaceV2(id, newID) {
    return fetch(
      `/serviceplace/update/v2/${id}/${newID}`,
      {
        method: "PUT",
      }
    ).then((resp) => resp.json());
  }

  static InsertServicePlace(body) {
    return fetch("/serviceplace/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteServicePlace(id) {
    return fetch(`/serviceplace/delete/${id}/`, {
      method: "PUT",
    }).then((resp) => resp.json());
  }

  static RealDeleteServicePlace(id) {
    return fetch(`/serviceplace/real-delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
