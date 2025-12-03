// SVG Map 기본 옵션
export const createMapOptions = {
 "el": "mapDiv",
 "options": {
    "line": {
      "label": {
        "showDistance": 1
      }
    }
  }
}

// SVG 맵 타입별 설정
export const mapConfigs = {
  seoul: {
    type1: {
      svg: '/assets/lib/ibmap/map/design/type1/seoul.svg',
      json: '/assets/lib/ibmap/map/design/type1/seoul.json'
    },
    type2: {
      svg: '/assets/lib/ibmap/map/design/type2/seoul.svg',
      json: '/assets/lib/ibmap/map/design/type2/seoul.json'
    },
    type3: {
      svg: '/assets/lib/ibmap/map/design/type3/seoul.svg',
      json: '/assets/lib/ibmap/map/design/type3/seoul.json'
    }
  },
  korea: {
    type1: {
      svg: '/assets/lib/ibmap/map/design/type1/korea.svg',
      json: '/assets/lib/ibmap/map/design/type1/korea.json'
    },
    type2: {
      svg: '/assets/lib/ibmap/map/design/type2/korea.svg',
      json: '/assets/lib/ibmap/map/design/type2/korea.json'
    },
    type3: {
      svg: '/assets/lib/ibmap/map/design/type3/korea.svg',
      json: '/assets/lib/ibmap/map/design/type3/korea.json'
    }
  },
  world: {
    type1: {
      svg: '/assets/lib/ibmap/map/design/type1/world.svg',
      json: '/assets/lib/ibmap/map/design/type1/world.json'
    },
    type2: {
      svg: '/assets/lib/ibmap/map/design/type2/world.svg',
      json: '/assets/lib/ibmap/map/design/type2/world.json'
    },
    type3: {
      svg: '/assets/lib/ibmap/map/design/type3/world.svg',
      json: '/assets/lib/ibmap/map/design/type3/world.json'
    }
  }
};

// 타입별 스타일 색상
export const typeColors = {
  type1: {
    select: '#13ACE2',
    hover: '#13ACE2'
  },
  type2: {
    select: '#4CAF50',
    hover: '#4CAF50'
  },
  type3: {
    select: '#FF5722',
    hover: '#FF5722'
  }
};
