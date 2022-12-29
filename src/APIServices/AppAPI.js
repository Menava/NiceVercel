export default class AppService {
  static SetSession(value) {
    fetch(`/set-session/${value}`, {
      credentials: "include",
    });
  }

  // static GetSession() {
  //   return fetch("/get-session/", {
  //     credentials: "include",
  //   }).then((resp) => resp.json());
  // }

  static DeleteSession() {
    fetch("https://genshinimpact1234.pythonanywhere.com/delete-session/", {
      credentials: "include",
    });
  }

  static SetUserItems(formData) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/set-userItems/", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  static AppendUserItems(formData) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/append-userItems/", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  static login(username, password) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/login/${username}/${password}`, {
      credentials: "include",
    }).then((resp) => resp.json());
  }

  static logout() {
    fetch("https://genshinimpact1234.pythonanywhere.com/logout", {
      credentials: "include",
    });
  }

  //Items Section
  static InitItemArray() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/init_itemArray/get", {
      method: "GET",
      credentials: "include",
    }).then((resp) => resp.json());
  }

  // static EditItemArray(option) {
  //   return fetch(`/init_itemArray/edit/${option}`, {
  //     method: "GET",
  //     credentials: "include",
  //   }).then((resp) => resp.json());
  // }

  static EditItemArray(option, formData) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/init_itemArray/edit/${option}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  //Database
  static ResetDatabase(option) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/reset/${option}`, {
      method: "GET",
    }).then((resp) => resp.json());
  }

  static ClearFolder(){
    fetch("https://genshinimpact1234.pythonanywhere.com/drive/clearfolder", {
    });
  }
}
