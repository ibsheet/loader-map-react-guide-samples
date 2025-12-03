import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { createMapOptions } from './options';
import Container from '@mui/material/Container';
import styles from '../../assets/styles/samples/map.module.css';

const TileMap = () => {
  const dispatch = useDispatch();
  const name = 'tile-map';
  const title = '타일 맵';
  const subTitle = `<b>OpenStreeMap</b> 타일서버와 <b>Leaflet</b> 라이브러리를 사용하여 타일맵을 불러 올 수 있습니다. <br/>
    <b>위도, 경도를 사용</b>하여 지도 상에 point를 추가할 수 있습니다.<br/>
    geojson과 같은 지리 정보가 없기 때문에 map 요소는 사용할 수 없습니다.`;
  const menuIndex = 8;

  const mounted = useRef(false);
  const mapInstance = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createMap = async () => {
    try {
      const map = await loader.createMap({
        el: createMapOptions.el,
        options: createMapOptions.options
      });

      mapInstance.current = map;
      loadMap();
    } catch (err) {
      console.error('Failed to create line map', err);
    }
  };

  const loadMap = () => {
    if (mapInstance.current) {
      let options = {
        "url": 'https://{s}.tile.openstreetmap.org',
        "center": [35.84, 127.75],
        "zoom": 5
      };

      mapInstance.current.map.loadTileMap(options);

      let capitalNames = [
        "서울특별시",
        "도쿄(일본)",
        "베이징(중국)",
        "타이베이(대만)",
        "하노이(베트남)",
        "방콕(태국)",
        "자카르타(인도네시아)",
        "마닐라(필리핀)",
        "쿠알라룸푸르(말레이시아)",
        "뉴델리(인도)",
        "울란바토르(몽골)",
      ];

      let capitalLatitudes = [
        37.5665, // 서울
        35.6895, // 도쿄
        39.9042, // 베이징
        25.0330, // 타이베이
        21.0285, // 하노이
        13.7563, // 방콕
        -6.2088, // 자카르타
        14.5995, // 마닐라
        3.1390,  // 쿠알라룸푸르
        28.6139, // 뉴델리
        47.8864, // 울란바토르
      ];

      let capitalLongitudes = [
        126.9780, // 서울
        139.6917, // 도쿄
        116.4074, // 베이징
        121.5654, // 타이베이
        105.8544, // 하노이
        100.5018, // 방콕
        106.8456, // 자카르타
        120.9842, // 마닐라
        101.6869, // 쿠알라룸푸르
        77.2090,  // 뉴델리
        106.9057, // 울란바토르
      ];
      let lineData = [];
      let pointData = [{
        "id": 'p-00' + 0,
        "name": capitalNames[0],
        "lat": capitalLatitudes[0],
        "lon": capitalLongitudes[0],
        "symbol": {
          "label": capitalNames[0],
          "style": {
            "labelPos": "top"
          }
        }
      }];
      for (var i = 1; i < capitalNames.length; i++) {
        let from = {
          "name": capitalNames[0],
          "lat": capitalLatitudes[0],
          "lon": capitalLongitudes[0]
        };

        let data = {
          "id": 'l-00' + i,
          "from": from,
          "to": {
            "name": capitalNames[i],
            "lat": capitalLatitudes[i],
            "lon": capitalLongitudes[i]
          },
          "style": {
            "border": {
              "style": "dashed",
              "animation": "stream 30s linear infinite"
            }
          },
          "label": {
            "x": capitalLongitudes[i] > capitalLongitudes[0] ? 10 : -4,
            "rotate": capitalLongitudes[i] > capitalLongitudes[0] ? 0 : 180,
          }
        };

        lineData.push(data);
        pointData.push({
          "id": 'p-00' + i,
          "name": capitalNames[i],
          "lat": capitalLatitudes[i],
          "lon": capitalLongitudes[i]
        })
      }

      mapInstance.current.line.add(lineData);
      mapInstance.current.point.add(pointData);
    }
  }


  useEffect(() => {
    dispatch(createSample({ name, title, subTitle, createOptions: createMapOptions, menuIndex }));
    if (!mounted.current) {
      mounted.current = true;
      createMap();
    }

    return () => {
      if (mapInstance.current) {
        loader.removeMap(mapInstance.current);
        mapInstance.current = null;
      }
      dispatch(removeSample());
    };
  }, [createMap, dispatch, subTitle, title, menuIndex]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subTitle} dangerouslySetInnerHTML={{ __html: subTitle }}></p>
      </div>

      <div className={styles.mapWrapper}>
        <div id="mapDiv" className={styles.mapDiv}></div>
      </div>
    </Container>
  );
};

export default TileMap;
