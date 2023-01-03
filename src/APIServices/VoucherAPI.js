export default class VoucherService {
  static GetVouchers() {
    return fetch("http://127.0.0.1:5000/voucher/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
  static GetVoucher(id) {
    return fetch(`http://127.0.0.1:5000//voucher/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static UpdateVoucher(id, body) {
    return fetch(`http://127.0.0.1:5000/voucher/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertVoucher(body) {
    return fetch("http://127.0.0.1:5000/voucher/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteVoucher(id, body) {
    return fetch(`http://127.0.0.1:5000/voucher/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static GetSales(day, month, year) {
    return fetch(
      `http://127.0.0.1:5000/voucher/sales/${day}/${month}/${year}/`,
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
      `http://127.0.0.1:5000/voucher/customervoucher/${customerID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }

  static Get_ItemProfit() {
    return fetch(`http://127.0.0.1:5000/itemprofit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
