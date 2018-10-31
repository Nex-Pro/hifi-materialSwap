/**
 * @file Adds the ability to swap materials on the avatar based on pre configured options.
 * @author Madders
 */

var materialSwap = function () {
    var APP_NAME = "SKINS";
    var SETTING_STORAGE_NAME = "KoboldGardenMaterialSwap"; // <---- Best to change this to the name of the avatar. used to persist setting between script reloads
    // Link to your app's HTML file
    var APP_URL = Script.resolvePath("materialSwap.html");
    var APP_ICON = Script.resolvePath("terrain.svg");

    var materialEntityName = MyAvatar.displayName + "-Avatar-Material-Entity-";
    var materialOptions = Script.require(Script.resolvePath("materialOptions.json?v1"));

    // Get a reference to the tablet 
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    // The following lines create a button on the tablet's menu screen
    var button = tablet.addButton({
        icon: APP_ICON,
        text: APP_NAME
    });

    // When user click the app button, we'll display our app on the tablet screen
    function onClicked() {
        tablet.gotoWebScreen(APP_URL + "?date=" + new Date());
    }
    button.clicked.connect(onClicked);

    // function to load a material option from configuration if it exists
    var loadMaterialOption = function (optionId) {
       // loop through all the material options
        for (var i = 0; i < materialOptions.length; i++) {
            // check if material option is the one requested
            if (materialOptions[i].id === optionId) {
                // clear any existing material entities
                clearAllMaterialEntities();

                // create any materials that constitue this material option
                for (var j = 0; j < materialOptions[i].materials.length; j++) {
                    createAvatarMaterialEntity(materialOptions[i].materials[j]);
                }

                Settings.setValue(SETTING_STORAGE_NAME + "/ChosenOption", optionId);
                return;
            }
        }

        // should only get here if the supplied optionId isn't found
        console.log("Supplied optionId not found in materialOptions. Please check spelling and case.");
    };

    // function to create an avatar material based on a basic material object
    var createAvatarMaterialEntity = function (material) {
        return Entities.addEntity({
            type: "Material",
            name: materialEntityName + material.materialName,
            position: MyAvatar.position,
            userData: "",
            materialURL: material.materialURL, // url of the material, or use string constant "materialData" to use inline json matareialData
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            priority: 1,
            parentMaterialName: "mat::" + material.materialName, // this name must match that used within the avatar model
            materialData: JSON.stringify(material.materialData),
            parentID: MyAvatar.sessionUUID
        }, true);
    };

    // function used to clear all material entities currently attached to your avatar that follow the creation pattern of this script
    var clearAllMaterialEntities = function () {
        var entities = Entities.findEntities(MyAvatar.position, 10);
        if (entities.length > 0) {
            for (var index in entities) {
                var entity = Entities.getEntityProperties(entities[index]);
                if (entity.clientOnly &&
                    entity.type === "Material" &&
                    entity.parentID === MyAvatar.sessionUUID &&
                    entity.name.indexOf("Avatar-Material-Entity") !== -1) {

                    Entities.deleteEntity(entity.id);
                    console.log("Found a potential Avatar Material Entity. Removing it.");
                }
            }
        }
    };

    var onWebEventReceived = function (event) {
        // Converts the event to a JavasScript Object
        if (typeof event === "string") {
            event = JSON.parse(event);
        }

        if (event.type === "materialSwap-getSettings") {            
            tablet.emitScriptEvent(JSON.stringify({
                type: "materialSwap-settings",
                settings: materialOptions
            }));
        }

        if (event.type === "materialSwap-setMaterialOption") {
            loadMaterialOption(event.optionId);
        }

        if (event.type === "materialSwap-clearMaterialOption") {
            clearAllMaterialEntities();
        }
    };

    var savedOptionId = Settings.getValue(SETTING_STORAGE_NAME + "/ChosenOption");
    if (savedOptionId.length) {
        loadMaterialOption(savedOptionId);
    }

    tablet.webEventReceived.connect(onWebEventReceived);

    Script.scriptEnding.connect(function () {
        tablet.removeButton(button);
        clearAllMaterialEntities();
    });
}();