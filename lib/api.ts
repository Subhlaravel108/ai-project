import axios from "axios";

const api = axios.create({
  baseURL: "http://10.84.41.86/text-to-speech/wp-json/tts/v1",
});

export default api;