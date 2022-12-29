export default class VoucherServiceItemService {
  static GetVoucherServiceItems() {
    return fetch("http://127.0.0.1:5000/voucherserviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetVoucherServiceItem(voucher_id) {
    return fetch(
      `http://127.0.0.1:5000/voucherserviceitem/get/${voucher_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }

  static UpdateVoucherServiceItem(id, body) {
    return fetch(`http://127.0.0.1:5000/voucherserviceitem/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertVoucherServiceItem(body) {
    return fetch("http://127.0.0.1:5000/voucherserviceitem/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteVoucherServiceItem(id, body) {
    return fetch(`http://127.0.0.1:5000/voucherserviceitem/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
