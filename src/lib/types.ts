export type BackdropProps = {
	imgSource: string;
	children?: any;
};

// #region Hopeless
export type StandaloneImageProps = {
	source: string;
	alt: string;
	width: number;
};

export type PolaroidProps = {
	source: string;
	alt: string;
	width: number;
	children?: any;
};

export type QuoteProps = {
	speaker: string;
	date: string;
	children?: any;
};
// #endregion

// #region The Waiting
export type PoemProps = {
	imgSource: string;
	title: string;
	date: string;
	children?: any;
};
// #endregion

// #region Surrender

export type DiaryProps = {
	date: string;
	datestamp: string;
	ratingValue?: number;
	ratingTotal?: number;
	images?: string[];
	children?: any;
};

export type TextProps = {
	contact: string;
	children?: any;
};

export type TimestampProps = {
	date: string;
	time: string;
};

export type JustPictureProps = {
	imgSrc: string;
	imgAlt: string;
};

export type PoemInJournalProps = {
	title: string;
	children?: any;
};

export type DiscordMessageProps = {
	username: string;
	profilePicSrc: string;
	timestamp: string;
	children?: any;
};

export type DiscordDayDividerProps = {
	date: string;
};

export type ObsidianLinkProps = {
	href: string;
	target?: string;
	children?: any;
};

export type NotesProps = {
	title: string;
	children?: any;
};

// #endregion
