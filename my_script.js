//inisiasi variabel
var list_order = $("#list_order");
var list_report = $("#list_report");
var income = $("#income");
var transfer = $("#transfer");
var cash = $("#cash");
var submit_button = $("#submit_button");
var enter_button = $("#enter_button");

var order_data = [];
var report_data = [];


function my_order() {
  var order = "";
  var total_order = 0;
  order_data.forEach(function input(data, index)  {
    var { name, price, quantity, total, date } = data;
    var d = new Date();
    var h = `${d.getHours(date)}`;
    var m = `${d.getMinutes(date)}`;
    var displayDate = h + ":" + m ;
    total_order = total_order + total;
    order = order + `<tr>
                          <th>${index + 1}</th>
                          <td >${displayDate}</td>
                          <td >${name}</td>
                          <td >${quantity} * ${price}</td>
                          <td >${total}</td>
                      </tr>`;
                                });

 order = order +  `<tr>
                      <th></th>
                      <td></td>
                      <td></td>
                      <td style="font-weight:bold; font-size:20px;">Total</td>
                      <th>${total_order}</td>
                  </tr>
`;
  list_order.html(order);
}

var transfer_total = 0;
var cash_total = 0;

function my_report() {
  var report = "";
  var my_income = 0;
  
  transfer.text(transfer_total);
  cash.text(cash_total);

  
  if (cash_total >= 1000000) {
    cash_total = cash_total - 1000000;
    transfer_total = transfer_total + 1000000
    report = report + `<tr
                          style='background-color:red' onclick='my_report()'>
                          <td colspan='4' style='color: white'>Transfer to Bank 1 Million</td>
                      </tr>`
    transfer.text(transfer_total);
    cash.text(cash_total);
;}
  


 report_data.forEach(function my_input(data, index){
  
    var { name, total, date} = data;
    my_income = my_income + total;
    var d = new Date();
    var h = `${d.getHours(date)}`;
    var m = `${d.getMinutes(date)}`;
    var displayDate = h + ":" + m ;

    report = report + `<tr>
                          <th>${index+1}</th>
                          <td >${displayDate}</td>
                          <td >${name}</td>
                          <td >${total}</td>
                      </tr>`;

  });

  income.text(my_income);
  list_report.html(report);
}




function enter_butt() {
  var name = $("#name").val();
  var price = +$("#price").val();
  var quantity = +$("#qty").val();
  var total = price * quantity;
  var order_para = {name, price, quantity, total};
  order_data.push(order_para);
  $("#name").val("");
  $("#price").val("");
  $("#qty").val("");
  my_order();
};

enter_button.on("click", enter_butt )
  

function get_total(data) {
  return data.reduce((temp, data_1) => temp + data_1.total, 0);
}

function submit_butt ()  {
  
  cash_total = cash_total + get_total(order_data);
  report_data = [...report_data, ...order_data];

  cash.text(cash_total);

  my_order();
  my_report();
};

submit_button.on("click", submit_butt)




