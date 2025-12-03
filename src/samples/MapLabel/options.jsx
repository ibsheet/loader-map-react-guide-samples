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
        "locale": "en",
        "dragMove": true,
        "scale": 1.55,
        "key": {
          "name": "name"
        },
        "select": {
          "enable": false
        },
        "hover": {
          "style": {
            "backgroundColor": "#99D0EE"
          }
        },
        "style": {
          "backgroundColor": "#198EC4",
          "border": {
            "color": "#fff",
            "width": 1
          }
        },
        "drillButton": {
          "text": "Back"
        },
        "ondrilldown": function(ev) {
          // 대륙 배열을 객체로 선언
          const regions = {
            "oceania": ["au", "fj", "nc", "nz", "pg", "sb", "vu"],
            "europe": ["al", "at", "be", "bg", "ba", "by", "ch", "cz", "de", "dk", "es", "ee", "fi", "fr", "gb", "gr", "hr", "hu", "ie", "is", "it", "ko", "lt", "lu", "lv", "md", "mk", "me", "nl", "no", "pl", "pt", "ro", "ru", "rs", "sk", "si", "se", "ua"],
            "asia": ["af", "ae", "am", "az", "bd", "bn", "bt", "cn", "cy", "ge", "id", "in", "ir", "iq", "il", "jo", "jp", "kz", "kg", "kh", "kr", "kw", "la", "lb", "lk", "mm", "mn", "my", "np", "om", "pk", "ph", "kp", "ps", "qa", "sa", "sy", "th", "tj", "tm", "tl", "tr", "tw", "uz", "vn", "ye"],
            "america": ["ar", "bs", "bz", "bo", "br", "ca", "cl", "co", "cr", "cu", "do", "ec", "fk", "gl", "gt", "gy", "hn", "ht", "jm", "mx", "ni", "pa", "pe", "pr", "py", "sv", "sr", "tt", "uy", "us", "ve"],
            "africa": ["ao", "bi", "bj", "bf", "bw", "cf", "ci", "cm", "cd", "cg", "dj", "dz", "eg", "er", "et", "ga", "gh", "gn", "gm", "gw", "gq", "ke", "lr", "ly", "ls", "ma", "mg", "ml", "mz", "mr", "mw", "na", "ne", "ng", "rw", "eh", "sd", "ss", "sn", "sl", "so", "sz", "td", "tg", "tn", "tz", "ug", "za", "zm", "zw"]
          };

          let detailName = null;

          for (const [region, codes] of Object.entries(regions)) {
            if (codes.includes(ev.id)) {
              detailName = region; // 해당 대륙 이름 반환
            }
          }

          // 드릴다운 인덱스가 0 이면 드릴다운 처리
          if (ev.index === 0) {
            ev.drilldown({
              "url":"/assets/lib/ibmap/map/world/" + detailName + ".json"
            });
          }
          else {
            mapInstance.map.drillup();
          }
        }
      },
      "style": {
        "backgroundColor": "#fff"
      }
    }
  }
}
