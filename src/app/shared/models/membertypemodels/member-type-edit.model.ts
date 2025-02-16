export interface Root {
    status: string
    message: string
    member: Member
  }
  
  export interface Member {
    id: number
    name: string
    nameAr: string
  }