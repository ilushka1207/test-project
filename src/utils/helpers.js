export const isValidItem = (item) => {
    const {
        artnumber,
        name,
        brand,
        weight,
        quantity,
        price,
        stock
    } = item;

    // TODO: Как бы хорошо здесь смотрелся Typescript :P Это кастомная примитивная проверка ввода значений
    // TODO: Так же сначала задумался сделать через for in, но решил без этого, всё-таки мы делаем isValidItem
    // TODO: для чего-то конкретного, а не абстрактного.

    if (!Number.isInteger(+artnumber) || +artnumber <= 0) {
        return { status: false, reason: "Некорректный артикул" };
    }
    if (typeof name !== "string" || name.length <= 3 || name.length >= 20) {
        return { status: false, reason: "Некорректное название продукта" };
    }
    if (typeof brand !== "string" || brand.length <= 3 || brand.length >= 20) {
        return { status: false, reason: "Некорректный бренд" };
    }
    if (!Number.isInteger(+weight) || +weight <= 0) {
        return { status: false, reason: "Некорректный вес" };
    }
    if (!Number.isInteger(+quantity) || +quantity <= 0) {
        return { status: false, reason: "Некорректная фасовка" };
    }
    if (!Number.isInteger(+price) || +price <= 0) {
        return { status: false, reason: "Некорректная цена" };
    }
    if (!Number.isInteger(+stock) || (+stock !== 0 && +stock !== 1)) {
        return {
            status: false,
            reason: "Некорректный статус наличия (0 или 1)"
        };
    }
    return { status: true };
};

// Превращаем 1245 в 1 245
export const prepareNumber = (string) => {
    return Number(string).toLocaleString();
};