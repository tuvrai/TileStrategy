class Color {
    constructor(r, g, b, a = 1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    r = 0;
    g = 0;
    b = 0;
    a = 0;

    get ColorString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}

class BasicColors {
    static Forest = [21, 96, 52];
    static Stone = [120, 120, 120];
    static Sand = [255, 162, 0];
    static SeaWater = [0, 42, 255];
    static FreshWater = [0, 170, 255];
    static Swarm = [79, 29, 1];
    static City = [255, 0, 0];
}

var baseColors = [
    new Color(21, 96, 52),
    new Color(120,120,120)
];

function createColorGradient(baseColor, numLevels, level) {
    let hslBase = rgbToHsl(baseColor[0], baseColor[1], baseColor[2]);

    // Calculate lightness based on the specified level
    let lightness = hslBase[2] + (level / numLevels) * (1 - hslBase[2]);
    let rgbColor = hslToRgb(hslBase[0], hslBase[1], lightness);

    return rgbColor;
}

function getRgbString(r, g, b) {
    return `rgb(${r},${g},${b})`;
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}