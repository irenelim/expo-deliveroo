import sanityClient from "@sanity/client";
import imageBuilder from '@sanity/image-url'
import Constants from "expo-constants";

const client = sanityClient({
  projectId: Constants.manifest.extra.sanityProjectId,
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21"
});

const builder = imageBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
