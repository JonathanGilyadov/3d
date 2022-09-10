// Song & dance
import Hammer from "hammerjs";
import dicomParser from "dicom-parser";
import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

// import mprMetaDataProvider from './lib/mprMetadata/mprMetaDataProvider.js';
// import mprImageLoader from './mprImageLoader.js'
// import MprTool from './MprTool.js';
import { store } from "cornerstone-tools";

const setup = (access_token) => {
  _setPeerDependencies();
  _initWadoImageLoader();
  _initCornerstoneTools();

  cornerstoneWADOImageLoader.configure({
    beforeSend: function (xhr) {
      // Add custom headers here (e.g. auth tokens)
      xhr.setRequestHeader("Authorization", access_token);
    },
  });
  // cornerstone.registerImageLoader('mpr', mprImageLoader);
  // cornerstone.metaData.addProvider(mprMetaDataProvider);

  // Enable Elements

  store.state.enabledElements = [];
};

export default setup;

function _setPeerDependencies() {
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
}

function _initWadoImageLoader() {
  if (window.is_initWadoImageLoader === undefined) {
    window.is_initWadoImageLoader = false;
  } else if (window.is_initWadoImageLoader === false) {
    window.is_initWadoImageLoader = true;
  }

  if (window.is_initWadoImageLoader === false) {
    const config = {
      webWorkerPath:
        "/cornerstone/assets/cornerstoneWADOImageLoaderWebWorker.js",
      taskConfiguration: {
        decodeTask: {
          codecsPath: "/cornerstone/assets/cornerstoneWADOImageLoaderCodecs.js",
        },
      },
    };

    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
  }
}

function _initCornerstoneTools() {
  cornerstoneTools.init(
    {
      globalToolSyncEnabled: true,
    },
    {
      moduleName: "segmentation",
      configuration: {
        outlineWidth: 2,
      },
    }
  );

  //Set Tool Color
  cornerstoneTools.toolColors.setToolColor("red");
  cornerstoneTools.toolColors.setActiveColor("rgb(0, 255, 0)");
  //Set Tool Color

  // Grab Tool Classes
  const LengthTool = cornerstoneTools.LengthTool;
  const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
  const TextMarkerTool = cornerstoneTools.TextMarkerTool;
  const StackScrollTool = cornerstoneTools.StackScrollTool;
  const ZoomTool = cornerstoneTools.ZoomTool;
  const PanTool = cornerstoneTools.PanTool;
  const WwwcTool = cornerstoneTools.WwwcTool;
  const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
  const PanMultiTouchTool = cornerstoneTools.PanMultiTouchTool;
  const ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool;
  const RotateTool = cornerstoneTools.RotateTool;
  const ProbeTool = cornerstoneTools.ProbeTool;
  const AngleTool = cornerstoneTools.AngleTool;
  const BidirectionalTool = cornerstoneTools.BidirectionalTool;
  const CobbAngleTool = cornerstoneTools.CobbAngleTool;
  const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
  const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
  const FreehandRoiTool = cornerstoneTools.FreehandRoiTool;
  const StackScrollMultiTouchTool = cornerstoneTools.StackScrollMultiTouchTool;

  cornerstoneTools.addTool(ZoomTouchPinchTool);
  cornerstoneTools.addTool(StackScrollMultiTouchTool);
  cornerstoneTools.addTool(FreehandRoiTool);
  cornerstoneTools.addTool(StackScrollMouseWheelTool);
  cornerstoneTools.addTool(EllipticalRoiTool);
  cornerstoneTools.addTool(LengthTool);
  cornerstoneTools.addTool(AngleTool);
  cornerstoneTools.addTool(BidirectionalTool);
  cornerstoneTools.addTool(CobbAngleTool);
  cornerstoneTools.addTool(ArrowAnnotateTool);
  cornerstoneTools.addTool(RectangleRoiTool);
  cornerstoneTools.addTool(ProbeTool);
  cornerstoneTools.addTool(ZoomTool, {
    configuration: {
      invert: true,
      preventZoomOutsideImage: false,
      minScale: 0.1,
      maxScale: 20.0,
    },
  });

  cornerstoneTools.addTool(cornerstoneTools.ZoomTool);

  const configuration = {
    markers: ["F5", "F4", "F3", "F2", "F1"],
    current: "F5",
    ascending: true,
    loop: true,
  };

  cornerstoneTools.addTool(TextMarkerTool, { configuration });
  cornerstoneTools.addTool(StackScrollTool);

  cornerstoneTools.addTool(PanTool);
  cornerstoneTools.addTool(WwwcTool);
  cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool, {
    configuration: {
      invert: true,
      preventZoomOutsideImage: false,
      minScale: 0.1,
      maxScale: 20.0,
    },
  });
  //Add Grab

  //Else Add Grab
  cornerstoneTools.addTool(PanMultiTouchTool);
  //   cornerstoneTools.addTool(ZoomTouchPinchTool);
  //   cornerstoneTools.addTool(ZoomMouseWheelTool);
  cornerstoneTools.addTool(RotateTool);
}
