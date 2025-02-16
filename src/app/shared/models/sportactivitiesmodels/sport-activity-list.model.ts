// export interface SportActivityList {
//   id: number;
//   code: string;
//   nameAr: string;
//   nameEn: string;
//   image: string;
// }
export interface sport {
  status: string
  activities: SportActivityList[]
}

export interface SportActivityList {
  id: number
  code: string
  nameAr: string
  nameEn: string
  image: any
}