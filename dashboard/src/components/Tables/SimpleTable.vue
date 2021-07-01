<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Дата занятия">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Время">{{ item.country }}</md-table-cell>
        <md-table-cell md-label="Отметка о посещении">
          <span v-if="item.city == `Посещение`" class="green">{{ item.city }}</span>
          <span v-else-if="item.city == `Пропуск`" class="red">{{ item.city }}</span>
          <span v-else-if="item.city == `Отработка`" class="orange">{{ item.city }}</span>
        </md-table-cell>
        <md-table-cell md-label="Оплата">
          <span v-if="item.pay" class="green">Оплачено</span>
          <span v-else class="red">Не оплачено</span>
        </md-table-cell>
        <md-table-cell md-label="Отработка">
          <md-button v-if="item.city == `Пропуск`" class="md-primary md-sm">Отработка</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
        {
          name: "01.10.2019",
          salary: "$36,738",
          country: "10:00",
          city: "Посещение",
          pay: true
        },
        {
          name: "08.10.2019",
          salary: "$23,738",
          country: "10:00",
          city: "Посещение",
          pay: true
        },
        {
          name: "15.10.2019",
          salary: "$56,142",
          country: "10:00",
          city: "Посещение",
          pay: true
        },
        {
          name: "22.10.2019",
          salary: "$38,735",
          country: "10:00",
          city: "Отработка",
          pay: true
        },
        {
          name: "29.10.2019",
          salary: "$63,542",
          country: "10:00",
          city: "Пропуск",
          pay: false
        },
        {
          name: "06.11.2019",
          salary: "$78,615",
          country: "10:00",
          city: "",
          pay: false
        }
      ]
    };
  }
};
</script>

<style>
  .red {
    background: linear-gradient(60deg, #d83232, #be1616);
    padding: 2px 4px;
    border-radius: 2px;
    color:white;
  }
  .green {
    background: linear-gradient(60deg, #66bb6a, #43a047);
    padding: 2px 4px;
    border-radius: 2px;
    color:white;
  }
  .orange {
    background: linear-gradient(60deg, #b48b4c, #e99210);
    padding: 2px 4px;
    border-radius: 2px;
    color:white;
  }
</style>
