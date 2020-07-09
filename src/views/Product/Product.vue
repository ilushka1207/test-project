<template>
  <div class="product-view">
    <h2 class="product-view__title">Детальная страница товара {{ product.artnumber }}</h2>
    <v-card class="mx-auto" max-width="400" tile>
      <v-list-item two-line v-for="(item, key) in items" :key="key">
        <v-list-item-content>
          <v-list-item-title>{{ key }}</v-list-item-title>
          <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-toolbar flat color="white">
        <v-dialog v-model="isEditModalOpen" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Редактировать товар</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Редактировать товар</span>
            </v-card-title>

            <v-card-text>
              <!-- Здесь бы хорошо всё в один объект закинуть и по его ключам пройтись,
              т.к. у нас все свойства здесь однотипные-->
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.artnumber" label="Артикул"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Название товара"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.brand" label="Бренд"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.weight" label="Вес"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.quantity" label="Фасовка"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="Цена"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.stock" label="Наличие"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="onClose">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="onSave">Добавить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import { isValidItem, prepareNumber } from "../../utils/helpers";
import products from "../../mocks/products.json";

import "./Product.css";

export default {
  name: "product-view",

  props: {
    id: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      product: {},
      isEditModalOpen: false
    };
  },

  computed: {
    // Здесь можно использовать this.items вместо this.product, т.к. this.product у нас изначально копируется
    // напрямую в this.editedItem, и чтобы не плодить лишние костыли по типу слотов для prepareNumber, делаем так
    items() {
      return {
        ...this.product,
        weight: prepareNumber(this.product.weight),
        quantity: prepareNumber(this.product.quantity),
        price: prepareNumber(this.product.price)
      };
    }
  },

  methods: {
    onClose() {
      this.isEditModalOpen = false;
    },

    onSave() {
      const { status, reason } = isValidItem(this.editedItem);

      if (!status) {
        alert(reason);
        return false;
      } else {
        this.product = { ...this.editedItem };
        this.onClose();
      }
    }
  },

  created() {
    this.product = products.find(item => item.artnumber === this.id);
    this.editedItem = { ...this.product };
  }
};
</script>