export interface Root {
    results: MemberCategoryList[]
    totalResults: number
  }
  
  export interface MemberCategoryList {
    id: number
    name: string
    nameAr: string
  }