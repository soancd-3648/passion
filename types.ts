
export interface AboutInfo {
    title: string;
    description: string;
    img: string;
}

export interface ContactInfo {
    address: string;
    hotline: string;
    email: string;
    map_img: string;
}

export interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
    video_url: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  img: string;
  description?: string;
}

export interface MenuItem {
  id: number;
  label: string;
  subLabel?: string;
  path: string;
  order: number;
}

export interface Collection {
    id: number;
    name: string;
    img: string;
    description?: string;
}

export interface NewsItem {
    id: number;
    title: string;
    date: string;
    summary: string;
    img: string;
}
