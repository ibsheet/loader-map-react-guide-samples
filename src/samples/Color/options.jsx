export const createMapOptions = {
  "el": 'mapDiv',
  "options": {
    "subtitle": {
      "text": "서울특별시 지역별 인구 분포",
      "style": {
        "fontSize": 14,
        "fontWeight": 500
      }
    },
    "legend": {
      "enable": true,
      "range": [
        "#BAD0F7",
        "#1B5CD0"
      ],
      "width": 20,
      "cellCount": 10,
      "title": "구 별 인구수",
      "orient": "vertical",
      "align": "right",
      "verticalAlign": "middle"
    },
    "map": {
      "scale": 0.95,
      "dataLabel": {
        "enable": true,
        "formatter": function(d, str) {
          if(typeof d.properties.etcData != "undefined"){
            return str + " " + (d.properties.etcData).toLocaleString()+"명" ;
          }else{
            return str;
          }
        }
      },
      "style": {
        "border": {
          "width": 0.4,
          "color": "#FFF"
        },
        "backgroundColor": "#EDEDED"
      },
      "select": {
        "enable": false
      },
      "hover": {
        "style": {
          "backgroundColor": "#d2dced"
        }
      },
      "tooltip": {
        "style": {
          "border": {
            "color": "#AAA"
          }
        }
      },
      "colorAxis": {
        "enable": true,
        "color": [
          "#BAD0F7",
          "#1B5CD0"
        ]
      }
    },
    "style": {
      "backgroundColor": "#FFF"
    }
  },
}
