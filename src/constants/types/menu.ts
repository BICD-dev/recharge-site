export type SubmenuItem = {
    label: string;
    to: string;
  };    
  
  export type HeaderItem = {
    label: string;
    to: string;
    submenu?: SubmenuItem[];
  };