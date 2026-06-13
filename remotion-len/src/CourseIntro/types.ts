export interface ImageTiming {
  image: string;
  startTime: number;
  endTime: number;
}

export interface Segment {
  id: string;
  text: string;
  audioFile: string;
  duration: number;
  images: string[];
  imageTiming: ImageTiming[];
}
