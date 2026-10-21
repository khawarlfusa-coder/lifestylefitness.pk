import type { Order } from "@/data/mockData";

// Google Apps Script "Web app" URL (see google-apps-script/Code.gs). Empty = disabled.
export const ORDERS_SHEET_URL =
  "https://script.google.com/macros/s/AKfycby_3kXLamKHX3sXnm0ex7rRRRj20s-eldrWi6II_ZLHITW5n6Pkd0bpw8kD4GCVp9Hn/exec";

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
