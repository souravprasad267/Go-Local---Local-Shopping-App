export const getAllProducts = async () => {
  return await fetch("https://dummyjson.com/products").then((res) =>
    res.json()
  );
};

export const getAllProductsCatagory = async () => {
  return await fetch("https://dummyjson.com/products/categories").then((res) =>
    res.json()
  );
};

export const getProductsByCategory = async (category) => {
  return await fetch(
    `https://dummyjson.com/products/category/${category}`
  ).then((res) => res.json());
};

export const getCart = async () => {
  return await fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const addToCart = async (id) => {
  return await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [{ id: id, quantity: 1 }],
    }),
  }).then((res) => res.json());
};
