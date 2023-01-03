export default class DamageTypeService {
  static GetDamageTypes() {
    return fetch("http://127.0.0.1:5000/damagetype/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateDamageType(id, body) {
    return fetch(`http://127.0.0.1:5000/damagetype/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertDamageType(body) {
    return fetch("http://127.0.0.1:5000/damagetype/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteDamageType(id) {
    return fetch(`http://127.0.0.1:5000/damagetype/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
