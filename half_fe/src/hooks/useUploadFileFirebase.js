// import { getStorage, ref, uploadBytes } from "firebase/storage";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

// const storage = getStorage();

const uploadVideo = async (file) => {
  const storageRef = ref(storage, "some-child");
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);

  return downloadURL;
};

export default uploadVideo;
