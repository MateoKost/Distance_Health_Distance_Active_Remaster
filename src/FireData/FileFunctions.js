import { storage } from "../base.js";

const retrieveDownloadUrl = async (url) => {
  const fileRef = storage.ref().child(url);
  let contentType;
  await fileRef
    .getMetadata()
    .then((result) => (contentType = result.contentType));
  const downloadURL = await fileRef.getDownloadURL();
  return { contentType: contentType, downloadURL: downloadURL };
};

export function taskMedia(media, setDownloables, setDownloablesPending) {
  async function fetchDownloableURLs() {
    let downloables = [];
    const promises = media.map(async (url) => {
      await retrieveDownloadUrl(url).then((result) => {
        downloables.push(result);
      });
    });
    return await Promise.all(promises)
      .then(() => setDownloables(downloables))
      .then(() => setDownloablesPending(false));
  }

  media && fetchDownloableURLs();
}

export const fetchData = async ({ ref, query, dataSetter, pendingSetter }) => {
  let documents = [];
  const snapshot = query
    ? await ref.where(query.fieldPath, query.opStr, query.value).get()
    : await ref.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  } else {
    snapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });

      Promise.all(documents)
        .then(() => {
          dataSetter(documents);
        })
        .then(() => {
          pendingSetter(false);
        });
    });
    return documents;
  }
};

export const uploadFile = async (file, mediaChildPaths) => {
  const childPath = "Videos/" + file.name;
  const fileRef = storage.ref().child(childPath);
  try {
    await fileRef.put(file).then(() => {
      mediaChildPaths.push(childPath);
    });
  } catch (error) {
    alert(error);
  }
};
