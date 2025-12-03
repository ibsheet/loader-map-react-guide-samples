export const createMapOptions = {
  "el": "mapDiv",
  "options": {
    "subtitle": {
      "enable": true,
      "text": "맵의 특정 지역에 심볼을 표시할 수 있습니다.",
      "style": {
        "fontSize": 14,
        "fontWeight": 500
      }
    },
    "legend": {
      "enable": true,
      "type": "symbol",
      "range": [
        "diamond2",
        "wye",
        "circle"
      ],
      "color": [
        "#f86d58",
        "#0c8cfc",
        "#78f221"
      ],
      "domain": [
        "본사",
        "지부",
        "협력사"
      ],
      "orient": "vertical",
      "align": "right",
      "titleWidth": 120,
      "verticalAlign": "bottom",
      "title": "지부 및 협력사 현황"
    },
    "map": {
      "scale": 1.4,
      "style": {
        "border": {
          "color": "#737A82",
          "width": 0.4
        }
      },
      "select": {
        "style": {
          "backgroundColor": "white"
        }
      },
      "tooltip": {
        "style": {
          "border": {
            "color": "#AAA"
          }
        }
      }
    }
  }
}
