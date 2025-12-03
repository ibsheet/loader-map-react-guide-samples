import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { getCreateMapOptions } from './options';
import Container from '@mui/material/Container';
import styles from '../../assets/styles/samples/map.module.css';

const MeasureDistance = () => {
  const dispatch = useDispatch();
  const name = 'measure-distance';
  const title = '거리 측정';
  const subTitle = `line.label 속성에 <b>showDistance: 1</b> 을 선언하면 연결된 지점과 지점의 거리를 자동으로 계산해 레이블로 표시합니다. <br>
    <b>line.label 속성이 enable:true(default)</b> 로 되어있어야 확인이 가능합니다.<br>
    지도를 클릭하여 거리를 측정해 보세요.`;
  const menuIndex = 1;

  const mounted = useRef(false);
  const mapInstance = useRef(null);

  let createMapOptions = null;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createMap = async () => {
    try {
      const mapRef = {};
      createMapOptions = getCreateMapOptions(mapRef);

      const map = await loader.createMap({
        el: createMapOptions.el,
        options: createMapOptions.options
      });

      Object.assign(mapRef, map);

      mapInstance.current = map;
      loadMap();
    } catch (err) {
      console.error('Failed to create line map', err);
    }
  };

  const loadMap = () => {
    if (mapInstance.current) {
      mapInstance.current.map.load({
        "url": "/assets/lib/ibmap/map/new-kr/korea.json",
        "loadfinish": function (e) {
          let colors = {};
          for(let i = 0 ; i < e.mapData.features.length ; i++ ) {
            if(e.mapData.features[i].id == "KR30000"){
              colors[e.mapData.features[i].id] = {style:{backgroundColor: "#437FEA"}};
            }else if(e.mapData.features[i].id == "KR26000"){
              colors[e.mapData.features[i].id] = {style:{backgroundColor: "#437FEA"}};
            }
          }
          mapInstance.current.map.setData( colors );

          const lineData = [
            {
              "id": "kh99985",
              "from": {
                "name": "대전 중구",
                "lon": 127.37481651832546, 
                "lat": 36.339568545436094
              },
              "to": {
                "name": "부산 해운대",
                "lon": 129.14995772145545, 
                "lat": 35.16642343299291
              },
              "style": {
                "border": {
                  "width": 3,
                  "color": "#9A7E6F",
                  "style": "dotted", // "solid", "dashed", "dotted", "10 50"(선길이 공백길이)
                  "animation": "stream 20s linear infinite"
                },
              },
              "label":{
                "text": "대전 중구 -> 부산 해운대",
                "textPosition": 1, //거리정보 보다 앞에 text 표시
                "showDistance": 1
              }
            }
          ];
          mapInstance.current.line.add(lineData);
          const symbolData = [
            {
              "id": "ko001",
              "name": "대전중구",
              "lon": 127.37481651832546, 
              "lat": 36.339568545436094,
              "symbol": {
                "type":'circle',
                "label":"대전 중구",
                "style":{
                  "color":"#fff",
                  "size":50
                }
              }
            },
            {
              "id": "ko002",
              "name": "부산 해운대",
              "lon": 129.14995772145545, 
              "lat": 35.16642343299291,
              "symbol": {
                "type":'circle',
                "label":"부산 해운대",
                "style":{
                  "color":"#fff",
                  "size":50
                }
              }
            }
          ];
          mapInstance.current.point.clear();
          mapInstance.current.point.add( symbolData );
        }
      });
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
  }, [createMap, dispatch, subTitle, name, title, menuIndex, createMapOptions]);

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

export default MeasureDistance;
