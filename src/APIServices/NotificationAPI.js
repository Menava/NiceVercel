export default class NotificationService {
  static GetNotifications() {
    return fetch("/notification/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static UpdatetNotifications(id) {
    return fetch(`/notification/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
