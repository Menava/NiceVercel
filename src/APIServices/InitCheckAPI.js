export default class InitCheckService {
  static GetInitCheck(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/initchecklist/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateInitCheck(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/initchecklist/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertInitCheck(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/initchecklist/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.status;
      }
    });
  }

  static DeleteInitCheck(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/initchecklist/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
