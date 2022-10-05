import { useEffect, useRef } from 'react';
import './App.css';
import {
	RenderingEngine,
	Types,
	Enums,
	volumeLoader,
	CONSTANTS,
} from '@cornerstonejs/core';
import {
	ctVoiRange,
	createImageIdsAndCacheMetaData,
	initDemo,
	setCtTransferFunctionForVolumeActor,
} from './utils/demo/helpers';

const { ViewportType } = Enums;
function App() {
	const el = useRef(null);
	useEffect(() => {
		const content = document.getElementById('content');
		const element = document.createElement('div');
		element.id = 'cornerstone-element';
		element.style.width = '500px';
		element.style.height = '500px';

		content.appendChild(element);
		// ============================= //
		async function run() {
			// Init Cornerstone and related libraries
			await initDemo();

			// Get Cornerstone imageIds and fetch metadata into RAM
			const imageIds = await createImageIdsAndCacheMetaData({
				StudyInstanceUID:
					'1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
				SeriesInstanceUID:
					'1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
				wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
				type: 'VOLUME',
			});

			// Instantiate a rendering engine
			const renderingEngineId = 'myRenderingEngine';
			const renderingEngine = new RenderingEngine(renderingEngineId);

			// Create a stack viewport
			const viewportId = 'CT_SAGITTAL_STACK';
			const viewportInput = {
				viewportId,
				type: ViewportType.ORTHOGRAPHIC,
				element,
				defaultOptions: {
					orientation: Enums.OrientationAxis.SAGITTAL,
					background: [0.2, 0, 0.2],
				},
			};

			renderingEngine.enableElement(viewportInput);

			// Get the stack viewport that was created
			const viewport = renderingEngine.getViewport(viewportId);

			// Define a unique id for the volume
			const volumeName = 'CT_VOLUME_ID'; // Id of the volume less loader prefix
			const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
			const volumeId = `${volumeLoaderScheme}:${volumeName}`; // VolumeId with loader id + volume id

			// Define a volume in memory
			const volume = await volumeLoader.createAndCacheVolume(volumeId, {
				imageIds,
			});

			// Set the volume to load
			volume.load();

			// Set the volume on the viewport
			viewport.setVolumes([
				{ volumeId, callback: setCtTransferFunctionForVolumeActor },
			]);

			// Render the image
			viewport.render();
		}

		run();
	}, []);

	return (
		<div className='App'>
			App
			<div id='content' ref={el}></div>
		</div>
	);
}

export default App;
