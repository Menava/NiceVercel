export default class VoucherPaymentService {
  static GetVoucherPayments() {
    return fetch("/voucher/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetVoucherPayment(id) {
    return fetch(`//voucher_payment/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateVoucherPayment(id, body) {
    return fetch(`/voucher_payment/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertVoucherPayment(day, month, year, body) {
    return fetch(
      `/voucher_payment/add/${day}/${month}/${year}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((resp) => resp.json());
  }

  static DeleteVoucherPayment(id, body) {
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
}
