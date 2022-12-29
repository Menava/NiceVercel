export default class ServicePlaceEmployeeService {
  static GetServicePlaceEmployees() {
    return fetch("/serviceplaceemployee/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetServicePlaceEmployee(servicePlace_id) {
    return fetch(
      `//serviceplaceemployee/get/${servicePlace_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }

  static UpdateServicePlaceEmployeeV2(id, newID) {
    return fetch(
      `/serviceplaceemployee/update/byserviceplaceID/${id}/${newID}`,
      {
        method: "PUT",
      }
    ).then((resp) => resp.json());
  }

  static UpdateServicePlaceEmployee(id, body) {
    return fetch(`/serviceplaceemployee/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertServicePlaceEmployee(formData) {
    return fetch("/serviceplaceemployee/add/", {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
  }

  static DeleteServicePlaceEmployee(id, body) {
    return fetch(`/serviceplaceemployee/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
