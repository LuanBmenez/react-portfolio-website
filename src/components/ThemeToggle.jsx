import { Sun } from "lucide-react"
import { useState } from "react"

    export const ThemeToggle = () =>{
        const [isDarkMod, SetIsDarkMode] = useState(false)

        return <button>{isDarkMod?<Sun/> : <Moon/>}</button>
    }