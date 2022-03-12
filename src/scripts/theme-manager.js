class ThemeManager {

    /**
     * @constructor
     */
    constructor() {
        const localStorageHasTheme = "theme" in localStorage;
        const operatingSystemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (localStorageHasTheme) {
            const localTheme = localStorage.getItem("theme");
            switch (localTheme) {
                case "light":
                    this.setLightTheme();
                    break;
                case "dark":
                    this.setDarkTheme();
                    break;
                default:
                    throw new Error("The theme is invalid");
            }
        } else if (operatingSystemThemeIsDark) {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    /**
     * Set the local storage theme.
     */
    setLocalTheme() {
        const localTheme = localStorage.getItem("theme");
        switch (this.theme) {
            case "light":
                if (localTheme !== "light") localStorage.setItem("theme", "light");
                break;
            case "dark":
                if (localTheme !== "dark") localStorage.setItem("theme", "dark");
                break;
            default:
                throw new Error("The theme is invalid");
        }
    }

    /**
     * Toggle the theme.
     */
    toggleTheme() {
        switch (this.theme) {
            case "light":
                this.setDarkTheme();
                break;
            case "dark":
                this.setLightTheme();
                break;
            default:
                throw new Error("The theme is invalid");
        }
    }

    /**
     * Set the light theme
     */
    setLightTheme() {
        this.theme = "light";
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
        }
        this.setLocalTheme();
    }

    /**
     * Set the dark theme.
     */
    setDarkTheme() {
        this.theme = "dark";
        if (!document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.add("dark");
        }
        this.setLocalTheme();
    }

}

export default ThemeManager;