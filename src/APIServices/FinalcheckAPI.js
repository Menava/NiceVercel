export default class FinalCheckService {
  static GetFinalCheck(id) {
    return fetch(`http://127.0.0.1:5000/finalchecklist/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateFinalCheck(id, body) {
    return fetch(`http://127.0.0.1:5000/finalchecklist/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertFinalCheck(body) {
    return fetch("http://127.0.0.1:5000/finalchecklist/add/", {
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
    return fetch(`http://127.0.0.1:5000/finalchecklist/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
