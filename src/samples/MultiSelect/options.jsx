/**
 * mapInstance를 받아서 createMapOptions를 생성하는 함수
 * @param mapInstance 생성된 map 인스턴스
 * @returns createMapOptions 객체
 */
export function getCreateMapOptions(mapInstance) {
  return {
    "el": "mapDiv",
    "options": {
      "map": {
        "style": {
          "backgroundColor": "#FFF",
          "border": {
            "width": 0.4,
            "color": "#437FEA"
          }
        },
        "dataLabel": {
          "enable": true
        },
        "select": {
          "enable": 1,
          "multiSelect": 1,
          "style": {
            "backgroundColor": "#437FEA",
            "border": {
              "color": "#FFF"
            }
          }
        },
        "hover": {
          "style": {
            "backgroundColor": "#75A5FA"
          }
        },
        "tooltip": {
          "style": {
            "border": {
              "color": "#AAA"
            }
          }
        },
        "onselect": function () {
          var selected = mapInstance.map.getSelected();
          if(selected.length && Object.keys(selected[0]).length) {
            if (mapInstance && mapInstance.map && mapInstance.map.main) {
              mapInstance.map.main.setSubtitle(selected.map((r) => r.properties.name).join(", ")+" 선택 중");
            }
          }else{
            if (mapInstance && mapInstance.map && mapInstance.map.main) {
              mapInstance.map.main.setSubtitle("");
            }
          }
        }
      },
      "style": {
        "backgroundColor": "#EDEDED"
      }
    }
  };
}
