
var clearColor;

var boundingBox;

var positions;
var indices;
var normals;
var colors;

var normes;

// IOBOUNDINGRADIUS

var insideBoundingRadius;
var outsideBoundingRadius;

var computeIOBoundingRadius = function () {

    var LX = (boundingBox[3] - boundingBox[0]);
    var LY = (boundingBox[4] - boundingBox[1]);
    var LZ = (boundingBox[5] - boundingBox[2]);

    var LXmilieu = LX * 0.5;
    var LYmilieu = LY * 0.5;
    var LZmilieu = LZ * 0.5;


    normes = [];

    var NumberPlots = positions.length / 3;

    var ind = 0;

    insideBoundingRadius = Number.MAX_VALUE;
    outsideBoundingRadius = 0;

    for (var i = 0; i < NumberPlots; i++) {
        var x = positions[ind + 0] - (boundingBox[0] + LXmilieu);
        var y = positions[ind + 1] - (boundingBox[1] + LYmilieu);
        var z = positions[ind + 2] - (boundingBox[2] + LZmilieu);

        var norme = Math.sqrt(x * x + y * y + z * z);
        normes.push(norme);
        insideBoundingRadius = Math.min(insideBoundingRadius, norme);
        outsideBoundingRadius = Math.max(outsideBoundingRadius, norme);
        ind += 3;
    }

    outsideBoundingRadius = outsideBoundingRadius * 1.01;
}

// MATERIALS

const MaterialsTable = {
    'emerald': [0.0215, 0.1745, 0.0215, 0.07568, 0.61424, 0.07568, 0.633, 0.727811, 0.633, 0.6],
    'jade': [0.135, 0.2225, 0.1575, 0.54, 0.89, 0.63, 0.316228, 0.316228, 0.316228, 0.1],
    'obsidian': [0.05375, 0.05, 0.06625, 0.18275, 0.17, 0.22525, 0.332741, 0.328634, 0.346435, 0.3],
    'pearl': [0.25, 0.20725, 0.20725, 1, 0.829, 0.829, 0.296648, 0.296648, 0.296648, 0.088],
    'ruby': [0.1745, 0.01175, 0.01175, 0.61424, 0.04136, 0.04136, 0.727811, 0.626959, 0.626959, 0.6],
    'turquoise': [0.1, 0.18725, 0.1745, 0.396, 0.74151, 0.69102, 0.297254, 0.30829, 0.306678, 0.1],
    'brass': [0.329412, 0.223529, 0.027451, 0.780392, 0.568627, 0.113725, 0.992157, 0.941176, 0.807843, 0.21794872],
    'bronze': [0.2125, 0.1275, 0.054, 0.714, 0.4284, 0.18144, 0.393548, 0.271906, 0.166721, 0.2],
    'polished_bronze': [0.25, 0.148, 0.06475, 0.4, 0.2368, 0.1036, 0.774597, 0.458561, 0.200621, 76.8],

    'chrome': [0.25, 0.25, 0.25, 0.4, 0.4, 0.4, 0.774597, 0.774597, 0.774597, 0.6],
    'copper': [0.19125, 0.0735, 0.0225, 0.7038, 0.27048, 0.0828, 0.256777, 0.137622, 0.086014, 0.1],
    'polished_copper': [0.2295, 0.08825, 0.0275, 0.5508, 0.2118, 0.066, 0.580594, 0.223257, 0.0695701, 51.2],
    'gold': [0.24725, 0.1995, 0.0745, 0.75164, 0.60648, 0.22648, 0.628281, 0.555802, 0.366065, 0.4],
    'polished_gold': [0.24725, 0.2245, 0.0645, 0.34615, 0.3143, 0.0903, 0.797357, 0.723991, 0.208006, 83.2],

    'pewter': [0.105882, 0.058824, 0.113725, 0.427451, 0.470588, 0.541176, 0.333333, 0.333333, 0.521569, 9.84615],
    'silver': [0.19225, 0.19225, 0.19225, 0.50754, 0.50754, 0.50754, 0.508273, 0.508273, 0.508273, 0.4],
    'polished_silver': [0.23125, 0.23125, 0.23125, 0.2775, 0.2775, 0.2775, 0.773911, 0.773911, 0.773911, 89.6],

    'black_plastic': [0.0, 0.0, 0.0, 0.01, 0.01, 0.01, 0.50, 0.50, 0.50, .25],
    'cyan_plastic': [0.0, 0.1, 0.06, 0.0, 0.50980392, 0.50980392, 0.50196078, 0.50196078, 0.50196078, .25],
    'green_plastic': [0.0, 0.0, 0.0, 0.1, 0.35, 0.1, 0.45, 0.55, 0.45, .25],
    'red_plastic': [0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.7, 0.6, 0.6, .25],
    'white_plastic': [0.0, 0.0, 0.0, 0.55, 0.55, 0.55, 0.70, 0.70, 0.70, .25],
    'yellow_plastic': [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.60, 0.60, 0.50, .25],

    'black_rubber': [0.02, 0.02, 0.02, 0.01, 0.01, 0.01, 0.4, 0.4, 0.4, .078125],
    'cyan_rubber': [0.0, 0.05, 0.05, 0.4, 0.5, 0.5, 0.04, 0.7, 0.7, .078125],
    'green_rubber': [0.0, 0.05, 0.0, 0.4, 0.5, 0.4, 0.04, 0.7, 0.04, .078125],
    'red_rubber': [0.05, 0.0, 0.0, 0.5, 0.4, 0.4, 0.7, 0.04, 0.04, .078125],
    'white_rubber': [0.05, 0.05, 0.05, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, .078125],
    'yellow_rubber': [0.05, 0.05, 0.0, 0.5, 0.5, 0.4, 0.7, 0.7, 0.04, .078125],

    //my materials
    'plaster': [1, 1, 1, 1, 1, 1, 0, 0, 0, 0.4],

    'inca_stone': [0.5, 0.5, 0.3, 0.5, 0.5, 0.2, 0.4, 0.3, 0.1, 0.4],

    'white_marble': [1, 0.95, 0.85, 1, 0.9, 0.8, 1, 1, 1, 1.4],
    'rose_marble': [1, 0.8, 0.8, 1, 0.7, 0.7, 1, 1, 1, 1.4],

    'black_mat': [0.01, 0.01, 0.01, 0.15, 0.15, 0.15, 0., 0., 0., .25],
    'cyan_mat': [0.01, 0.23, 0.23, 0.2, 0.3, 0.3, 0., 0., 0., .25],
    'green_mat': [0.01, 0.06, 0.01, 0.2, 0.6, 0.2, 0., 0., 0., .25],
    'red_mat': [0.06, 0.01, 0.01, 0.6, 0.2, 0.2, 0., 0., 0., .25],
    'white_mat': [0.06, 0.06, 0.06, 0.6, 0.6, 0.6, 0., 0., 0., .25],
    'yellow_mat': [0.06, 0.06, 0.01, 0.6, 0.6, 0.2, 0., 0., 0., .25]

};


const whitePalette = ["#FFFFFF"];
const lunarPalette = [
    "#00005F", "#00006F", "#00007F", "#00008F", "#00009F", "#0000AF", "#0000BF", "#1010CF", "#2020DF", "#3030EF", "#4040FF",
    "#FFB080", "#80FF80", "#80FF80", "#80FF80", "#80FF80", "#FFFFFF", "#FFFFFF", "#FFFFFF"];




var moonPalette = []; for (var i = 64; i < 256; i++) moonPalette.push("#" + i.toString(16) + i.toString(16) + i.toString(16));
const mercuryPalette = []; for (var i = 128; i < 256; i++) mercuryPalette.push("#" + (255 - i).toString(16) + (255 - i).toString(16) + (255 - i).toString(16));
const venusPalette = [
    "#2F2000", "#2F2000",
    "#3F2000", "#3F2000",
    "#6F3000", "#6F3000",
    "#8F3000", "#8F3000",
    //"#00FF00",
    "#FFA040", "#FFA040", "#FFA040",
    "#FFC050", "#FFC050", "#FFC050",
    "#FFD060", "#FFD060", "#FFD060",
    "#FFE070", "#FFE070", "#FFE070",
    "#FFFF80", "#FFFF80",
    "#FFFF80", "#FFFF80", "#FFFF80",
    "#FFFF80", "#FFFF80", "#FFFF80",
    "#FFFF80", "#FFFF80"];

const marsPalette = []; for (var i = 0; i < 256; i++) marsPalette.push("#" + (64 + Math.round(i / 1.5)).toString(16) + (32 + Math.round(i / 2)).toString(16) + (16 + Math.round(i / 4)).toString(16));
const plutoPalette = ["#2F2000", "#2F2000", "#2F2000", "#2F2000", "#3F2000", "#3F2000", "#3F2000", "#6F3000", "#6F3000", "#6F3000", "#8F3000", "#8F3000", "#FFA0A0", "#FFC0C0", "#FFD0D0", "#FFE0E0", "#FFFFFF", "#FFFFFF", "#FFFFFF",
    "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function mixRgb(a, pa, b, pb) {
    return {
        r: a.r * pa + b.r * pb,
        g: a.g * pa + b.g * pb,
        b: a.b * pa + b.b * pb
    };
}

//Elevation palettes

const elevationcolors_aztecCalendar = [
    { alt: 0, rgb: hexToRgb("#FFFF00") },
    { alt: 180, rgb: hexToRgb("#FFFF00") },
    { alt: 181, rgb: hexToRgb("#FFFFFF") },
    { alt: 410, rgb: hexToRgb("#FFFFFF") },
    { alt: 411, rgb: hexToRgb("#FFFF00") },
    { alt: 500, rgb: hexToRgb("#FFFF00") },
    { alt: 501, rgb: hexToRgb("#FFFFFF") },
    { alt: 580, rgb: hexToRgb("#FFFFFF") },
    { alt: 581, rgb: hexToRgb("#FFFF00") },
    { alt: 800, rgb: hexToRgb("#FFFF00") },
    { alt: 801, rgb: hexToRgb("#FFFFFF") },
    { alt: 1000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_earthEonHadeenBegin = [
    { alt: -10000, rgb: hexToRgb("#FFFF00") },
    { alt: -5000, rgb: hexToRgb("#FF0000") },
    { alt: 100, rgb: hexToRgb("#000000") },
    { alt: 8000, rgb: hexToRgb("#505050") }];

const elevationcolors_earthEonHadeenEnd = [
    { alt: -10000, rgb: hexToRgb("#00005F") },
    { alt: 0, rgb: hexToRgb("#00005F") },
    { alt: 1500, rgb: hexToRgb("#2F7A97") },
    { alt: 1600, rgb: hexToRgb("#3D6469") },
    { alt: 1700, rgb: hexToRgb("#89A299") },
    { alt: 1800, rgb: hexToRgb("#008000") },
    { alt: 1900, rgb: hexToRgb("#800000") },
    { alt: 2000, rgb: hexToRgb("#63776F") },
    { alt: 2200, rgb: hexToRgb("#63776F") },
    { alt: 2300, rgb: hexToRgb("#6A6652") },
    { alt: 4000, rgb: hexToRgb("#ABA79E") },
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_earthEonArcheen = [
    { alt: -10000, rgb: hexToRgb("#002F00") },
    { alt: 0, rgb: hexToRgb("#002F00") },
    { alt: 1300, rgb: hexToRgb("#006F00") },
    { alt: 1500, rgb: hexToRgb("#2F977A") },
    { alt: 1600, rgb: hexToRgb("#3D6964") },
    { alt: 1700, rgb: hexToRgb("#8999A2") },
    { alt: 1800, rgb: hexToRgb("#008000") },
    { alt: 1900, rgb: hexToRgb("#800000") },
    { alt: 2000, rgb: hexToRgb("#63776F") },
    { alt: 2200, rgb: hexToRgb("#63776F") },
    { alt: 2300, rgb: hexToRgb("#6A6652") },
    { alt: 4000, rgb: hexToRgb("#ABA79E") },
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_earthEonProterozoiquen = [
    { alt: -10000, rgb: hexToRgb("#00005F") },
    { alt: -6000, rgb: hexToRgb("#00005F") },
    { alt: -4000, rgb: hexToRgb("#00D0FF") },
    { alt: -3000, rgb: hexToRgb("#FFFFFF") },
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_earthEonPhanerozoique_Paleozoique = [
    { alt: -10000, rgb: hexToRgb("#00005F") },
    { alt: -2501, rgb: hexToRgb("#4040FF") },
    { alt: -2500, rgb: hexToRgb("#FFB000") },
    { alt: -2000, rgb: hexToRgb("#203020") },
    { alt: 0, rgb: hexToRgb("#2080FF") },
    { alt: 500, rgb: hexToRgb("#208010") },
    { alt: 2000, rgb: hexToRgb("#204020") },
    { alt: 3000, rgb: hexToRgb("#B0A080") },
    { alt: 4000, rgb: hexToRgb("#FFFFFF") },
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_earthEonPhanerozoique_Mesozoique = [
    { alt: -10000, rgb: hexToRgb("#00005F") },
    /*{ alt: -2501, rgb: hexToRgb("#4040FF") },
    { alt: -2500, rgb: hexToRgb("#FFB000") },
    { alt: -2000, rgb: hexToRgb("#203020") },*/
    { alt: 0, rgb: hexToRgb("#2080FF") },

    { alt: 1, rgb: hexToRgb("#FFB010") },//ROUGE
   /* { alt: 1, rgb: hexToRgb("#FF0000") },
    { alt: 499, rgb: hexToRgb("#FF0000") },
    */
    { alt: 525, rgb: hexToRgb("#FFB010") },//ROUGE

    { alt: 526, rgb: hexToRgb("#204020") },
    { alt: 1700, rgb: hexToRgb("#40B010") },
    { alt: 1800, rgb: hexToRgb("#D0A080") },
    { alt: 3000, rgb: hexToRgb("#FFFFFF") },
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_earthEonPhanerozoique_Cenozoique = [
    { alt: -10000, rgb: hexToRgb("#00005F") },
    { alt: -2501, rgb: hexToRgb("#4040FF") },
    { alt: -2500, rgb: hexToRgb("#4090B0") },
    { alt: -2000, rgb: hexToRgb("#FF9060") },
    { alt: -1000, rgb: hexToRgb("#40B010") },
    { alt: 0, rgb: hexToRgb("#2080FF") },
    { alt: 500, rgb: hexToRgb("#408040") },
    { alt: 2000, rgb: hexToRgb("#D08050") },
    { alt: 3000, rgb: hexToRgb("#FFFFFF") },
    { alt: 4000, rgb: hexToRgb("#FFFFFF") },//white
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_arrakis = [
    { alt: -10000, rgb: hexToRgb("#00005F") },
    { alt: -2501, rgb: hexToRgb("#4040FF") },
    { alt: -2500, rgb: hexToRgb("#FFB000") },
    { alt: -2000, rgb: hexToRgb("#203020") },
    { alt: 0, rgb: hexToRgb("#FFB000") },
    { alt: 500, rgb: hexToRgb("#804030") },
    { alt: 600, rgb: hexToRgb("#FFB000") },
    { alt: 800, rgb: hexToRgb("#408010") },
    { alt: 900, rgb: hexToRgb("#806020") },
    { alt: 1000, rgb: hexToRgb("#408010") },
    { alt: 1300, rgb: hexToRgb("#804030") },
    { alt: 1500, rgb: hexToRgb("#506050") },
    { alt: 2000, rgb: hexToRgb("#706060") },
    { alt: 3000, rgb: hexToRgb("#B0A080") },
    { alt: 4000, rgb: hexToRgb("#FFFFFF") },
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

const elevationcolors_Encelade = [
    { alt: -10000, rgb: hexToRgb("#00D0FF") },
    { alt: 8000, rgb: hexToRgb("#FFFFFF") }];

var elevationColorsComparaison = function (a, b) {

    if (a.alt < b.alt) { return -1 }
    if (a.alt == b.alt) { return 0 }
    if (a.alt > b.alt) { return 1 }

}

var elevationComputeColor = function (elevationColors, elevation) {

    var indInf = 0;
    while (elevationColors[indInf].alt < elevation) { indInf++ }
    indInf = Math.max(0, indInf - 1);

    var indSup = elevationColors.length - 1;
    while (elevationColors[indSup].alt > elevation) { indSup-- }
    indSup = Math.min(elevationColors.length - 1, indSup + 1);

    var distanceA = (elevation - elevationColors[indInf].alt);
    var distanceB = (elevationColors[indSup].alt - elevation);
    var distanceTot = distanceA + distanceB;

    return mixRgb(
        elevationColors[indInf].rgb,
        1 - distanceA / distanceTot,
        elevationColors[indSup].rgb,
        1 - distanceB / distanceTot);

}



var elevationColorization = function (elevationColors) {

    var sorted = elevationColors.sort(elevationColorsComparaison);

    var minElevation = sorted[0].alt;
    var maxElevation = sorted[sorted.length - 1].alt;

    for (var i = 0; i < sorted.length; i++) {
        sorted[i].alt = (sorted[i].alt - minElevation) / (maxElevation - minElevation);
    }

    colors = [];

    

    var facteur = 1 / (outsideBoundingRadius - insideBoundingRadius);

    var NumberPlots = positions.length / 3;

  

    //var nbIndex = palette.length - 1;
    //deuxieme passe calcul des couleurs de chaque plot
    for (var i = 0; i < NumberPlots; i++) {
        var elevation = ((normes[i] - insideBoundingRadius) * facteur);

        var color = elevationComputeColor(sorted, elevation);

        colors.push(color.r/256, color.g/256, color.b/256, 1);

    }

    return colors;
}

// REPOSITIONNEMENT

var changeMeshOrientationYZ = function () {

    var numberPlots = positions.length / 3;
    var ind = 0;

    var xmin = positions[0];
    var ymin = positions[2];
    var zmin = positions[1];

    var xmax = positions[0];
    var ymax = positions[2];
    var zmax = positions[1];

    for (var i = 0; i < numberPlots; i++) {

        var newZ = positions[ind + 1];
        var newY = positions[ind + 2];

        positions[ind + 1] = newY;
        positions[ind + 2] = newZ

        xmin = Math.min(xmin, positions[ind]);
        ymin = Math.min(ymin, positions[ind + 1]);
        zmin = Math.min(zmin, positions[ind + 2]);

        xmax = Math.max(xmax, positions[ind]);
        ymax = Math.max(ymax, positions[ind + 1]);
        zmax = Math.max(zmax, positions[ind + 2]);

        ind += 3;
    }

    boundingBox[0] = xmin;
    boundingBox[1] = ymin;
    boundingBox[2] = zmin;

    boundingBox[3] = xmax;
    boundingBox[4] = ymax;
    boundingBox[5] = zmax;
}

var resizeMesh = function () {

    var LX = (boundingBox[3] - boundingBox[0]);
    var LY = (boundingBox[4] - boundingBox[1]);
    var LZ = (boundingBox[5] - boundingBox[2]);

    var factor = 10.0 / Math.max(LX, LZ);

    var LXmilieu = LX * 0.5;
    var LYmilieu = LY * 0.5;
    var LZmilieu = LZ * 0.5;

    var numberPlots = positions.length / 3;
    var ind = 0;
    for (var i = 0; i < numberPlots; i++) {
        positions[ind + 0] = (positions[ind + 0]); // * factor;
        positions[ind + 1] = positions[ind + 1];// * factor;
        positions[ind + 2] = (positions[ind + 2]);// * factor;
        ind += 3;
    }

    boundingBox[0] = 0;
    boundingBox[1] = 0;
    boundingBox[2] = 0;
    boundingBox[3] = LX * factor;
    boundingBox[4] = LY * factor;
    boundingBox[5] = LZ * factor;
}




/* ############################################################################### */
// HERE IS SAMPLE CODE FROM https://learn.microsoft.com/en-us/visualstudio/javascript/tutorial-aspnet-with-typescript?view=vs-2022

function TSButton() {
    let name: string = "Fred";
    document.getElementById("ts-example").innerHTML = greeter(user);
}

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Fred", "M.", "Smith");


