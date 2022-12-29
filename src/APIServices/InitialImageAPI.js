export default class InitialImageService {
  static GetInitialImages(id) {
    return fetch(`/initialchecklist/image/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateInitialImage(id, body) {
    return fetch(`/initialchecklist/image/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertInitialImage(formData) {
    return fetch("/initialchecklist/image/upload/", {
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
    return fetch(`/initialchecklist/image/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
