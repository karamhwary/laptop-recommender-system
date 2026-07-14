import axios from "axios";

// إضافة رقم عشوائي لمنع الكاش تماماً
const API_BASE = "http://localhost/laptop_recommender/backend/api";

export const getQuestions = async () => {
  // إضافة timestamp لمنع أي كاش
  const timestamp = new Date().getTime();
  const response = await axios.get(
    `${API_BASE}/get_questions.php?nocache=${timestamp}`,
  );
  return response;
};


export const submitAnswers = (answers) => {
  return axios.post(`${API_BASE}/recommend.php`, { answers });
};

export const getAllLaptops = (filter = "") => {
  const timestamp = new Date().getTime();
  if (filter && filter !== "all") {
    return axios.get(
      `${API_BASE}/get_laptops.php?best_for=${filter}&nocache=${timestamp}`,
    );
  }
  return axios.get(`${API_BASE}/get_laptops.php?nocache=${timestamp}`);
};

export const getLaptopDetails = (id) => {
  const timestamp = new Date().getTime();
  return axios.get(
    `${API_BASE}/get_laptop_details.php?id=${id}&nocache=${timestamp}`,
  );
};
