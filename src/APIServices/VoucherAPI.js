export default class VoucherService {
  static GetVouchers() {
    return fetch("/voucher/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetVoucher(id) {
    return fetch(`//voucher/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateVoucher(id, body) {
    return fetch(`/voucher/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertVoucher(body) {
    return fetch("/voucher/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteVoucher(id, body) {
    return fetch(`/voucher/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static GetSales(day, month, year) {
    return fetch(
      `/voucher/sales/${day}/${month}/${year}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  static GetCustomeVouchers(customerID) {
    return fetch(
      `/voucher/customervoucher/${customerID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }
}
