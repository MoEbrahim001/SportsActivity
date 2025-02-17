export interface Root {
    status: string
    message: string
    member: EditMemberType
  }
  
  export interface EditMemberType {
    id: number
    name: string
    nameAr: string
  }