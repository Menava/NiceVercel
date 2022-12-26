export default class ServicePlaceService {
  static GetServicePlaces() {
    return fetch("http://127.0.0.1:5000/serviceplace/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetServicePlace(id) {
    return fetch(`http://127.0.0.1:5000//serviceplace/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateServicePlace(id, body) {
    return fetch(`http://127.0.0.1:5000/serviceplace/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateServicePlaceV2(id, newID) {
    return fetch(
      `http://127.0.0.1:5000/serviceplace/update/v2/${id}/${newID}`,
      {
        method: "PUT",
      }
    ).then((resp) => resp.json());
  }

  static InsertServicePlace(body) {
    return fetch("http://127.0.0.1:5000/serviceplace/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteServicePlace(id) {
    return fetch(`http://127.0.0.1:5000/serviceplace/delete/${id}/`, {
      method: "PUT",
    }).then((resp) => resp.json());
  }

  static RealDeleteServicePlace(id) {
    return fetch(`http://127.0.0.1:5000/serviceplace/real-delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
