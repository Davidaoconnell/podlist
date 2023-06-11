type BaseTransforms = {
	anim?: 'true' | 'false';
	background?: string;
	blur?: number;
	brightness?: number;
	contrast?: number;
	dpr?: number;
	gamma?: number;
	metadata?: 'keep' | 'copyright' | 'none';
	quality?: number;
	rotate?: 90 | 180 | 270;
	sharpen?: number;
	trim?: string;
};

type Fit = 'cover' | 'crop' | 'scale-down' | 'contain' | 'pad';
type Gravity = 'auto' | 'top' | 'left' | 'right' | 'bottom';

type Cover_Crop_Transforms = BaseTransforms & {
	fit: Extract<Fit, 'cover' | 'crop'>;
	gravity: Gravity;
};

type ScaleDown_Contain_Pad_Transforms = BaseTransforms & {
	fit: Extract<Fit, 'scale-down' | 'contain' | 'pad'>;
};

export type Transforms = BaseTransforms | Cover_Crop_Transforms | ScaleDown_Contain_Pad_Transforms;

export type ScreenSizes = {
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	'2xl'?: number;
};

export type Ratios = {
	sm: number; // Cannot be undefined b/c it acts as the default
	md?: number;
	lg?: number;
	xl?: number;
	'2xl'?: number;
};

// src: `${src}?width=${width}&height=${height}${transformParamsString}`,
// width,
// height,
// ratio,
// size,
// screenSize: SCREEN_SIZES[size],
// percentOfScreenWidth

export type ImgDataAtScreenSize = {
	size: keyof ScreenSizes;
	src: string;
	width: number;
	height: number;
	ratio: number;
	percentOfScreenWidth: number;
	screenSize: number;
};

export type SizeData = {
	sm: ImgDataAtScreenSize;
	md: ImgDataAtScreenSize;
	lg: ImgDataAtScreenSize;
	xl: ImgDataAtScreenSize;
	'2xl': ImgDataAtScreenSize;
};
