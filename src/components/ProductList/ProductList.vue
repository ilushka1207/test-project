<template>
  <div class="product-list">
    <v-card>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="products"
        sort-by="calories"
        class="elevation-1"
        :search="search"
        @click:row="onSelectItem"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog v-model="isEditModalOpen" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >Создать новый товар</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ modalTitle }}</span>
                </v-card-title>

                <v-card-text>
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
        </template>
        <template v-slot:item.weight="{ item: {weight} }">{{ prepareNumber(weight) }}</template>
        <template v-slot:item.price="{ item: {price} }">{{ prepareNumber(price) }}</template>
        <template v-slot:item.price="{ item: {quantity} }">{{ prepareNumber(quantity) }}</template>
        <template v-slot:item.controls="{ item }">
          <v-icon small class="mr-2" @click.stop="onEditItem(item)">mdi-pencil</v-icon>
          <v-icon small @click.stop="onDeleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { isValidItem, prepareNumber } from "../../utils/helpers";

import "./ProductList.css";

export default {
  name: "product-list",

  props: {
    products: {
      type: Array,
      default: () => []
    },

    headers: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isEditModalOpen: false,
      editedItem: {},
      search: ""
    };
  },

  watch: {
    // Очищаем модальное окно после закрытия
    isEditModalOpen(payload) {
      if (!payload) {
        this.editedItem = {};
      }
    }
  },

  computed: {
    modalTitle() {
      return this.editedIndex === -1
        ? "Создание нового продукта"
        : "Редактирование продукта";
    }
  },

  methods: {
    onEditItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.isEditModalOpen = true;
    },

    onDeleteItem(product) {
      confirm("Вы уверены, что хотите удалить товар?") &&
        this.$emit("on-delete-product", { product });
    },

    onClose() {
      this.isEditModalOpen = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },

    onSave() {
      const { status, reason } = isValidItem(this.editedItem);

      if (!status) {
        alert(reason);
        return false;
      }
      if (this.editedIndex > -1) {
        this.$emit("on-edit-product", {
          product: this.editedItem,
          index: this.editedIndex
        });
      } else {
        this.$emit("on-add-product", { product: this.editedItem });
      }
      this.onClose();
    },

    onSelectItem({ artnumber }) {
      this.$emit("on-select-item", artnumber);
    }
  },

  created() {
    this.prepareNumber = prepareNumber;
  }
};
</script>