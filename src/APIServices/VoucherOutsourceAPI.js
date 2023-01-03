export default class VoucherOutsourceService {

    static GetVoucherOutsources(){
      return fetch("http://127.0.0.1:5000/voucheroutsource/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }

    static GetVoucherOutsource(voucher_id){
      return fetch(`http://127.0.0.1:5000//voucheroutsource/get/${voucher_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }
  
    static UpdateVoucherOutsource(id, body) {
      return fetch(`http://127.0.0.1:5000/voucheroutsource/update/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static InsertVoucherOutsource(body) {
      return fetch("http://127.0.0.1:5000/voucheroutsource/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static DeleteVoucherOutsource(id, body) {
      return fetch(`http://127.0.0.1:5000/voucheroutsource/delete/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }