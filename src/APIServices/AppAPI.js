export default class AppService {
  static SetSession(value) {
    fetch(`http://127.0.0.1:5000/set-session/${value}`, {
      credentials: "include",
    });
  }

  // static GetSession() {
  //   return fetch("http://127.0.0.1:5000/get-session/", {
  //     credentials: "include",
  //   }).then((resp) => resp.json());
  // }

  static DeleteSession() {
    fetch("http://127.0.0.1:5000/delete-session/", {
      credentials: "include",
    });
  }

  static SetUserItems(formData) {
    return fetch("http://127.0.0.1:5000/set-userItems/", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  static AppendUserItems(formData) {
    return fetch("http://127.0.0.1:5000/append-userItems/", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  static login(username, password) {
    console.log("log in in ")
    return fetch(`/login/${username}/${password}`, {
      credentials: "include",
    }).then((resp) => resp.json());
  }

  static logout() {
    fetch("http://127.0.0.1:5000/logout", {
      credentials: "include",
    });
  }

  //Items Section
  static InitItemArray() {
    return fetch("http://127.0.0.1:5000/init_itemArray/get", {
      method: "GET",
      credentials: "include",
    }).then((resp) => resp.json());
  }

  // static EditItemArray(option) {
  //   return fetch(`http://127.0.0.1:5000/init_itemArray/edit/${option}`, {
  //     method: "GET",
  //     credentials: "include",
  //   }).then((resp) => resp.json());
  // }

  static EditItemArray(option, formData) {
    return fetch(`http://127.0.0.1:5000/init_itemArray/edit/${option}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  //Database
  static ResetDatabase(option) {
    return fetch(`http://127.0.0.1:5000/reset/${option}`, {
      method: "GET",
    }).then((resp) => resp.json());
  }

  static ClearFolder(){
    fetch("http://127.0.0.1:5000/drive/clearfolder", {
    });
  }
}
