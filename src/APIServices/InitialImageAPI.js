export default class InitialImageService {
  static GetInitialImages(id) {
    return fetch(`http://127.0.0.1:5000/initialchecklist/image/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateInitialImage(id, body) {
    return fetch(`http://127.0.0.1:5000/initialchecklist/image/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertInitialImage(formData) {
    return fetch("http://127.0.0.1:5000/initialchecklist/image/upload/", {
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

  static DeleteInitialImage(id, body) {
    return fetch(`http://127.0.0.1:5000/initialchecklist/image/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
