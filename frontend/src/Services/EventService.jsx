import axios from "axios";

const postEvent = async (
  name,
  beginingDate,
  endDate,
  adress,
  confidentiality,
  tag,
  minimalAge,
  seats,
  token
) => {
  const data = new URLSearchParams();
  data.append("name", name);
  data.append("beginingDate", beginingDate);
  data.append("endDate", endDate);
  data.append("adress", adress);
  data.append("confidentiality", confidentiality);
  data.append("tag", tag);
  data.append("minimalAge", minimalAge);
  data.append("seats", seats);
  console.log(beginingDate);
  return axios.post("http://localhost:3000/events", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


const myFeed =  (
  token
) => {
  return axios.get("http://localhost:3000/feed", {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export { postEvent, myFeed };
