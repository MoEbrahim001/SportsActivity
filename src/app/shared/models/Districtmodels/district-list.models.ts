export interface Root {
    results: DistrictList[]
    totalResults: number
  }
  
  export interface DistrictList {
    id: number
    code: string
    name: string
    nameAr: string
    cityId: number
    
  
  }