<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="transaction in transactions"
      v-bind:key="transaction.id"
      v-bind:class="transaction.amount > 0 ? 'plus' : 'minus'"
    >
      {{ transaction.text }} <span>${{ transaction.amount }}</span
      ><button @click="deleteTransaction(transaction.id)" class="delete-btn">
        x
      </button>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";
const emit = defineEmits(["transactionDeleted"]);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};

//export default {
//  setup() {
//    const transactions = [
//      { id: 1, text: "Flower", amount: -19.99 },
//      { id: 2, text: "Salary", amount: 299.99 },
//      { id: 3, text: "Book", amount: 10.0 },
//      { id: 4, text: "Camera", amount: 150 },
//    ];
//    return {
//      transactions,
//    };
//  },
//};
//export default {
//  data() {
//    return {
//      transactions: [
//        { id: 1, text: "Flower", amount: -19.99 },
//        { id: 2, text: "Salary", amount: 299.99 },
//        { id: 3, text: "Book", amount: 10.0 },
//        { id: 4, text: "Camera", amount: 150 },
//      ],
//      name: "Something",
//    };
//  },
//  method: {},
//};
//
</script>
