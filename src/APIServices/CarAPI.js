export default class CarService {
  static GetCars() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/car/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateCar(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/car/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertCar(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/car/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteCar(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/car/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
