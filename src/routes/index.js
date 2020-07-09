import VueRouter from 'vue-router';

import Catalog from '../views/Catalog/Catalog.vue';
import Product from '../views/Product/Product.vue';
import NotFound from '../views/NotFound/NotFound.vue';

import products from '../mocks/products.json';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'Index',
            path: '/',
            redirect: {
                name: 'Catalog',
            },
        },

        {
            name: 'Catalog',
            path: '/catalog',
            component: Catalog,
            meta: {
                title: 'Каталог товаров',
            }
        },

        {
            name: 'Product',
            path: '/product/:id',
            component: Product,
            props: true,
            meta: {
                title: 'Детальная страница товара',
            },
            // Проверка, что товар существует (пока только таким способом, т.к. локально всё хранится)
            // Но, т.к. у нас нет store, новые добавленные товары не будут видны здесь
            // Будем считать, что products - какое-то место в store
            beforeEnter(to, from, next) {
                const { id } = to.params;
                if (!id) next('/404');
                else if (products.find((item) => item.artnumber === id)) {
                    next();
                } else {
                    next('/404');
                }
            }
        },

        {
            path: '/product',
            redirect: {
                name: 'Catalog',
            },
        },

        {
            name: 'NotFound',
            path: '/404',
            component: NotFound,
            meta: {
                title: 'Страница не найдена'
            }
        },
    ],
})