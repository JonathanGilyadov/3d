import initProviders from "./initProviders";
import initCornerstoneWADOImageLoader from "./initCornerstoneWADOImageLoader";
import initVolumeLoader from "./initVolumeLoader";
import { init as csRenderInit } from "@cornerstonejs/core";

export default async function initDemo() {
  initProviders();
  initCornerstoneWADOImageLoader();
  initVolumeLoader();
  await csRenderInit();
}
