export default class VoucherEmployeeService {

    static GetVoucherEmployees(){
      return fetch("http://127.0.0.1:5000/voucheremployee/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }

    static GetVoucherEmployee(voucher_id){
      return fetch(`http://127.0.0.1:5000//voucheremployee/get/${voucher_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }
  
    static UpdateVoucherEmployee(id, body) {
      return fetch(`http://127.0.0.1:5000/voucheremployee/update/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static InsertVoucherEmployee(body) {
      return fetch("http://127.0.0.1:5000/voucheremployee/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static DeleteVoucherEmployee(id, body) {
      return fetch(`http://127.0.0.1:5000/voucheremployee/delete/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }