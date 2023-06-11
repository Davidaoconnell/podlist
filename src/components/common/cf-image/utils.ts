import type {
	BaseTransforms,
	ImgDataAtScreenSize,
	Ratios,
	ScreenSizes,
	SizeData,
	Transforms
} from './image';

const SCREEN_SIZES = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536
} satisfies ScreenSizes;

export function convertTransformValuesToStringAndRemoveEmptyValues(transforms: Transforms) {
	return Object.entries(transforms)
		.filter((keyVal) => keyVal[1] !== undefined && keyVal[1] !== null)
		.reduce((acc, [key, value]) => {
			// @ts-expect-error - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
			acc[key] = value.toString();
			return acc;
		}, {} as Record<keyof Transforms, string>);
}

export function getResponsiveImgStrings({
	sizes = {},
	height,
	width,
	ratios,
	src,
	transforms
}: {
	sizes?: ScreenSizes;
	height: number;
	width: number;
	ratios?: Ratios;
	src: string;
	transforms: BaseTransforms;
}): {
	srcset: string;
	sizes: string;
	defaultSrc: string;
	sizeData: SizeData;
} {
	let lastGivenScreenWidth = sizes.sm || 100;
	let lastGivenRatio = ratios?.sm || width / height;

	const sizeDataPartial: Partial<SizeData> = {};
	const generatedWidths = new Set<number>();

	for (const screenSize of ['2xl', 'xl', 'lg', 'md', 'sm'] as const) {
		const data = getImgDataAtScreenSize({
			size: screenSize,
			src,
			maxWidth: width,
			maxHeight: height,
			percentOfScreenWidth: sizes[screenSize] || lastGivenScreenWidth,
			ratio: ratios?.[screenSize] || lastGivenRatio,
			transforms
		});
		lastGivenScreenWidth = data.percentOfScreenWidth;
		lastGivenRatio = data.ratio;
		sizeDataPartial[screenSize] = data;
		generatedWidths.add(data.width);
	}
	const sizeData: SizeData = sizeDataPartial as SizeData;

	const widthHeightLookupDict = {
		[sizeData.sm.width]: sizeData.sm.height,
		[sizeData.md.width]: sizeData.md.height,
		[sizeData.lg.width]: sizeData.lg.height,
		[sizeData.xl.width]: sizeData.xl.height,
		[sizeData['2xl'].width]: sizeData['2xl'].height
	};

	const transformParams = new URLSearchParams(
		convertTransformValuesToStringAndRemoveEmptyValues(transforms)
	);
	const transformParamsString =
		transformParams.toString().length > 0 ? `&${transformParams.toString()}` : '';

	const srcset = Array.from(generatedWidths)
		.map((size) => {
			const height = widthHeightLookupDict[size];
			return `${src}?width=${size}&height=${height}${transformParamsString} ${size}w`;
		})
		.join(', ');

	const htmlSizes =
		(['2xl', 'xl', 'lg', 'md', 'sm'] as const)
			.map((size) => {
				const width = sizeData[size].width;
				return `(min-width: ${SCREEN_SIZES[size]}px) ${width}px`;
			})
			.join(', ') + `, ${sizeData.sm?.width}px`; // Use sm as default

	const defaultSrc = `${src}?width=${width}&height=${height}${transformParamsString}`;

	return {
		srcset,
		sizes: htmlSizes,
		defaultSrc,
		sizeData: sizeData as SizeData
	};
}

// WIP to break this up into pieces
function getImgDataAtScreenSize({
	size,
	src,
	maxWidth,
	maxHeight,
	percentOfScreenWidth,
	ratio,
	transforms
}: {
	size: keyof ScreenSizes;
	src: string;
	maxWidth: number;
	maxHeight: number;
	percentOfScreenWidth: number;
	ratio: number;
	transforms: Transforms;
}): ImgDataAtScreenSize {
	const screenWidth = SCREEN_SIZES[size];
	let width = Math.min(Math.round(screenWidth * (percentOfScreenWidth / 100)), maxWidth);
	let height = Math.round(width / ratio);

	// TODO: is this the proper order to do this or is this even necessary?
	if (height > maxHeight) {
		height = maxHeight;
		width = Math.round(height * ratio);
	}

	const transformParams = new URLSearchParams(
		convertTransformValuesToStringAndRemoveEmptyValues(transforms)
	);
	const transformParamsString =
		transformParams.toString().length > 0 ? `&${transformParams.toString()}` : '';

	return {
		src: `${src}?width=${width}&height=${height}${transformParamsString}`,
		width,
		height,
		ratio,
		size,
		screenSize: SCREEN_SIZES[size],
		percentOfScreenWidth
	};
}
