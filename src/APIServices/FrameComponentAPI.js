export default class FrameComponentService {
  static GetFrameComponents(frame_id) {
    return fetch(`/framecomponent/get/all/${frame_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateGetFrameComponent(id, body) {
    return fetch(`/framecomponent/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertGetFrameComponent(body) {
    return fetch("/framecomponent/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteGetFrameComponent(id) {
    return fetch(`/framecomponent/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
