# hifi-materialSwap


  This is a fairly straight forward script / tablet app that is intended to be attached to an avatar in order to be able to swap materials between a set of preconfigured options.

When the script is running you get an additional button on the tablet / toolbar named "SKINS". Clicking this will display the skin chooser as pictured below:

![Tablet Example](http://hifi.jollysoft.com/Assets/Avatars/koboldGardenMultiColour/Screenshots/TabletExample.jpg)

Then clicking on any of the options will update your avatar with the chosen materials.

## Demo

You can see the script in action by setting your avatar to:

https://hifi.jollysoft.com/Assets/Avatars/koboldGardenMultiColour/kobold-garden.fst

## Usage

Assuming you know how to attach scripts to your avatar include the **materialSwap.js** in your avatars fst file. You also need to ensure you include the other source files in the same folder as the main script.

Material options are defined using the the **materialOptions.json** file. The example includes a number of very simple material options as displayed below:

```javascript
  {
    "id": "Green",
    "displayName": "Green",
    "description": "",
    "thumbnail": "",
    "materials": [
      {
        "materialURL": "materialData",
        "materialName": "Material.003",
        "materialData": {
          "materialVersion": 1,
          "materials": {
            "model": "hifi_pbr",
            "albedoMap": "https://url.example.to.alternative.texture/nk4.png",
          }
        }
      }
    ]
  }
```

Basic definition of a *materialOption* is:

* id - a unique identifier for the option

* displayName - the name to display in the tablet app for the option

* description (optional) - the description to display in the tablet app. If not supplied it simply doesn't show the description block in the tablet app.

* thumbnail (optional) - the image to display in the tablet app. If not supplied it simply doesn't show the image block in the tablet app.

* materials - a list of materials that will be replaced on the avatar when this option is selected. You can define any number of replacement materials for each option, so for example you could just replace the material on your avatar T-Shirt or re-define every material the avatar uses.
  * Materials use the format as defined on https://docs.highfidelity.com/api-reference/globals#Material

  * The most important property is *martialName*, which must match the name in the source model exactly.

  * *Please note - the materials defined in the example are very basic, and are just defining the basic texture map. The kobold model may look slightly strange with this as there may be other material settings, such as normalMap etc, that should be defined for it to look correct.* 


## Attributions

Menithal for the scripting sample that I used for the core of the material switcher.

Assets used in the example:

* Hifi Avatar from marketplace by Davwyn, [Link](https://highfidelity.com/marketplace/items/b641bdd6-5328-4b94-82eb-ab8b63d19ca0)
* Original Kobold Model by uwusoft, [Link](https://uwusoft.itch.io/kobold-model)
* Sketchfab source, [Link](https://sketchfab.com/models/dfc842cf4c2041e4bd56a0c79e2fc162)

Tablet Icon made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
