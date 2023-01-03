export default class VoucherPaymentService {
  static GetVoucherPayments() {
    return fetch("https://genshinimpact1234.pythonanywhere.com/voucher/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetVoucherPayment(id) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com//voucher_payment/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateVoucherPayment(id, body) {
    return fetch(`https://genshinimpact1234.pythonanywhere.com/voucher_payment/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertVoucherPayment(day, month, year, body) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/voucher_payment/add/${day}/${month}/${year}/`,
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
    return fetch(`https://genshinimpact1234.pythonanywhere.com/voucher/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static GetSales(day, month, year) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/voucher/sales/${day}/${month}/${year}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
