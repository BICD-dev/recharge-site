// ThemeContext.tsx
import { createContext} from "react";
import type { ThemeContextType } from "../../constants/types/Theme.ts";



export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
