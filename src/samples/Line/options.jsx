export const createMapOptions = {
  "el": "mapDiv",
  "options": {
    "map": {
      "scale": 1.1,
      "shadow": false,
      "select": {
        "style": {
          "backgroundColor": "#437FEA"
        }
      },
      "tooltip": {
        "style": {
          "border": {
            "color": "#aaa"
          }
        }
      },
      "hover": {
        "style": {
          "backgroundColor": "#75A5FA"
        }
      },
      "dataLabel": {
        "enable": false
      },
      "style": {
        "backgroundColor": "#FFF",
        "border": {
          "width": 0.4,
          "color": "#437FEA"
        }
      }
    },
    "legend": {
      "enable": true,
      "type": "symbol",
      "align": "left",
      "verticalAlign": "bottom",
      "orient": "vertical",
      "title": "A항공 운행 노선",
      "range": [
        "diamond",
        "square",
        "cross"
      ],
      "color": [
        "red",
        "#6482AD",
        "rgb(180, 180, 80)"
      ],
      "domain": [
        "김포국제공항",
        "김해국제공항",
        "제주국제공항"
      ]
    },
    "line": {
      "onclick": function(ev) {
        ev.line.remove(ev.data.id);
      }
    },
    "style": {
      "backgroundColor": "#EDEDED"
    }
  }
}
