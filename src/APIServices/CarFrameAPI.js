export default class FrameService {
  static GetCarframes() {
    return fetch("http://127.0.0.1:5000/carframe/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateCarframe(id, body) {
    return fetch(`http://127.0.0.1:5000/carframe/update/${id}/`, {
      method: "PUT",
      body: body,
    }).then((resp) => resp.json());
  }

  static InsertCarframe(body) {
    return fetch("http://127.0.0.1:5000/carframe/add/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static DeleteCarframe(id, body) {
    return fetch(`http://127.0.0.1:5000/carframe/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
