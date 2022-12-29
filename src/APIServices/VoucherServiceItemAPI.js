export default class VoucherServiceItemService {
  static GetVoucherServiceItems() {
    return fetch("/voucherserviceitem/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetVoucherServiceItem(voucher_id) {
    return fetch(
      `/voucherserviceitem/get/${voucher_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }

  static UpdateVoucherServiceItem(id, body) {
    return fetch(`/voucherserviceitem/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertVoucherServiceItem(body) {
    return fetch("/voucherserviceitem/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteVoucherServiceItem(id, body) {
    return fetch(`/voucherserviceitem/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
