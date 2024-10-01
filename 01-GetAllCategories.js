import axios from "axios";
import "dotenv/config";

const FAKESTORE_API = `${process.env.FAKESTORE_API}/products/categories`;
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

const uploadCategories = async (data, token) => {
  for (let category of data) {
    try {
      await axios.post(
        `${TTE_API}/category`,
        {
          name: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Category ${category} uploaded`);
    } catch (error) {
      console.error(`Error with category ${category}`);
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

const getAllCategories = async () => {
  const data = await getFakeStoreApiData();
  const { token } = await login();
  await uploadCategories(data, token);
  await logout(token);
};

getAllCategories();
