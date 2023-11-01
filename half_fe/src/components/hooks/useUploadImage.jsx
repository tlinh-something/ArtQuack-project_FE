import axios from "axios";

const uploadImage = async (file) => {
  var form = new FormData();
  form.append("image", file);

  console.log(form);

  var config = {
    method: "post",
    url: "https://api.imgbb.com/1/upload?key=67e5142af77eecd6de14bf32ae20fcac",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  const response = await axios(config);
  return response.data.data.display_url;
};

export default uploadImage;
