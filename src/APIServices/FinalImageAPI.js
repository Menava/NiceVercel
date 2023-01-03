export default class FinalImageService {
  static GetFinalImage(id) {
    return fetch(`http://127.0.0.1:5000/finalchecklist/image/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateFinalImage(id, body) {
    return fetch(`http://127.0.0.1:5000/finalchecklist/image/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertFinalImage(formData) {
    return fetch("http://127.0.0.1:5000/finalchecklist/image/upload/", {
      method: "POST",
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.status;
      }
    });
  }

  static DeleteFinalImage(id, body) {
    return fetch(`http://127.0.0.1:5000/finalchecklist/image/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
