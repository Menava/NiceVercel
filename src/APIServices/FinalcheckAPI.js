export default class FinalCheckService {
  static GetFinalCheck(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/finalchecklist/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateFinalCheck(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/finalchecklist/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertFinalCheck(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/finalchecklist/add/", {
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

  static DeleteFinalCheck(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/finalchecklist/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
