export default class ServiceService {
  static GetServices() {
    return fetch("http://127.0.0.1:5000/service/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetService(id) {
    return fetch(`http://127.0.0.1:5000/service/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateService(id, body) {
    return fetch(`http://127.0.0.1:5000/service/update/${id}/`, {
      method: "PUT",
      body: body,
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.status;
      }
    });
  }

  // static InsertService(body) {
  //   return fetch("http://127.0.0.1:5000/service/add/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   }).then((resp) => resp.json());
  // }

  static InsertService(formData) {
    return fetch("http://127.0.0.1:5000/service/add/", {
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

  // static InsertService(formData) {
  //   return fetch("http://127.0.0.1:5000/service/add/", {
  //     method: "POST",
  //     body: formData,
  //   }).then((resp) => {
  //     if (!resp.ok) throw new Error(resp.status);
  //     else resp.json();
  //   });
  // }

  static DeleteService(id) {
    return fetch(`http://127.0.0.1:5000/service/delete/${id}/`, {
      method: "PUT",
    });
  }
}
