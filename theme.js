class ThemeManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadSavedTheme();
    }

    initializeElements() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.themePanel = document.querySelector('.theme-panel');
        this.primaryColorInput = document.getElementById('primaryColor');
        this.secondaryColorInput = document.getElementById('secondaryColor');
        this.xColorInput = document.getElementById('xColor');
        this.oColorInput = document.getElementById('oColor');
    }

    setupEventListeners() {

        this.themeToggle.addEventListener('click', () => {
            const isHidden = this.themePanel.style.display === 'none';
            this.themePanel.style.display = isHidden ? 'block' : 'none';
        });


        document.addEventListener('click', (e) => {
            if (!this.themeSelector.contains(e.target)) {
                this.themePanel.style.display = 'none';
            }
        });


        this.primaryColorInput.addEventListener('input', () => this.updateTheme());
        this.secondaryColorInput.addEventListener('input', () => this.updateTheme());
        this.xColorInput.addEventListener('input', () => this.updateTheme());
        this.oColorInput.addEventListener('input', () => this.updateTheme());
    }

    updateTheme() {
        const root = document.documentElement;
        const primary = this.primaryColorInput.value;
        const secondary = this.secondaryColorInput.value;
        const xColor = this.xColorInput.value;
        const oColor = this.oColorInput.value;

        root.style.setProperty('--primary-color', primary);
        root.style.setProperty('--secondary-color', secondary);
        root.style.setProperty('--x-color', xColor);
        root.style.setProperty('--o-color', oColor);
        root.style.setProperty('--gradient', `linear-gradient(135deg, ${primary}, ${secondary})`);

        this.saveTheme();
    }

    saveTheme() {
        const theme = {
            primary: this.primaryColorInput.value,
            secondary: this.secondaryColorInput.value,
            xColor: this.xColorInput.value,
            oColor: this.oColorInput.value
        };
        localStorage.setItem('gameTheme', JSON.stringify(theme));
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('gameTheme');
        if (savedTheme) {
            const theme = JSON.parse(savedTheme);
            this.primaryColorInput.value = theme.primary;
            this.secondaryColorInput.value = theme.secondary;
            this.xColorInput.value = theme.xColor;
            this.oColorInput.value = theme.oColor;
            this.updateTheme();
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 