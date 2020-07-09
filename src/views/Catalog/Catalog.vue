<template>
  <div class="catalog-view">
    <product-list
      :products="products"
      :headers="headers"
      @on-add-product="handleAddProduct"
      @on-edit-product="handleEditProduct"
      @on-delete-product="handleDeleteProduct"
      @on-select-item="handleSelectItem"
    />
  </div>
</template>

<script>
import ProductList from "../../components/ProductList/ProductList.vue";
import products from "../../mocks/products.json";

import "./Catalog.css";

export default {
  name: "catalog-view",
  components: {
    ProductList
  },

  data() {
    return {
      headers: [
        {
          text: "Артикул",
          value: "artnumber"
        },
        {
          text: "Название товара",
          value: "name"
        },
        {
          text: "Бренд",
          value: "brand"
        },
        {
          text: "Вес",
          value: "weight"
        },
        {
          text: "Фасовка",
          value: "quantity"
        },
        {
          text: "Цена",
          value: "price"
        },
        {
          text: "Наличие",
          value: "stock"
        },
        {
          text: "",
          value: "controls",
          sortable: false
        }
      ],
      products: []
    };
  },

  methods: {
    handleAddProduct({ product }) {
      this.products.push(product);
    },

    // Если просто заменять товары, иммутабельность в пропсах не сработает (не видит вложенные пропсы в объекты).
    // Это можно решить через компонент ProductItem в ProductList'е, которому мы будем напрямую передавать
    // props конкретного продукта, а не весь массив элементов
    handleEditProduct({ product, index }) {
      this.products.splice(index, 1);
      this.products.push(product);
    },

    handleDeleteProduct({ product }) {
      const index = this.products.indexOf(product);
      this.products.splice(index, 1);
    },

    handleSelectItem(artnumber) {
      this.$router.push({ name: "Product", params: { id: artnumber } });
    }
  },

  created() {
    this.products = products;
  }
};
</script>