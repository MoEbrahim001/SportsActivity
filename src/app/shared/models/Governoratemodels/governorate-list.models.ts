export interface Root {
    results: GovernorateList[]
    totalResults: number
  }
  
  export interface GovernorateList {
    id: number
    code: string
    name: string
    nameAr: string
    logo: string
    area: number
    population: number
  }
  