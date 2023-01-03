export default class VoucherEmployeeService {

    static GetVoucherEmployees(){
      return fetch("https://genshinimpact1234.pythonanywhere.com/voucheremployee/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }

    static GetVoucherEmployee(voucher_id){
      return fetch(`https://genshinimpact1234.pythonanywhere.com//voucheremployee/get/${voucher_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    }
  
    static UpdateVoucherEmployee(id, body) {
      return fetch(`https://genshinimpact1234.pythonanywhere.com/voucheremployee/update/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static InsertVoucherEmployee(body) {
      return fetch("https://genshinimpact1234.pythonanywhere.com/voucheremployee/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static DeleteVoucherEmployee(id, body) {
      return fetch(`https://genshinimpact1234.pythonanywhere.com/voucheremployee/delete/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }