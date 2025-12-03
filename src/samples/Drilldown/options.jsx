/**
 * mapInstance를 받아서 createMapOptions를 생성하는 함수
 * @param mapInstance 생성된 map 인스턴스
 * @returns createMapOptions 객체
 */
export function getCreateMapOptions(mapInstance) {
  return {
    "el": 'mapDiv',
    "options": {
      "map": {
        "dataLabel": {
          "enable": true
        },
        "select": {
          "enable": false
        },
        "hover": {
          "enable": false
        },
        "tooltip": {
          "style": {
            "border": {
              "color": "#AAA"
            }
          }
        },
        "style": {
          "backgroundColor": "#BAD0F7",
          "border": {
            "width": 0.4,
            "color": "#FFF"
          }
        },
        "drillButton": {
          "text": "뒤로가기"
        },
        "ondrilldown": function ( e ) {
          if (e.id.substr(2,2) == "36" && e.index ==2 ) return;
          else if(e.index == 3) return;
          else {
            var area = e.id.substr(2,2);
            if(e.id=="KR36000") {
              e.id="KR36110"
            }
            fetch("/assets/lib/ibmap/map/new-kr/" + area + "000/" + e.id + ".json")
              .then(res => res.json()).then(data => {
                if (e.mapData.properties.name) {
                  var backgroundColor;
                  switch(e.index){
                    case 0:
                      backgroundColor = "#8DB3F8"
                      break;
                    case 1:
                      backgroundColor = "#437FEA"
                      break;
                    case 2:
                      backgroundColor = "#1B5CD0"
                      break;
                    case 3:
                      backgroundColor = "#BAD0F7"
                      break;
                    default:
                      backgroundColor = "#BAD0F7"
                      break;
                  }
                  if (mapInstance && mapInstance.map && mapInstance.map.main) {
                    mapInstance.map.main.update({
                      "map":{
                        "style":{
                          "backgroundColor": backgroundColor
                        }
                      }
                    });
                    mapInstance.map.main.setSubtitle(e.mapData.properties.name, {
                      "fontSize": 14,
                      "fontWeight": 500
                    });
                  }
                }
                e.drilldown({
                  "data": data,
                  "loadfinish": function(){
                  }
                });
              }
            );
          }
        },
        "ondrillupstart": function ( e ) {
          var backgroundColor;
          switch(e.index){
            case 0:
              backgroundColor = "#BAD0F7"
              break;
            case 1:
              backgroundColor = "#8DB3F8"
              break;
            case 2:
              backgroundColor = "#437FEA"
              break;
            case 3:
              backgroundColor = "#1B5CD0"
              break;
            default:
              backgroundColor = "#BAD0F7"
              break;
          }
          if (mapInstance && mapInstance.map && mapInstance.map.main) {
            mapInstance.map.main.update({
              "map":{
                "style":{
                  "backgroundColor":backgroundColor
                }
              }
            })
          }
          if (e?.mapData?.properties.name) {
            if (mapInstance && mapInstance.map && mapInstance.map.main) {
              mapInstance.map.main.setSubtitle(e.mapData.properties.name, {
                "fontSize": 14,
                "fontWeight": 500
              });
            }
          }else{
            if (mapInstance && mapInstance.map && mapInstance.map.main) {
              mapInstance.map.main.setSubtitle( "지도를 클릭해서 하위 지도로 이동할 수 있습니다.", {
                "fontSize": 14,
                "fontWeight": 500
              });
            }
          }
        },
        "onmouseover": function (e) {
          var id = e.id;
          var backgroundColor;
          switch(e.index){
            case 0:
              backgroundColor = "#8DB3F8"
              break;
            case 1:
              backgroundColor = "#437FEA"
              break;
            case 2:
              backgroundColor = "#1B5CD0"
              break;
            case 3:
              backgroundColor = "#BAD0F7"
              break;
            default:
              backgroundColor = "#BAD0F7"
              break;
          }

          var color = {
            [id] : {
              "style": {
                "backgroundColor": backgroundColor
              }
            }
          }
          mapInstance.map.setData(color);
        },
        "onmouseout": function (e) {
          var id = e.id;
          var backgroundColor;
          switch(e.index){
            case 0:
              backgroundColor = "#BAD0F7"
              break;
            case 1:
              backgroundColor = "#8DB3F8"
              break;
            case 2:
              backgroundColor = "#437FEA"
              break;
            case 3:
              backgroundColor = "#1B5CD0"
              break;
            default:
              backgroundColor = "#BAD0F7"
              break;
          }

          var color = {
            [id] : {
              "style": {
                "backgroundColor": backgroundColor
              }
            }
          }
          mapInstance.map.setData(color);
        }
      },
      "style": {
        "backgroundColor": "#FFF"
      }
    }
  };
}