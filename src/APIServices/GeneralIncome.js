export default class GeneralIncomeService {
  static GetGeneralIncomes() {
    return fetch(
      "https://genshinimpact1234.pythonanywhere.com/generalincome/get",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }
  static GetGeneralIncome(id) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com//generalincome/get/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
  }

  static UpdateGeneralIncome(id, body) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/generalincome/update/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((resp) => resp.json());
  }

  static InsertGeneralIncome(body) {
    return fetch(
      "https://genshinimpact1234.pythonanywhere.com/generalincome/add/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((resp) => resp.json());
  }

  static DeleteGeneralIncome(id) {
    return fetch(
      `https://genshinimpact1234.pythonanywhere.com/generalincome/delete/${id}/`,
      {
        method: "DELETE",
      }
    ).then((resp) => resp.json());
  }
}
