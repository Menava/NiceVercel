export default class VoucherEmployeeService {

    static GetVoucherEmployees(){
      return fetch("/voucheremployee/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }

    static GetVoucherEmployee(voucher_id){
      return fetch(`//voucheremployee/get/${voucher_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }
  
    static UpdateVoucherEmployee(id, body) {
      return fetch(`/voucheremployee/update/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static InsertVoucherEmployee(body) {
      return fetch("/voucheremployee/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static DeleteVoucherEmployee(id, body) {
      return fetch(`/voucheremployee/delete/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }