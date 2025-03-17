export interface Element {
    id: string
    type: string
    content: string
    properties?: Record<string, any>
  }
  
  export interface Section {
    id: string
    name: string
    elements: Element[]
    properties?: Record<string, any>
  }
  
  export interface Template {
    id: string
    name: string
    sections: Section[]
  }
  
  