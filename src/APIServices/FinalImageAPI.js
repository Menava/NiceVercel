export default class FinalImageService {
  static GetFinalImage(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/finalchecklist/image/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateFinalImage(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/finalchecklist/image/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertFinalImage(formData) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/finalchecklist/image/upload/", {
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
    return fetch(`https://genshinimpact1234.pythonanywhere.com/finalchecklist/image/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
