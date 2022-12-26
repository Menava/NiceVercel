export default class CarService {
  static GetCars() {
    return fetch("http://127.0.0.1:5000/car/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateCar(id, body) {
    return fetch(`http://127.0.0.1:5000/car/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertCar(body) {
    return fetch("http://127.0.0.1:5000/car/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteCar(id, body) {
    return fetch(`http://127.0.0.1:5000/car/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
