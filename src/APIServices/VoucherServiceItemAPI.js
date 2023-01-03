export default class VoucherServiceItemService {
  static GetVoucherServiceItems() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/voucherserviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetVoucherServiceItem(voucher_id) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/voucherserviceitem/get/${voucher_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }

  static UpdateVoucherServiceItem(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/voucherserviceitem/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertVoucherServiceItem(body) {
    return fetch("https://genshinimpact1234.pythonanywhere.com/voucherserviceitem/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteVoucherServiceItem(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/voucherserviceitem/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
