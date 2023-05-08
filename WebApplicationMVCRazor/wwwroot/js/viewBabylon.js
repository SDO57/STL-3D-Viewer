//@ts-check

changeMeshOrientationYZ();
//resizeMesh();

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var __urlbase;







BABYLON.VertexData.ComputeNormals(positions, indices, normals);



var Color3Red = new BABYLON.Color3(1, 0, 0);
var Color3Green = new BABYLON.Color3(0, 1, 0);
var Color3Blue = new BABYLON.Color3(0, 0, 1);

var ColorWhite = new BABYLON.Color3(1, 1, 1);


var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var lavamaterial;

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
var lightAmbiant;

var showAmbiantLight = function (scene) {

    lightAmbiant = new BABYLON.HemisphericLight("lightAmbiant", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
 //   lightAmbiant.intensity = intensity;
    lightAmbiant.diffuse = new BABYLON.Color3(1, 1, 1);
    lightAmbiant.specular = new BABYLON.Color3(1, 1, 1);

   

    return lightAmbiant;
}


var AmbiantLightFollowCamera = function(camera)
{
    lightAmbiant.direction = camera.cameraDirection;
}


var lightCamera;

var defineLightCamera = function (scene , camera) {
    lightCamera = new BABYLON.PointLight("lightCamera", new BABYLON.Vector3(0, 0, 0), scene);

    lightCamera.ambiant = new BABYLON.Color3(1, 1, 1);
    lightCamera.diffuse = new BABYLON.Color3(1, 1, 1);
    lightCamera.specular = new BABYLON.Color3(1, 1, 1);
    lightCamera.parent = camera;


      /*  lightCamera.intensity = 0.5;
        $('#RCameraLight').on('input', function () {
            lightCamera.intensity = 0.01 * this.value;
        });*/
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











const createBoundingSphere = function (scene, LX, LY, LZ) {
   
    var boundinSphereMat = new BABYLON.StandardMaterial("boundingSphereMat", scene);
    boundinSphereMat.diffuseColor = new BABYLON.Color3(1, 0.04, 0.04);
    boundinSphereMat.ambiantColor = new BABYLON.Color3(1, 0.9, 0.9);
    boundinSphereMat.specularColor = new BABYLON.Color3(0.9, 1, 0.6);

    boundinSphereMat.alpha = 0.7;
 
    boundingSphereRadius = outsideBoundingRadius;

    var boundingSphereRed = BABYLON.MeshBuilder.CreateSphere("boudingSphereRed",
        { diameter: boundingSphereRadius * 2 }, scene);
    boundingSphereRed.material = boundinSphereMat;

    boundingSphereRed.position.x = LX * 0.5;
    boundingSphereRed.position.y = LY * 0.5;
    boundingSphereRed.position.z = LZ * 0.5;

    boundingSphereRed.setEnabled(false);
    $('#cbBoundingSphere').on('change', function () {
        boundingSphereRed.setEnabled(this.checked);
    });

}

const createOcean = function (scene, LX, LY, LZ) {
    // OCEAN
    let oceanMat = new BABYLON.StandardMaterial("materMat", scene);
    oceanMat.diffuseColor = new BABYLON.Color3(0.04, 0.04, 1);
    oceanMat.ambiantColor = new BABYLON.Color3(0.9, 0.9, 1);
    oceanMat.specularColor = new BABYLON.Color3(0.9, 1, 0.6);
    // oceanMat.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1);
    oceanMat.alpha = 0.5;

    let CurrentROceanRadius = outsideBoundingRadius + (outsideBoundingRadius - insideBoundingRadius) * 0.1;
    let oceanSphere = BABYLON.MeshBuilder.CreateSphere("waterSphere",
        { diameterX: CurrentROceanRadius * 2, diameterY: CurrentROceanRadius * 2, diameterZ: CurrentROceanRadius * 2 }, scene);
    oceanSphere.material = oceanMat;

    oceanSphere.position.x = LX * 0.5;
    oceanSphere.position.y = LY * 0.5;
    oceanSphere.position.z = LZ * 0.5;

    oceanSphere.setEnabled(false);
    $('#cbOcean').on('change', function () {
        oceanSphere.setEnabled(this.checked);
    });

    let amplitudeR = (outsideBoundingRadius - insideBoundingRadius)  / outsideBoundingRadius;
    let scale = 1 - amplitudeR + amplitudeR * 0.5;
    oceanSphere.scaling = new BABYLON.Vector3(scale, scale, scale);

    $('#ROcean').on('input', function () {
        let pourcentage = 0.01 * this.value;
        let amplitudeR = (outsideBoundingRadius - insideBoundingRadius) / outsideBoundingRadius;
        let scale = 1 - amplitudeR + amplitudeR * pourcentage;
        oceanSphere.scaling = new BABYLON.Vector3(scale, scale, scale);

    });

    $('#ROceanOpacity').on('input', function () {
        oceanMat.alpha = 0.01 * this.value;
    });
    

}


//var gl;

var alphaLavaAnimation = 0;
var lavaAnimation = function () { };
const lavaInitMaterial = function (lavamaterial) {



    lavamaterial.alpha = 0.5;


    //var urlimage = __urlbase + "/images/texture/lava/";

    // Lava Material creation  
    //var assetPath = "https://raw.githubusercontent.com/eldinor/ForBJS/master/Lava_005_SD/";
    var assetPath = __urlbase + "/images/texture/lava/";

    //var lavamaterial = new BABYLON.PBRMaterial("lavamaterial", scene);
    lavamaterial.albedoTexture = new BABYLON.Texture(assetPath + "Lava_005_COLOR.jpg", scene);

    lavamaterial.bumpTexture = new BABYLON.Texture(assetPath + "Lava_005_NORM.jpg", scene);
    lavamaterial.bumpTexture.level = 0.9;
    lavamaterial.bumpTexture.uScale = 20;
    lavamaterial.bumpTexture.vScale = 20;



    lavamaterial.emissiveTexture = new BABYLON.Texture(assetPath + "Lava_005_ROUGH.jpg"/*"spider_webs_compressed.jpg"*/, scene);
    lavamaterial.emissiveColor = new BABYLON.Color3(64 / 255, 32 / 255, 16 / 255);
    //    material.specularTexture = new BABYLON.Texture("Lava_005_DISP.jpg", scene);
    lavamaterial.ambientTexture = new BABYLON.Texture(assetPath + "Lava_005_OCC.jpg", scene);
    lavamaterial.ambientColor = new BABYLON.Color3(245 / 255, 245 / 255, 20 / 255);


    //lavamaterial.metallicTexture = new BABYLON.Texture(assetPath + "Lava_005_ROUGH.jpg", scene);

    lavamaterial.roughness = 0.5;
    lavamaterial.metallic = 0.1;

    lavamaterial.useRoughnessFromMetallicTextureAlpha = true;
    lavamaterial.useRoughnessFromMetallicTextureGreen = false;
    lavamaterial.useMetallnessFromMetallicTextureBlue = false;
//BUMPMAPPING
    lavamaterial.clearCoat.isEnabled = true;
    lavamaterial.clearCoat.bumpTexture = new BABYLON.Texture(assetPath + "Lava_005_NORM.jpg", scene);
    lavamaterial.clearCoat.bumpTexture.level = 0.0;

    lavaAnimation = function () {
        lavamaterial.albedoTexture.uOffset -= 0.0001;
        lavamaterial.albedoTexture.vOffset -= 0.0001;
        //lavamaterial.bumpTexture.uOffset += 0.0001;
        //lavamaterial.bumpTexture.vOffset -= 0.001;
        lavamaterial.ambientTexture.uOffset += 0.0001;
        lavamaterial.ambientTexture.vOffset -= 0.0001;

        //lavamaterial.metallicTexture.uOffset += 0.0001;

        lavamaterial.emissiveTexture.uOffset -= 0.00017;
        lavamaterial.emissiveTexture.vOffset -= 0.00023;

      /*  gl.intensity += Math.sin(alphaLavaAnimation * 20) / 200;
        alphaLavaAnimation += 0.0002;


        lavamaterial.clearCoat.bumpTexture.level += Math.sin(alphaLavaAnimation) / 10;
        */
    }

}





const createLava = function (scene, lavamaterial, LX, LY, LZ) {
 

    lavaInitMaterial(lavamaterial);


    //lavaMaterial.unlit = true;
    let CurrentRLavaRadius = outsideBoundingRadius + (outsideBoundingRadius - insideBoundingRadius) * 0.1;
    let lavaSphere = BABYLON.MeshBuilder.CreateSphere("lavaSphere",
        { diameterX: CurrentRLavaRadius * 2, diameterY: CurrentRLavaRadius * 2, diameterZ: CurrentRLavaRadius * 2 }, scene);
    lavaSphere.material = lavamaterial;

    lavaSphere.position.x = LX * 0.5;
    lavaSphere.position.y = LY * 0.5;
    lavaSphere.position.z = LZ * 0.5;

    lavaSphere.setEnabled(false);
    $('#cbLava').on('change', function () {
        lavaSphere.setEnabled(this.checked);
    });

    let amplitudeR = (outsideBoundingRadius - insideBoundingRadius) / outsideBoundingRadius;
    let scale = 1 - amplitudeR + amplitudeR * 0.5;
    lavaSphere.scaling = new BABYLON.Vector3(scale, scale, scale);

    $('#RLava').on('input', function () {
        let pourcentage = 0.01 * this.value;
        let amplitudeR = (outsideBoundingRadius - insideBoundingRadius) / outsideBoundingRadius;
        let scale = 1 - amplitudeR + amplitudeR * pourcentage;
        lavaSphere.scaling = new BABYLON.Vector3(scale, scale, scale);

    });

    $('#RLavaOpacity').on('input', function () {
        lavamaterial.alpha = 0.01 * this.value;
    });

    //gl = new BABYLON.GlowLayer("glow", scene);
    //gl.intensity = 0.1;

}


//var alphaCloudsAnimation = 0;
var cloudsAnimation = function () { };
const cloudsInitMaterial = function (cloudsmaterial) {



    cloudsmaterial.alpha = 0.5;


    //var urlimage = __urlbase + "/images/texture/lava/";

    // Lava Material creation  
    //var assetPath = "https://raw.githubusercontent.com/eldinor/ForBJS/master/Lava_005_SD/";
    var assetPath = __urlbase + "/images/texture/clouds/";

    //var lavamaterial = new BABYLON.PBRMaterial("lavamaterial", scene);
    cloudsmaterial.albedoTexture = new BABYLON.Texture(assetPath + "images (1).jpg", scene);

    cloudsmaterial.bumpTexture = new BABYLON.Texture(assetPath + "images (1).jpg", scene);
    cloudsmaterial.bumpTexture.level = 0.9;
    cloudsmaterial.bumpTexture.uScale = 20;
    cloudsmaterial.bumpTexture.vScale = 20;


    cloudsmaterial.diffuseTexture = new BABYLON.Texture(assetPath + "images (1).jpg", scene);
    cloudsmaterial.diffuseTexture.hasAlpha = true;
    cloudsmaterial.useAlphaFromDiffuseTexture = true;
    cloudsmaterial.useSpecularOverAlpha = true;
    cloudsmaterial.alphaCutOff = 0.4;


    cloudsmaterial.emissiveTexture = new BABYLON.Texture(assetPath + "Texturelabs_Atmosphere_131thumbnail.jpg"/*"spider_webs_compressed.jpg"*/, scene);
    cloudsmaterial.emissiveColor = new BABYLON.Color3(64 / 255, 64 / 255, 64 / 255);
    //    material.specularTexture = new BABYLON.Texture("Lava_005_DISP.jpg", scene);
    cloudsmaterial.ambientTexture = new BABYLON.Texture(assetPath + "fx_cloudalpha05.jpg", scene);
    cloudsmaterial.ambientColor = new BABYLON.Color3(128 / 255, 128 / 255, 255 / 255);


    //lavamaterial.metallicTexture = new BABYLON.Texture(assetPath + "Lava_005_ROUGH.jpg", scene);

    cloudsmaterial.roughness = 0.5;
    cloudsmaterial.metallic = 0.1;

    cloudsmaterial.useRoughnessFromMetallicTextureAlpha = true;
    cloudsmaterial.useRoughnessFromMetallicTextureGreen = false;
    cloudsmaterial.useMetallnessFromMetallicTextureBlue = false;
    //BUMPMAPPING
   /* cloudsmaterial.clearCoat.isEnabled = true;
    cloudsmaterial.clearCoat.bumpTexture = new BABYLON.Texture(assetPath + "Texturelabs_Atmosphere_195thumbnail.jpg", scene);
    cloudsmaterial.clearCoat.bumpTexture.level = 0.0;*/

    cloudsAnimation = function () {
        cloudsmaterial.albedoTexture.uOffset += 0.0001;
        cloudsmaterial.albedoTexture.vOffset += 0.0001;
        //lavamaterial.bumpTexture.uOffset += 0.0001;
        //lavamaterial.bumpTexture.vOffset -= 0.001;
        cloudsmaterial.ambientTexture.uOffset -= 0.0001;
        cloudsmaterial.ambientTexture.vOffset += 0.0001;

        cloudsmaterial.diffuseTexture.uOffset -= 0.0001;
        cloudsmaterial.diffuseTexture.vOffset += 0.0001;
        //lavamaterial.metallicTexture.uOffset += 0.0001;

        cloudsmaterial.emissiveTexture.uOffset += 0.00017;
        cloudsmaterial.emissiveTexture.vOffset += 0.00023;

       /* //gl.intensity += Math.sin(alphaCloudsAnimation * 20) / 200;
        alphaCloudsAnimation += 0.0002;


        cloudsmaterial.clearCoat.bumpTexture.level += Math.sin(alphaCloudsAnimation) / 10;*/

    }

}





const createClouds = function (scene, cloudsmaterial, LX, LY, LZ) {


    cloudsInitMaterial(cloudsmaterial);


    //lavaMaterial.unlit = true;
    let CurrentRCloudsLavaRadius = outsideBoundingRadius + (outsideBoundingRadius - insideBoundingRadius) * 0.1;
    let cloudsSphere = BABYLON.MeshBuilder.CreateSphere("cloudsSphere",
        { diameterX: CurrentRCloudsLavaRadius * 2, diameterY: CurrentRCloudsLavaRadius * 2, diameterZ: CurrentRCloudsLavaRadius * 2 }, scene);
    cloudsSphere.material = cloudsmaterial;

    cloudsSphere.position.x = LX * 0.5;
    cloudsSphere.position.y = LY * 0.5;
    cloudsSphere.position.z = LZ * 0.5;

    cloudsSphere.setEnabled(false);
    $('#cbClouds').on('change', function () {
        cloudsSphere.setEnabled(this.checked);
    });

    let amplitudeR = (outsideBoundingRadius - insideBoundingRadius) / outsideBoundingRadius;
    let scale = 1 - amplitudeR + amplitudeR * 0.5;
    cloudsSphere.scaling = new BABYLON.Vector3(scale, scale, scale);

    $('#RClouds').on('input', function () {
        let pourcentage = 0.01 * this.value;
        let amplitudeR = (outsideBoundingRadius - insideBoundingRadius) / outsideBoundingRadius;
        let scale = 1 - amplitudeR + amplitudeR * pourcentage;
        cloudsSphere.scaling = new BABYLON.Vector3(scale, scale, scale);

    });

    $('#RCloudsOpacity').on('input', function () {
        cloudsmaterial.alpha = 0.01 * this.value;
    });

   
    //gl.intensity = 0.1;

}




const createAtmosphere = function (scene, LX, LY, LZ) {
    // ATMOSPHERE
    var atmosphericMat = new BABYLON.StandardMaterial("airMat", scene);
    /*atmosphericMat.diffuseColor = new BABYLON.Color3(0, 0.8, 1);
    atmosphericMat.ambiantColor = new BABYLON.Color3(1, 1, 1);*/
    atmosphericMat.specularColor = new BABYLON.Color3(0, 0, 0);
    atmosphericMat.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    atmosphericMat.alpha = 0.5;

    var CurrentRAtmosphereRadius = outsideBoundingRadius + (outsideBoundingRadius - insideBoundingRadius) * 0.1;

    var athmosphericSphere = BABYLON.MeshBuilder.CreateSphere("airSphere",
        { diameterX: CurrentRAtmosphereRadius * 2, diameterY: CurrentRAtmosphereRadius * 2, diameterZ: CurrentRAtmosphereRadius * 2 }, scene);

    athmosphericSphere.material = atmosphericMat;

    athmosphericSphere.position.x = LX * 0.5;
    athmosphericSphere.position.y = LY * 0.5;
    athmosphericSphere.position.z = LZ * 0.5;

    athmosphericSphere.setEnabled(false);
    $('#cbAtmospheric').on('change', function () {
        athmosphericSphere.setEnabled(this.checked);
    });

    $('#RAtmosphere').on('input', function () {
        var pourcentage = 0.01 * this.value;
        var amplitudeR = (outsideBoundingRadius - insideBoundingRadius)  / outsideBoundingRadius;
        var scale = 1 - amplitudeR + amplitudeR * pourcentage;
        athmosphericSphere.scaling = new BABYLON.Vector3(scale, scale, scale);

    });

    $('#RAtmosphereOpacity').on('input', function () {
        atmosphericMat.alpha = 0.01 * this.value;
    });
}

/*
var createScene = function () {
    // Create scene
    var scene = new BABYLON.Scene(engine);

    // Create simple sphere
    var sphere = BABYLON.Mesh.CreateIcoSphere("sphere", { radius: 0.2, flat: true, subdivisions: 1 }, scene);
    sphere.position.y = 3;
    sphere.material = new BABYLON.StandardMaterial("sphere material", scene)

    // Lights and camera
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -0.5, 1.0), scene);
    light.position = new BABYLON.Vector3(0, 5, -2);
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 3, 0), scene);
    camera.attachControl(canvas, true);
    scene.activeCamera.beta += 0.8;

    // Default Environment
    var environment = scene.createDefaultEnvironment({ enableGroundShadow: true, groundYBias: 2.8 });
    environment.setMainColor(BABYLON.Color3.FromHexString("#74b9ff"))

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;
    shadowGenerator.addShadowCaster(sphere, true);

    // Enable VR
    var vrHelper = scene.createDefaultVRExperience({ createDeviceOrientationCamera: false, useXR: true });
    vrHelper.enableTeleportation({ floorMeshes: [environment.ground] });

    // Runs every frame to rotate the sphere
    scene.onBeforeRenderObservable.add(() => {
        sphere.rotation.y += 0.0001 * scene.getEngine().getDeltaTime();
        sphere.rotation.x += 0.0001 * scene.getEngine().getDeltaTime();
    })

    // GUI
    var plane = BABYLON.Mesh.CreatePlane("plane", 1);
    plane.position = new BABYLON.Vector3(0.4, 4, 0.4)
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    var panel = new BABYLON.GUI.StackPanel();
    advancedTexture.addControl(panel);
    var header = new BABYLON.GUI.TextBlock();
    header.text = "Color GUI";
    header.height = "100px";
    header.color = "white";
    header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    header.fontSize = "120"
    panel.addControl(header);
    var picker = new BABYLON.GUI.ColorPicker();
    picker.value = sphere.material.diffuseColor;
    picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    picker.height = "350px";
    picker.width = "350px";
    picker.onValueChangedObservable.add(function (value) {
        sphere.material.diffuseColor.copyFrom(value);
    });
    panel.addControl(picker);

    vrHelper.onAfterEnteringVRObservable.add(() => {
        if (scene.activeCamera === vrHelper.vrDeviceOrientationCamera) {
            BABYLON.FreeCameraDeviceOrientationInput.WaitForOrientationChangeAsync(1000).then(() => {
                // Successfully received sensor input
            }).catch(() => {
                alert("Device orientation camera is being used but no sensor is found, prompt user to enable in safari settings");
            })
        }
    })



    return scene;
};

var colors = {
    seaFoam: BABYLON.Color3.FromHexString("#16a085"),
    green: BABYLON.Color3.FromHexString("#27ae60"),
    blue: BABYLON.Color3.FromHexString("#2980b9"),
    purple: BABYLON.Color3.FromHexString("#8e44ad"),
    navy: BABYLON.Color3.FromHexString("#2c3e50"),
    yellow: BABYLON.Color3.FromHexString("#f39c12"),
    orange: BABYLON.Color3.FromHexString("#d35400"),
    red: BABYLON.Color3.FromHexString("#c0392b"),
    white: BABYLON.Color3.FromHexString("#bdc3c7"),
    gray: BABYLON.Color3.FromHexString("#7f8c8d")
}
*/
const initVR = function (scene) {
    // Default Environment
    //var environment = scene.createDefaultEnvironment({ enableGroundShadow: true, groundYBias: 2.8 });
    //environment.setMainColor(BABYLON.Color3.FromHexString("#74b9ff"))

    // Enable VR
     var vrHelper = scene.createDefaultVRExperience({ createDeviceOrientationCamera: false, useXR: true });
  //  vrHelper.enableTeleportation({ floorMeshes: [environment.ground] });

    vrHelper.onAfterEnteringVRObservable.add(() => {
        if (scene.activeCamera === vrHelper.vrDeviceOrientationCamera) {
            BABYLON.FreeCameraDeviceOrientationInput.WaitForOrientationChangeAsync(1000).then(() => {
                // Successfully received sensor input
            }).catch(() => {
                alert("Device orientation camera is being used but no sensor is found, prompt user to enable in safari settings");
            })
        }
    }) 
}

const createSceneSTL = () => {

    // SCENE
    var scene = new BABYLON.Scene(engine);
    var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.env", scene);
    scene.environmentTexture = hdrTexture;

    // VR
    //initVR(scene);

    // VR FIN 


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


    computeIOBoundingRadius();

 
    gl = new BABYLON.GlowLayer("glow", scene);

    customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, earthColorization(whitePalette));

    $('#preset-select').on('change',
        function () {
            var mat = this.value;


            customMesh.material = myMaterial;
            switch (mat) {
                case 'aztecCalendarPalette': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_aztecCalendar)); break;


                case 'earthTodayPalette': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonToday)); break;
                case 'earthHadeenBeginPalette': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonHadeenBegin)); break;
                case 'earthHadeenEndPalette': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonHadeenEnd)); break;
                case 'earthArcheenPalette': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonArcheen)); break;
                case 'earthProterozoiquenPalette': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonProterozoiquen)); break;

                case 'elevationcolors_earthEonPhanerozoique_Paleozoique': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonPhanerozoique_Paleozoique)); break;
                case 'elevationcolors_earthEonPhanerozoique_Mesozoique': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonPhanerozoique_Mesozoique)); break;
                case 'elevationcolors_earthEonPhanerozoique_Cenozoique': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_earthEonPhanerozoique_Cenozoique)); break;

                case 'mercury': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_Mercury)); break;
                  
                case 'neptune': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_Neptune)); break;


                case 'venus': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_Venus)); break;


                case 'mars': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_Mars)); break;
                  
                case 'pluto': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_Pluto)); break;
                case 'moon': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_Moon)); break;
                case 'Encelade': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_Encelade)); break;

                case 'Arakis': customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, elevationColorization(elevationcolors_arrakis)); break;

                default: customMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, earthColorization(whitePalette));

            }

        }
    );


    // TEST COLOURS

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


    createBoundingSphere(scene, LX, LY, LZ);

    createAtmosphere(scene, LX, LY, LZ);  
    createOcean(scene, LX, LY, LZ);
   

    lavamaterial = new BABYLON.PBRMaterial("lavamaterial", scene);
    createLava(scene, lavamaterial, LX, LY, LZ);

    cloudsmaterial = new BABYLON.PBRMaterial("cloudsmaterial", scene);
    createClouds(scene, cloudsmaterial, LX, LY, LZ);

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
    customMesh.material = myMaterial;
    //SetMaterial(MaterialsTable.plaster, 0.2, 0.1, 0.05, 0, 0);
    SetMaterial(MaterialsTable.plaster, 0, 0, 0, 0, 0);


    $('#material-select').on('change',
        function () {
            var mat = this.value;

            if (mat == 'lava') { customMesh.material = lavamaterial;  }
            else if (mat == 'stone') {
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

    // SKYBOX
   
    var urlimage = __urlbase + "/images/sky/voie lactee.jpeg";

   // if (!ImageExist(urlimage)) alert('image not found : ' + urlImage);

    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;

    skyboxMaterial.reflectionTexture = new BABYLON.Texture(urlimage, scene, true);
    
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

   /* var skybox = BABYLON.Mesh.CreateBox('SkyBox', 1000, scene, false, BABYLON.Mesh.BACKSIDE);
    skybox.material = new BABYLON.SkyMaterial('sky', scene);
    skybox.material.inclination = -0.35;*/
    skybox.setEnabled(true);
    $('#cbShowSkyBox').on('change', function () {
        skybox.setEnabled(this.checked);
    });

    $('#sky-select').on('change',
        function () {
            var fichierimage = this.value;

            urlimage = __urlbase + "/images/sky/" + fichierimage;
            skyboxMaterial.reflectionTexture = new BABYLON.Texture(urlimage, scene, true);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
            skybox.material = skyboxMaterial;

            //var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1000, height: 1000, subdivisions: 10 }, scene, false);

            var gridGroundMaterial = new BABYLON.GridMaterial("gridGroundMaterial", scene);
            gridGroundMaterial.majorUnitFrequency = 10;
            gridGroundMaterial.minorUnitVisibility = 0.7;
            gridGroundMaterial.lineColor = new BABYLON.Color3(0.9, 0.9, 1);
            gridGroundMaterial.gridRatio = 1;
            gridGroundMaterial.opacity = 0.99;
            gridGroundMaterial.useMaxLine = true;

            ground.material = gridGroundMaterial;
        }
    );



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

    // BOUNDING BOX ON/OFF
    customMesh.showBoundingBox = false;
    $('#cbBoundingBox').on('change', function () {
        customMesh.showBoundingBox = this.checked;
    });



    //customMesh.material = myMaterial;


    // BACK FACE CULLING ON/OFF
    myMaterial.backFaceCulling = true;
    $('#backFaceCulling').on('change', function () {
        myMaterial.backFaceCulling = this.checked;
    });


    // WIREFRAME ON/OFF  
    myMaterial.wireframe = false;
    $('#wireframe').on('change', function () {
        myMaterial.wireframe = this.checked;
    });


    // EDGES ON/OFF
    customMesh.edgesColor.copyFromFloats(0, 0, 1, 1);
    customMesh.edgesWidth = maxBoundingLengh * 0.05;
    $('#cbEdges').on('change', function () {
        if (this.checked) customMesh.enableEdgesRendering(1);
        else customMesh.disableEdgesRendering();

    });


    // NORMALS ON/OFF
    var normalLines;
    $('#cbShowNormals').on('change', function () {
        if (!this.checked) normalLines.dispose();
        else normalLines = showNormals(customMesh, 0.010 * maxBoundingLengh, new BABYLON.Color3(1, 0, 0));
    });


    // CAMERA Target
    var camera = new BABYLON.ArcRotateCamera("camera1",
        0, 0,
        maxBoundingLengh * 1.5,
        new BABYLON.Vector3(0, 1, -1),
        scene);

    camera.attachControl(canvas, true);
    camera.setTarget(cameraTarget);

    camera.beta = Math.PI / 2;
    camera.alpha = 1.75 * Math.PI;


    showAmbiantLight( scene);
    
    // CAMERA LIMITATIONS
    camera.radius = maxBoundingLengh*1.5;
   

   


    // LIGHTS

    //   var lightAmbiant =
    //   showAmbiantLight(0.4, scene);
    //  showRGBPointLight(0.2,scene);
   

    defineLightCamera(scene,camera);

    lightCamera.intensity = 0.5;
    lightAmbiant.intensity = 0.5;
    $('#RCameraLight').on('input', function () {
        lightCamera.intensity = 0.01 * this.value;
        lightAmbiant.intensity = 0.01 * this.value;
    });


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

    ground.setEnabled(false);
    $('#cbShowGridGround').on('change', function () {
        ground.setEnabled(this.checked);
    });



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

    const registerCameraLimitations = function () {

        // lightCamera.position = camera.position;
        // lightCamera.position = camera.position;

        //Angle
        // if (camera.beta < 0.1) camera.beta = 0.1;
        // else if (camera.beta > (Math.PI / 2) * 0.9) camera.beta = (Math.PI / 2) * 0.9;

        //Zoom
        if (camera.radius > maxBoundingLengh * 2.5) camera.radius = maxBoundingLengh * 2.5;
        if (camera.radius < maxBoundingLengh * 0.5) camera.radius = maxBoundingLengh * 0.5;

        AmbiantLightFollowCamera(camera);
    }

   

    // BEFORE RENDER
    scene.registerBeforeRender(function () {
    
        registerCameraLimitations();
     
        lavaAnimation();
        cloudsAnimation();
 
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
