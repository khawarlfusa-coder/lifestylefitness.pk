import type { Order } from "@/data/mockData";

// Google Apps Script "Web app" URL (see google-apps-script/Code.gs). Empty = disabled.
export const ORDERS_SHEET_URL = "";

export function sendOrderToSheet(order: Order) {
  if (!ORDERS_SHEET_URL) return;
  // text/plain + no-cors avoids a CORS preflight, which Apps Script does not answer
  fetch(ORDERS_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...order, sentAt: new Date().toISOString() }),
  }).catch(() => {});
}
