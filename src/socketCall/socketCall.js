import Cookies from "js-cookie";

export async function changeCookie(dispatch) {
  const data = await GeneralPurchaseService.GetGeneralPurchases();
  dispatch(fetchGeneralPurchases({ data }));
}
