// Paste into Extensions > Apps Script of the Google Sheet, then Deploy > Web app
// (Execute as: Me, Who has access: Anyone). Copy the Web app URL.
var HEADERS = ["Time (PKT)", "Order ID", "Name", "Phone", "City", "Address", "Items", "Subtotal", "Shipping", "Total", "Payment", "Status"];

function doPost(e) {
  var o = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  var items = (o.items || []).map(function (i) {
    return i.productName + " x" + i.quantity + " (Rs." + i.price + ")";
  }).join("\n");
  sheet.appendRow([
    Utilities.formatDate(new Date(o.sentAt || Date.now()), "Asia/Karachi", "dd-MMM-yyyy hh:mm a"),
    o.id, o.customerName, "'" + o.phone, o.city, o.address, items,
    o.subtotal, o.shippingFee, o.total, o.paymentMethod, o.status
  ]);
  return ContentService.createTextOutput("ok");
}
