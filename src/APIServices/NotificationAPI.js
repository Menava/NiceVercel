export default class NotificationService {
  static GetNotifications() {
    return fetch("http://127.0.0.1:5000/notification/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static UpdatetNotifications(id) {
    return fetch(`http://127.0.0.1:5000/notification/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
