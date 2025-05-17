<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expense="+expense" />
    <TransactionList
      @transactionDeleted="handleTransactionDeleted"
      :transactions="transactions"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";

import { useToast } from "vue-toastification";
const Toast = useToast();

import { ref, computed, onMounted } from "vue";

//Declare Transaction array
const transactions = ref([]);
// ref([
//   { id: 1, text: "Flower", amount: -19.99 },
//   { id: 2, text: "Salary", amount: 299.97 },
//   { id: 3, text: "Book", amount: -10.0 },
//   { id: 4, text: "Camera", amount: 150 },
// ]);

//Get Total Balance
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

//Get Income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
});

//Get Expense
const expense = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
});

//Add Transaction
const handleTransactionSubmitted = (transactionData) => {
  //console.log(transactionData);

  //transactions.value.push({ id: Date.now(), ...transactionData });
  transactions.value.push({
    id: generateUniquieID(),
    text: transactionData.text,
    amount: transactionData.amount,
  });
  saveTransactionsToLocalStorage();
  Toast.success("Transaction Added!!!");

  console.log(transactions.value);
};

//Delete Transaction
const handleTransactionDeleted = (id) => {
  //   transactions.value.slice(id, 1);
  //   Toast.success("Transaction Deleted!!!");
  //remove the transaction from transactions array by the ID
  //   console.log(transactions.value.splice(transactions.value.indexOf(id), 1));
  //   console.log(id);
  //   console.log(transactions.value.splice(id, 1));
  //   transactions.value.splice(transactions.value.indexOf(id), 1);

  transactions.value = transactions.value.filter((trans) => trans.id !== id);
  saveTransactionsToLocalStorage();
  Toast.success("Transaction Deleted!!!");
  console.log(transactions.value);
};

//Generate Unique ID
const generateUniquieID = function () {
  return Math.trunc(Math.random() * 1000000);
  //return Date.now();
};

//OnMounted
onMounted(() => {
  const savedTransaction = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransaction) {
    transactions.value = savedTransaction;
  }
});

//Save to LocalStorage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
