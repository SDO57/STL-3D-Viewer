/*
var clearColor;
var boundingBox;
var positions;
var indices;
var normals;
*/


/*
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
*/

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}


/*
// REPOSITIONNEMENT

var changeMeshOrientationYZ = function () {

    var numberFaces = positions.length / 3;
    var ind = 0;

    var xmin = positions[0];
    var ymin = positions[2];
    var zmin = positions[1];

    var xmax = positions[0];
    var ymax = positions[2];
    var zmax = positions[1];

    for (var i = 0; i < numberFaces; i++) {

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

    var numberFaces = positions.length / 3;
    var ind = 0;
    for (var i = 0; i < numberFaces; i++) {
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
*/


changeMeshOrientationYZ();
//resizeMesh();



BABYLON.VertexData.ComputeNormals(positions, indices, normals);



var Color3Red = new BABYLON.Color3(1, 0, 0);
var Color3Green = new BABYLON.Color3(0, 1, 0);
var Color3Blue = new BABYLON.Color3(0, 0, 1);

var ColorWhite = new BABYLON.Color3(1, 1, 1);


var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
    return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
};



var showRGBPointLight = function (intensity, scene) {




    var lightP1 = new BABYLON.PointLight("lightP1", new BABYLON.Vector3(-1000, 0, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    lightP1.intensity = intensity;
    //lightPRed.diffuse = new BABYLON.Color3(1, 0, 0);
    lightP1.specular = ColorWhite;

    var lightP2 = new BABYLON.PointLight("lightP2", new BABYLON.Vector3(+1000, 0, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    lightP2.intensity = intensity;
    //lightPRed.diffuse = new BABYLON.Color3(1, 0, 0);
    lightP2.specular = ColorWhite;




}


var showAmbiantLight = function (intensity, scene) {

    var lightAmbiant = new BABYLON.HemisphericLight("lightAmbiant", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    lightAmbiant.intensity = intensity;
    lightAmbiant.diffuse = new BABYLON.Color3(1, 1, 1);
    lightAmbiant.specular = new BABYLON.Color3(1, 1, 1);
    return lightAmbiant;
}

function showNormals(mesh, size, color, sc) {
    var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
    var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    color = color || BABYLON.Color3.White();
    sc = sc || scene;
    size = size || 1;

    var lines = [];
    for (var i = 0; i < normals.length; i += 3) {
        var v1 = BABYLON.Vector3.FromArray(positions, i);
        var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
        lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
    }
    var normalLines = BABYLON.MeshBuilder.CreateLineSystem("normalLines", { lines: lines }, sc);
    normalLines.color = color;
    return normalLines;
}





const createSceneSTL = () => {

    // SCENE
    var scene = new BABYLON.Scene(engine);
    var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.env", scene);
    scene.environmentTexture = hdrTexture;

    // CUSTOM MESH

    //take uv value relative to bottom left corner of roof (-4, -4) noting length and width of roof is 8
    // base uv value on the x, z coordinates only
    var uvs = [];
    for (var p = 0; p < positions.length / 3; p++) {
        uvs.push((positions[3 * p] - (-4)) / 8, (positions[3 * p + 2] - (-4)) / 8);
    }
    var customMesh = new BABYLON.Mesh("custom", scene);
    var vertexData = new BABYLON.VertexData();

    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;
    vertexData.uvs = uvs;

    vertexData.applyToMesh(customMesh);

    customMesh.convertToFlatShadedMesh();
    /* var mat = new BABYLON.StandardMaterial("", scene);
     mat.diffuseTexture = new BABYLON.Texture("wood.jpg")
     */





    // Calculs Magiques recentrage
    var meshMin = customMesh.getBoundingInfo().boundingBox.minimum;
    var meshMax = customMesh.getBoundingInfo().boundingBox.maximum;

    var LX = (meshMax.x - meshMin.x);
    var LY = (meshMax.y - meshMin.y);
    var LZ = (meshMax.z - meshMin.z);



    customMesh.position.x = - meshMin.x;// + (10 - (meshMax.x - meshMin.x)) * 0.5;
    customMesh.position.y = - meshMin.y;
    customMesh.position.z = - meshMin.z;// + (10 - (meshMax.z - meshMin.z)) * 0.5;

    var cameraTarget = new BABYLON.Vector3(
        LX * 0.5,
        LY * 0.5,
        LZ * 0.5);

    var maxBoundingLengh = Math.max(
        LX,
        LY,
        LZ);

    // MATERIAL

    var myMaterial = new BABYLON.StandardMaterial("mat", scene);

    /*
    myMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.5, 0.2);
    myMaterial.specularColor = new BABYLON.Color3(0.8, 0.9, 0.5);
    myMaterial.emissiveColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    myMaterial.ambientColor = new BABYLON.Color3(0.4, 0.3, 0.2);
    */


    var SetMaterial = function (materialTable, er, eg, eb, shininess, transparency) {

        myMaterial.ambientColor = new BABYLON.Color3(materialTable[0], materialTable[1], materialTable[2]);
        myMaterial.diffuseColor = new BABYLON.Color3(materialTable[3], materialTable[4], materialTable[5]);
        myMaterial.specularColor = new BABYLON.Color3(materialTable[6], materialTable[7], materialTable[8]);
        myMaterial.emissiveColor = new BABYLON.Color3(er, eg, eb);
        //myMaterial.alpha = 0.8;
    }

    SetMaterial(MaterialsTable.plaster, 0.2, 0.1, 0.05, 0, 0);

    $('#material-select').on('change',
        function () {
            var mat = this.value;
            if (mat == 'stone') {
                customMesh.material = stoneMaterial;
            }
            else if (mat == 'grid') {
                customMesh.material = gridSolidMaterial;
            }
            else if (mat == 'brick') {
                customMesh.material = brickMaterial;
            }
            else if (mat == 'wood') {
                customMesh.material = woodMaterial;
            }
            else if (mat == 'marble') {
                customMesh.material = marbleMaterial;
            }
            else if (mat == 'road') {
                customMesh.material = roadMaterial;
            }
            else if (mat == 'grass') {
                customMesh.material = grassMaterial;
            }
            else if (mat == 'fire') {
                customMesh.material = fireMaterial;
            }
           
            else {
                customMesh.material = myMaterial;
                switch (mat) {

                    case 'emerald': SetMaterial(MaterialsTable.emerald, 0, 0, 0, 0, 0); break;
                    case 'jade': SetMaterial(MaterialsTable.jade, 0, 0, 0, 0, 0); break;
                    case 'obsidian': SetMaterial(MaterialsTable.obsidian, 0, 0, 0, 0, 0); break;
                    case 'pearl': SetMaterial(MaterialsTable.pearl, 0, 0, 0, 0, 0); break;
                    case 'ruby': SetMaterial(MaterialsTable.ruby, 0, 0, 0, 0, 0); break;
                    case 'turquoise': SetMaterial(MaterialsTable.turquoise, 0, 0, 0, 0, 0); break;
                    case 'brass': SetMaterial(MaterialsTable.brass, 0, 0, 0, 0, 0); break;
                    case 'bronze': SetMaterial(MaterialsTable.bronze, 0, 0, 0, 0, 0); break;
                    case 'polished_bronze': SetMaterial(MaterialsTable.polished_bronze, 0, 0, 0, 0, 0); break;

                    case 'chrome': SetMaterial(MaterialsTable.chrome, 0, 0, 0, 0, 0); break;
                    case 'copper': SetMaterial(MaterialsTable.copper, 0, 0, 0, 0, 0); break;
                    case 'polished_copper': SetMaterial(MaterialsTable.polished_copper, 0, 0, 0, 0, 0); break;
                    case 'gold': SetMaterial(MaterialsTable.gold, 0, 0, 0, 0, 0); break;
                    case 'polished_gold': SetMaterial(MaterialsTable.polished_gold, 0, 0, 0, 0, 0); break;
                    case 'pewter': SetMaterial(MaterialsTable.pewter, 0, 0, 0, 0, 0); break;
                    case 'silver': SetMaterial(MaterialsTable.silver, 0, 0, 0, 0, 0); break;
                    case 'polished_silver': SetMaterial(MaterialsTable.polished_silver, 0, 0, 0, 0, 0); break;

                    case 'plaster': SetMaterial(MaterialsTable.plaster, 0, 0, 0, 0, 0); break;
                    case 'inca_stone': SetMaterial(MaterialsTable.inca_stone, 0.2, 0.1, 0.05, 0, 0); break;
                    case 'white_marble': SetMaterial(MaterialsTable.white_marble, 0, 0, 0, 0, 0); break;
                    case 'rose_marble': SetMaterial(MaterialsTable.rose_marble, 0, 0, 0, 0, 0); break;

                    case 'black_plastic': SetMaterial(MaterialsTable.black_plastic, 0, 0, 0, 0, 0); break;
                    case 'cyan_plastic': SetMaterial(MaterialsTable.cyan_plastic, 0, 0, 0, 0, 0); break;
                    case 'green_plastic': SetMaterial(MaterialsTable.green_plastic, 0, 0, 0, 0, 0); break;
                    case 'red_plastic': SetMaterial(MaterialsTable.red_plastic, 0, 0, 0, 0, 0); break;
                    case 'white_plastic': SetMaterial(MaterialsTable.white_plastic, 0, 0, 0, 0, 0); break;
                    case 'yellow_plastic': SetMaterial(MaterialsTable.yellow_plastic, 0, 0, 0, 0, 0); break;
                    case 'black_rubber': SetMaterial(MaterialsTable.black_rubber, 0, 0, 0, 0, 0); break;
                    case 'cyan_rubber': SetMaterial(MaterialsTable.cyan_rubber, 0, 0, 0, 0, 0); break;
                    case 'green_rubber': SetMaterial(MaterialsTable.green_rubber, 0, 0, 0, 0, 0); break;
                    case 'red_rubber': SetMaterial(MaterialsTable.red_rubber, 0, 0, 0, 0, 0); break;
                    case 'white_rubber': SetMaterial(MaterialsTable.white_rubber, 0, 0, 0, 0, 0); break;
                    case 'yellow_rubber': SetMaterial(MaterialsTable.yellow_rubber, 0, 0, 0, 0, 0); break;

                    case 'black_mat': SetMaterial(MaterialsTable.black_mat, 0, 0, 0, 0, 0); break;
                    case 'cyan_mat': SetMaterial(MaterialsTable.cyan_mat, 0, 0, 0, 0, 0); break;
                    case 'green_mat': SetMaterial(MaterialsTable.green_mat, 0, 0, 0, 0, 0); break;
                    case 'red_mat': SetMaterial(MaterialsTable.red_mat, 0, 0, 0, 0, 0); break;
                    case 'white_mat': SetMaterial(MaterialsTable.white_mat, 0, 0, 0, 0, 0); break;
                    case 'yellow_mat': SetMaterial(MaterialsTable.yellow_mat, 0, 0, 0, 0, 0); break;

                    default: SetMaterial(MaterialsTable.emerald, 0, 0, 0, 0, 0);
                }
            }

        }
    );


    // STONE MATERIAL
    var brickWallDiffURL = "images/a1.png";
    var brickWallNHURL = "images/a2.png";
    var stoneDiffURL = "images/pebble.jpg";
    var stoneNHURL = "images/a3.png";

    var stoneDiffuseTexture = new BABYLON.Texture(stoneDiffURL, scene);

    var stoneNormalsHeightTexture = new BABYLON.Texture(stoneNHURL, scene);

    var wallDiffuseTexture = new BABYLON.Texture(brickWallDiffURL, scene);

    var wallNormalsHeightTexture = new BABYLON.Texture(brickWallNHURL, scene);

    var normalsHeightTexture = stoneNormalsHeightTexture;

    var stoneMaterial = new BABYLON.StandardMaterial("mtl01", scene);
    stoneMaterial.diffuseTexture = wallDiffuseTexture;
    stoneMaterial.bumpTexture = wallNormalsHeightTexture;

    stoneMaterial.useParallax = true;
    stoneMaterial.useParallaxOcclusion = true;
    stoneMaterial.parallaxScaleBias = 0.1;
    stoneMaterial.specularPower = 1000.0;
    stoneMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
   

    // GRID MATERIAL

    var gridSolidMaterial = new BABYLON.GridMaterial("gridSolidMaterial", scene);
    gridSolidMaterial.majorUnitFrequency = 5;
    gridSolidMaterial.gridRatio = 0.1;
    gridSolidMaterial.minorUnitVisibility = 0.8;
    gridSolidMaterial.mainColor = new BABYLON.Color3(0.8, 0.8, 0.9);
    gridSolidMaterial.lineColor = new BABYLON.Color3(0, 0, 0.1);
    gridSolidMaterial.useMaxLine = true;

    gridSolidMaterial.ambientColor = new BABYLON.Color3(1, 1, 1);
    gridSolidMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    gridSolidMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    gridSolidMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);


    // WOOD MATERIAL

    var woodMaterial = new BABYLON.StandardMaterial("woodMat", scene);
    var woodTexture = new BABYLON.WoodProceduralTexture("woodTex", 1024, scene);
    //woodTexture.woodColor = new BABYLON.Color3(0.3, 0.2, 0.05);
    woodTexture.ampScale = 80.0;

    woodMaterial.diffuseTexture = woodTexture;


    var grassMaterial = new BABYLON.StandardMaterial("grassMat", scene);
    var grassTexture = new BABYLON.GrassProceduralTexture("grassTex", 256, scene);
    grassMaterial.ambientTexture = grassTexture;

    /* grassMaterial.ambientColor = new BABYLON.Color3(1, 1, 1);
     grassMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
     grassMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
     grassMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
     */

    // MARBLE MATERIAL
    var marbleMaterial = new BABYLON.StandardMaterial("torus", scene);
    var marbleTexture = new BABYLON.MarbleProceduralTexture("marble", 512, scene);
    marbleTexture.numberOfTilesHeight = 2;
    marbleTexture.numberOfTilesWidth = 1;

    marbleTexture.jointColor = new BABYLON.Color3(0.9, 0.6, 0.6);
    marbleTexture.marbleColor = new BABYLON.Color3(0.9, 0.6, 0.6);
    marbleMaterial.ambientTexture = marbleTexture;

    // BRICK MATERIAL
    var brickMaterial = new BABYLON.StandardMaterial("brickMat", scene);
    var brickTexture = new BABYLON.BrickProceduralTexture("brickTex", 512, scene);
    brickTexture.numberOfBricksHeight = 1;
    brickTexture.numberOfBricksWidth = 1;
    brickMaterial.diffuseTexture = brickTexture;

    // ROAD MATERIAL
    var roadMaterial = new BABYLON.StandardMaterial("roadMat", scene);
    var roadmaterialpt = new BABYLON.RoadProceduralTexture("roadTex", 512, scene);
    roadMaterial.diffuseTexture = roadmaterialpt;

    // GRASS MATERIAL
    var grassMaterial = new BABYLON.StandardMaterial("grassMat", scene);
    var grassTexture = new BABYLON.GrassProceduralTexture("grassTex", 256, scene);
    grassMaterial.ambientTexture = grassTexture;

    // FIRE MATERIAL
    var fireMaterial = new BABYLON.StandardMaterial("fireMat", scene);
    var fireTexture = new BABYLON.FireProceduralTexture("fireTex", 256, scene);
    fireMaterial.diffuseTexture = fireTexture;
    fireMaterial.opacityTexture = fireTexture;

    // CLOUD MATERIAL 
    var cloudMaterial = new BABYLON.StandardMaterial("cloudMat", scene);

    var cloudProcTexture = new BABYLON.CloudProceduralTexture("cloudTex", 1024, scene);
    // cloudProcTexture.skyColor = new BABYLON.Color3(0., 0., 0.7);
    // cloudProcTexture.cloudColor = new BABYLON.Color3(0.8, 0.75, 0.7);

    cloudMaterial.emissiveTexture = cloudProcTexture;
    cloudMaterial.backFaceCulling = false;



    cloudMaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    

    /* var script = document.createElement('script');
     script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
     document.getElementsByTagName('head')[0].appendChild(script);
     */

    var axesViewer = new BABYLON.AxesViewer(scene, 0.1 * maxBoundingLengh);
    axesViewer.dispose();;
    $('#cbShowAxis').on('change', function () {
        if (!this.checked) axesViewer.dispose();
        else axesViewer = new BABYLON.AxesViewer(scene, 0.1 * maxBoundingLengh);
    });


    customMesh.showBoundingBox = false;
    $('#cbBoundingBox').on('change', function () {
        customMesh.showBoundingBox = this.checked;
    });

    customMesh.material = myMaterial;

    myMaterial.backFaceCulling = true;
    $('#backFaceCulling').on('change', function () {
        myMaterial.backFaceCulling = this.checked;
    });

    myMaterial.wireframe = false;
    $('#wireframe').on('change', function () {
        myMaterial.wireframe = this.checked;
    });



    // EDGES

    customMesh.edgesColor.copyFromFloats(0, 0, 1, 1);
    customMesh.edgesWidth = maxBoundingLengh * 0.05;
    $('#cbEdges').on('change', function () {
        if (this.checked) customMesh.enableEdgesRendering(1);
        else customMesh.disableEdgesRendering();

    });


    // NORMALS
    var normalLines;
    $('#cbShowNormals').on('change', function () {
        if (!this.checked) normalLines.dispose();
        else normalLines = showNormals(customMesh, 0.010 * maxBoundingLengh, new BABYLON.Color3(1, 0, 0));
    });


    // CAMERA Target
    var camera = new BABYLON.ArcRotateCamera("camera1",
        0, 0,
        maxBoundingLengh * 2.5,
        new BABYLON.Vector3(0, 1, -1),
        scene);

    camera.attachControl(canvas, true);
    camera.setTarget(cameraTarget);

    // CAMERA LIMITATIONS
    camera.radius = maxBoundingLengh;
    var camerasBorderFunction = function () {
        //Angle
        // if (camera.beta < 0.1) camera.beta = 0.1;
        // else if (camera.beta > (Math.PI / 2) * 0.9) camera.beta = (Math.PI / 2) * 0.9;

        //Zoom
        if (camera.radius > maxBoundingLengh * 2.5) camera.radius = maxBoundingLengh * 2.5;
        if (camera.radius < maxBoundingLengh * 0.5) camera.radius = maxBoundingLengh * 0.5;
    };

    scene.registerBeforeRender(camerasBorderFunction);


    // LIGHTS

    //   var lightAmbiant =
    //   showAmbiantLight(0.4, scene);
    //  showRGBPointLight(0.2,scene);
    var defineLightCamera = function () {
        var lightCamera = new BABYLON.PointLight("lightCamera", new BABYLON.Vector3(0, 0, 0), scene);


        lightCamera.diffuse = new BABYLON.Color3(1, 1, 1);
        lightCamera.specular = new BABYLON.Color3(1, 1, 1);
        lightCamera.parent = camera;


        lightCamera.intensity = 0.5;
        $('#RCameraLight').on('input', function () {
            lightCamera.intensity = 0.01 * this.value;
        });
    }

    defineLightCamera();

    // SHOW GROUND ON/OFF


    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1000, height: 1000, subdivisions: 10 }, scene, false);

    var gridGroundMaterial = new BABYLON.GridMaterial("gridGroundMaterial", scene);
    gridGroundMaterial.majorUnitFrequency = 10;
    gridGroundMaterial.minorUnitVisibility = 0.7;
    gridGroundMaterial.lineColor = new BABYLON.Color3(0.9, 0.9, 1);
    gridGroundMaterial.gridRatio = 1;
    gridGroundMaterial.opacity = 0.99;
    gridGroundMaterial.useMaxLine = true;

    ground.material = gridGroundMaterial;
    ground.setEnabled(true);
    $('#cbShowGridGround').on('change', function () {
        ground.setEnabled(this.checked);
    });

    /*//skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);

    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;

    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/cubetexture/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;*/

    // SHOW CLOUDS ON/OFF
    const clouds = BABYLON.MeshBuilder.CreateCylinder("mycylinder", { height: 1000, diameterTop: 1000, diameterBottom: 1000, tessellation: 12, subdivisions: 1 }, scene);
    // var clouds = BABYLON.MeshBuilder.CreateSphere("cloud", { segments: 100, diameter: 1000 }, scene);
    clouds.material = cloudMaterial;
    clouds.position = new BABYLON.Vector3(0, 0, 12);

    clouds.setEnabled(false);
    $('#cbShowCloud').on('change', function () {
        clouds.setEnabled(this.checked);
    });

    // CLEAR COLOR
    scene.clearColor = BABYLON.Color3.FromHexString(clearColor);
    $('#renderCanvas').css('background-color', clearColor);

    $('#CClearColor').on('input', function () {
        var chex = this.value;
        scene.clearColor = new BABYLON.Color3.FromHexString(chex);
        $('#renderCanvas').css('background-color', chex);
    });

    // AMBIANT COLOR
    scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    $('#RAmbiantColor').on('input', function () {
        var x = 0.01 * this.value;
        scene.ambientColor = new BABYLON.Color3(x, x, x);

    });

    // BEFORE RENDER
    scene.registerBeforeRender(function () {
        // lightCamera.position = camera.position;
        // lightCamera.position = camera.position;
    });

    scene.getEngine().onResizeObservable.add(() => {

        if (scene.getEngine().getRenderHeight() > scene.getEngine().getRenderWidth()) {
            camera.fovMode = BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED;
        }
        else {
            camera.fovMode = BABYLON.Camera.FOVMODE_VERTICAL_FIXED;
        }
    })

    return scene;

};


/*
var createSceneCUBE = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 100, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, false);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var mesh = BABYLON.Mesh.CreateBox("box01", 25, scene);
    mesh.position = new BABYLON.Vector3(0, 0, 0);

    var brickWallDiffURL = "images/a1.png";
    var brickWallNHURL = "images/a2.png";
    var stoneDiffURL = "images/pebble.jpg";
    var stoneNHURL = "images/a3.png";

    var stoneDiffuseTexture = new BABYLON.Texture(stoneDiffURL, scene);

    var stoneNormalsHeightTexture = new BABYLON.Texture(stoneNHURL, scene);

    var wallDiffuseTexture = new BABYLON.Texture(brickWallDiffURL, scene);

    var wallNormalsHeightTexture = new BABYLON.Texture(brickWallNHURL, scene);

    var normalsHeightTexture = stoneNormalsHeightTexture;

    var material = new BABYLON.StandardMaterial("mtl01", scene);
    material.diffuseTexture = stoneDiffuseTexture;
    material.bumpTexture = stoneNormalsHeightTexture;

    material.useParallax = true;
    material.useParallaxOcclusion = true;
    material.parallaxScaleBias = 0.1;
    material.specularPower = 1000.0;
    material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    mesh.material = material;
    return scene;
};
var scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});

*/



/*
const createSceneGRIDMAGICSTL = () => {


    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    var camera = new BABYLON.ArcRotateCamera("camera1",
        0, 0,
        10,
        new BABYLON.Vector3(0, 5, -10),
        scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.4;

    var light2 = new BABYLON.PointLight("light", new BABYLON.Vector3(-3, 4, -4), scene);

    light2.intensity = 1;

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    sphere.position.x = -1;

    var cube = BABYLON.MeshBuilder.CreateBox("box", { size: 1.5 }, scene);

    cube.position.y = 1;
    cube.position.x = 1.5;
    cube.position.z = -1.5;

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    BABYLON.NodeMaterial.ParseFromSnippetAsync("#I4DJ9Z", scene).then(nodeMaterial => {
        sphere.material = nodeMaterial;
        ground.material = nodeMaterial;
        cube.material = nodeMaterial.clone("node2");

        cube.material.getBlockByName("Diffuse color").value = new BABYLON.Color3(1, 146 / 255, 18 / 255);
        cube.material.getBlockByName("Line color").value = new BABYLON.Color3(0, 0, 1);
        cube.material.getBlockByName("Major unit frequency").value = 4;
        cube.material.getBlockByName("Grid ratio").value = 0.25;
        cube.material.getBlockByName("Minor unit visibility").value = 0.65;

        scene.debugLayer.show({ showExplorer: true, embedMode: true }).then(() => {
            scene.debugLayer.select(sphere.material, "INPUTS");
        });
    });


    return scene;


};
*/





window.initFunction = async function () {


    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createSceneSTL();



};

initFunction().then(() => {
    sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {

    // 

    // canvas.style.width = window.innerWidth * 0.5;
    //  canvas.style.height = canvas.style.width;

    engine.resize();

});
//canvas = document.addEventListener("resize", function () { engine.resize(); });
