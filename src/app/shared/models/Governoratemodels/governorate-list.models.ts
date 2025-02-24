import { CityList } from "../Citymodels/city-list.models"
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
    cities: CityList[]; // ✅ Ensure cities exist

  }
  