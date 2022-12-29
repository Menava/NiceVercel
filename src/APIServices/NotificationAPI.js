export default class NotificationService {
  static GetNotifications() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/notification/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static UpdatetNotifications(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/notification/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
