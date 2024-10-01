import axios from "axios";
import "dotenv/config";

const FAKESTORE_API = `${process.env.FAKESTORE_API}/products`;
const TTE_API = process.env.TTE_API;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

const getFakeStoreApiData = async () => {
  try {
    const { data } = await axios.get(FAKESTORE_API);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const login = async () => {
  const creds = {
    email: USER_EMAIL,
    password: USER_PASSWORD,
  };
  try {
    const { data } = await axios.post(`${TTE_API}/login`, creds);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCategoriesFromDB = async () => {
  try {
    const categories = {};
    const { data } = await axios.get(`${TTE_API}/category`);
    for (let category of data) {
      categories[category.name] = category.id;
    }
    return categories;
  } catch (error) {
    console.error(error);
  }
};

const uploadProducts = async (data, categories, token) => {
  for (let product of data) {
    try {
      await axios.post(
        `${TTE_API}/products`,
        {
          title: product.title,
          price: product.price,
          description: product.description,
          category: categories[product.category],
          image: product.image,
          stock: Math.round(Math.random() * 100),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Product ${product.title} uploaded`);
    } catch (error) {
      console.error(`Error with product ${product}`);
    }
  }
};

const logout = async (token) => {
  try {
    await axios.post(
      `${TTE_API}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Successful logout");
  } catch (error) {
    console.error(error);
  }
};

const getAllProducts = async () => {
  const data = await getFakeStoreApiData();
  const { token } = await login();
  const categories = await getCategoriesFromDB();
  await uploadProducts(data, categories, token);
  await logout(token);
};

getAllProducts();
