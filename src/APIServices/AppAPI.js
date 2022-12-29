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
    fetch("/delete-session/", {
      credentials: "include",
    });
  }

  static SetUserItems(formData) {
    return fetch("/set-userItems/", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  static AppendUserItems(formData) {
    return fetch("/append-userItems/", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  // static login(username, password) {
  //   console.log("log in in ")
  //   return fetch(`/login/${username}/${password}`, {
  //     credentials: "include",
  //   }).then((resp) => resp.json());
  // }

  static login(username,password) {
    fetch('https://catfact.ninja/fact', { method: 'GET' })
      .then(data => data.json()) // Parsing the data into a JavaScript object
      .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
  }

  static logout() {
    fetch("/logout", {
      credentials: "include",
    });
  }

  //Items Section
  static InitItemArray() {
    return fetch("/init_itemArray/get", {
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
    return fetch(`/init_itemArray/edit/${option}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((resp) => resp.json());
  }

  //Database
  static ResetDatabase(option) {
    return fetch(`/reset/${option}`, {
      method: "GET",
    }).then((resp) => resp.json());
  }

  static ClearFolder(){
    fetch("/drive/clearfolder", {
    });
  }
}
