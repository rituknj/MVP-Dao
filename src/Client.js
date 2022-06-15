import Client from "@sanity/client";

export default Client({
    projectId: "xmqp1x35",
    dataset: "production",
    apiVersion: '2021-08-31',
    useCdn: true
});