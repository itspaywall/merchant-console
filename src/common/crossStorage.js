import crossStorage from "cross-storage";

const newCrossStorage = async () => {
    const result = new crossStorage.CrossStorageClient(
        "http://localhost:3000/hub.html"
    );
    await result.onConnect();
    return result;
};

export default {
    connection: newCrossStorage(),
};
