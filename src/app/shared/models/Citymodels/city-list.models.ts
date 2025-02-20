export interface Root {
    results: CityList[]
    totalResults: number
  }
  
  export interface CityList {
    id: number
    code: string
    name: string
    nameAr: string
    governorateId: number
    
  
  }