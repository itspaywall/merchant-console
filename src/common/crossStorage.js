import crossStorage from "cross-storage";

const newCrossStorage = async () => {
    const result = new crossStorage.CrossStorageClient(
        `${process.env.REACT_APP_WEBSITE_URL}/hub.html`
    );
    await result.onConnect();
    return result;
};

export default {
    connection: newCrossStorage(),
};
