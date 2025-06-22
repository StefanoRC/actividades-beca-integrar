const loanAmount = 10000; //Dinero solicitudo (entre 1000 y 50000)
const amountMin = 1000;
const amountMax = 50000;

const annualInterestRate = 12; //12% de interes anual  (entre 5% y 20%)
const annualInterestRateMin = 5;
const annualInterestRateMax = 20;

const termInMonths = 24; //Duracion de prestamo (entre 6 y 60)
const termInMonthsMin = 6;
const termInMonthsMax = 60;

const clientType = "returning"; //Tipo de cliente ("new", "returning" o "premium")
const clientNew = "new";
const discountNew = 0;
const clientReturning = "returning";
const discountReturning = 2;
const clientPremium = "premium";
const discountPremium = 5;

//Calcular cuota mensual del prestamo
function calculateMonthlyPayment(amount, rate, term) {
  const rateMonth = rate / 100 / 12;
  const paymentMonth = amount * rateMonth / (1 - Math.pow(1 + rateMonth, -term));
  return paymentMonth.toFixed(2);
}

//Calcula el monto total a pagar
function calculateTotalPayment(monthlyPayment, term) {
  return (totalPayment = (monthlyPayment * term).toFixed(2));
}

// Calcula el interés total generado
function calculateTotalInterest(totalPayment, loanAmount) {
  return (totalInterest = (totalPayment - loanAmount).toFixed(2));
}

//Calcula descuento por tipo de cliente
function applyDiscount(monthlyPayment, clientType) {
  let discountResult = 0;
  if (clientType == clientReturning) {
    const resultReturning = (monthlyPayment * discountReturning) / 100;
    discountResult = monthlyPayment - resultReturning;
  } else if (clientType == clientPremium) {
    const resultPremium = (monthlyPayment * discountPremium) / 100;
    discountResult = monthlyPayment - resultPremium;
  } else if (clientType == clientNew) {
    discountResult = (monthlyPayment * discountNew) / 100;
  }
  return discountResult.toFixed(2);
}

//Calcula el descuento que se le hace a cada cuota
function interestingDiscountClient(paymentMonth, applyDiscount) {
  let result;
  if (applyDiscount == discountNew) {
    result = discountNew;
  } else {
    result = paymentMonth - applyDiscount;
  }
  return result;
}

//validacion amount
function validationAmount() {
  return loanAmount >= amountMin && loanAmount <= amountMax;
}

//Validacion tasa de interes
function validationInterest() {
  return (annualInterestRate >= annualInterestRateMin && annualInterestRate <= annualInterestRateMax);
}

//Validacion plazo del prestamo
function validationTermMonth() {
  return termInMonths >= termInMonthsMin && termInMonths <= termInMonthsMax;
}

//Validacion de cliente
function validationClient() {
  return (clientType === clientReturning || clientType === clientPremium || clientType === clientNew);
}

// Función principal
function calculateLoan(amount, rate, term, clientType) {
  if (!validationAmount() || !validationInterest() || !validationTermMonth() || !validationClient()) {
    console.log("Error: uno o más valores ingresados no son válidos.");
  }

  const monthlyPayment = calculateMonthlyPayment(loanAmount, rate, termInMonths);
  const totalPayment = calculateTotalPayment(monthlyPayment, term);
  const totalInterest = calculateTotalInterest(totalPayment, amount);
  const discountApplied = monthlyPayment - interestingDiscountClient(monthlyPayment, applyDiscount(monthlyPayment, clientType));
  const discountMonth = (monthlyPayment - discountApplied).toFixed(2);

  return { monthlyPayment, discountMonth, totalPayment, totalInterest, clientType, discountApplied };
}

const result = calculateLoan(loanAmount, annualInterestRate, termInMonths, clientType);
console.log("=== DETALLES DEL PRÉSTAMO ===");
console.log(`La cuota mensual sin descuento es de $${result.monthlyPayment}`);
console.log(`La cuota mensual con descuento es de $${result.discountApplied}`);
console.log(`El total a pagar es de $${result.totalPayment}`);
console.log(`El interés total es de $${result.totalInterest}`);
console.log(`El cliente es del tipo "${result.clientType}" y se le aplicará un descuento de $${result.discountMonth} en cada cuota.`);