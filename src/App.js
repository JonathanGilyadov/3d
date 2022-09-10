import { useEffect, useRef } from "react";
import "./App.css";
import { RenderingEngine } from "@cornerstonejs/core";
import { ViewportType } from "@cornerstonejs/core/dist/esm/enums";
import {
  ctVoiRange,
  createImageIdsAndCacheMetaData,
  initDemo,
} from "./utils/demo/helpers";
function App() {
  const el = useRef(null);
  useEffect(() => {
    const content = document.getElementById("content");
    const element = document.createElement("div");
    element.id = "cornerstone-element";
    element.style.width = "500px";
    element.style.height = "500px";

    content.appendChild(element);
    // ============================= //

    /**
     * Runs the demo
     */
    async function run() {
      // Init Cornerstone and related libraries
      await initDemo();

      // Get Cornerstone imageIds and fetch metadata into RAM
      const imageIds = await createImageIdsAndCacheMetaData({
        StudyInstanceUID:
          "1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463",
        SeriesInstanceUID:
          "1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561",
        wadoRsRoot: "https://d3t6nz73ql33tx.cloudfront.net/dicomweb",
        type: "STACK",
      });

      // Instantiate a rendering engine
      const renderingEngineId = "myRenderingEngine";
      const renderingEngine = new RenderingEngine(renderingEngineId);

      // Create a stack viewport
      const viewportId = "CT_STACK";
      const viewportInput = {
        viewportId,
        type: ViewportType.STACK,
        element,
        defaultOptions: {
          background: [0.2, 0, 0.2],
        },
      };

      renderingEngine.enableElement(viewportInput);

      // Get the stack viewport that was created
      const viewport = renderingEngine.getViewport(viewportId);

      // Define a stack containing a single image
      const stack = [imageIds[0]];

      // Set the stack on the viewport
      await viewport.setStack(stack);

      // Set the VOI of the stack
      viewport.setProperties({ voiRange: ctVoiRange });

      // Render the image
      viewport.render();
    }

    run();
  }, []);

  return (
    <div className="App">
      App
      <div id="cornerstone-element" ref={el}></div>
    </div>
  );
}

export default App;
