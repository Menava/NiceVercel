export default class DamageTypeService {
  static GetDamageTypes() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/damagetype/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateDamageType(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/damagetype/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertDamageType(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/damagetype/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteDamageType(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/damagetype/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
