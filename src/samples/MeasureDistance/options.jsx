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
        "zoom": true,
        "scale": 1.5,
        "style": {
          "backgroundColor": "#FFF",
          "border": {
            "width": 0.4,
            "color": "#437FEA"
          }
        },
        "select": {
          "enable": false
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
        "onclick": function ( e ) {
          var clickPoint = mapInstance.map.setProjection().invert((window).d3.pointer(e.event));
          if(!mapInstance.firstPoint) {
            //기존 라인을 제거하자
            mapInstance.line.clear();
            mapInstance.point.clear();
            mapInstance.firstPoint = { "lon": clickPoint[0], "lat": clickPoint[1]};
            //시작점 symbol
            mapInstance.point.add({
              "lon": clickPoint[0],
              "lat": clickPoint[1],
              "id": "startSymbol",
              "name": "거리측정 시작점", //툴팁에 표시됨
              "symbol": {
                "label" : "시작점", // 심볼 주변에 표시될 레이블
                "type": "circle",
                "style":{
                  "color":"#437FEA",
                }
              },
            });
          }else{
            var line = [{
              "id":"tempLine",
              "from": mapInstance.firstPoint,
              "to":{"lon": clickPoint[0], "lat": clickPoint[1]},
              "style": {
                "border": {
                  "width": 2, //연결선 굵기
                  "color": "#7AB2D3", //연결선 색상
                  "lineStyle": "dotted", //선 유형 "solid", "dashed", "dotted", "10 50"(선길이 공백길이)
                  "animation": "stream 20s linear infinite" //애니메이션
                }
              },
              label:{
                showDistance: 1,
              }
            }];
            if (line[0].from.lon > line[0].to.lon ) {
              line[0].label.rotate = 180;
            }
            mapInstance.line.add(line);

            mapInstance.point.add({
              "lon" : clickPoint[0],
              "lat" : clickPoint[1],
              "id": "endSymbol",
              "name": "거리측정 끝점", //툴팁에 표시됨
              "symbol": {
                "label": "종료점", // 심볼 주변에 표시될 레이블
                "type": "circle",
                "style": {
                  "color": "#437FEA",
                }
              },
            });
            mapInstance.firstPoint = null;
          }
        }
      },
      "style": {
        "backgroundColor": "#EDEDED"
      },
      "point": {
        "tooltip": {
          "style": {
            "border": {
              "color": "#437FEA"
            }
          }
        }
      }
    }
  };
}
