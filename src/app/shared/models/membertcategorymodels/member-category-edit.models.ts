export interface Root {
    status: string
    message: string
    member: EditMemberCategory
  }
  
  export interface EditMemberCategory {
    id: number
    name: string
    nameAr: string
  }