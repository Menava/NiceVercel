export default class SupplierService {
  static GetSuppliers() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/supplier/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateSupplier(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/supplier/update/${id}/`, {
      method: "PUT",
      body: body,
    }).then((resp) => resp.json());
  }

  // static InsertSupplier(body) {
  //   console.log(body);
  //   console.log(JSON.stringify(body));
  //   console.log(typeof body);
  //   console.log(typeof JSON.stringify(body));
  //   return fetch("https://genshinimpact1234.pythonanywhere.com/supplier/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   }).then((resp) => resp.json());
  // }

  static InsertSupplier(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/supplier/add", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static DeleteSupplier(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/supplier/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
