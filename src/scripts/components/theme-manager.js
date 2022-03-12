class ThemeManager {

    /**
     * @constructor
     */
    constructor() {
        const localStorageThemeIsDark = localStorage.theme === "dark";
        const localStorageTheme = "theme" in localStorage;
        const operatingSystemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (localStorageThemeIsDark || (!localStorageTheme && operatingSystemThemeIsDark)) {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    /**
     * Set the local storage theme.
     */
    setLocalTheme() {
        switch (this.theme) {
            case "light":
                if (localStorage.theme !== "dark") localStorage.theme = "light";
                break;
            case "dark":
                if (localStorage.theme !== "light") localStorage.theme = "dark";
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