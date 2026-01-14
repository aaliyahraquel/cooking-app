import { useTheme } from '../hooks/useTheme'

// styles 
import './ThemeSelector.css'

export default function () {
    const { changeColor } = useTheme()
    const themeColors = ['#58249c', '#249c6b', '#b70233']
    return (
        <div className="theme-selector">
            <div className="theme-buttons">
                {themeColors.map(color => (
                    <div 
                    key={color}
                    onClick={() => changeColor(color)}
                    style={{background: color}}
                    />
                ))}
            </div>
            
        </div>
    )
}
