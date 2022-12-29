export default class FrameService {
  static GetCarframes() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/carframe/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateCarframe(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/carframe/update/${id}/`, {
      method: "PUT",
      body: body,
    }).then((resp) => resp.json());
  }

  static InsertCarframe(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/carframe/add/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static DeleteCarframe(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/carframe/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
