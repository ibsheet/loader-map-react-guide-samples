import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { createMapOptions } from './options';
import Container from '@mui/material/Container';
import styles from '../../assets/styles/samples/map.module.css';

const Line = () => {
  const dispatch = useDispatch();
  const name = 'line';
  const title = '선 연결';
  const subTitle = `시작점과 끝점의 <b>위도(lat), 경도(loc)</b> 를 가진 line 데이터를 추가하면 지점 사이를 잇는 선이 표시됩니다.<br>
  선의 굵기, 색상, 애니메이션 등을 지정할 수 있습니다.<br>
  예제에 사용된 데이터는 실제 지역을 바탕으로 제작한 가상 데이터입니다. 실제 지명, 인명, 회사명과는 아무런 관계가 없습니다.`;
  const menuIndex = 0;
  
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
      fetch("/assets/lib/ibmap/map/new-kr/korea.json").then(res=>res.json()).then(data=>{
        mapInstance.current.map._loadMap(data, () => {
          const points = [
            {
              "id": "p-001",
              "symbol": {
                "label" : "김포국제공항", // 심볼 주변에 표시될 레이블
                "type" : "diamond", // 심볼 모양
                "style":{
                  "size": 100,
                  "color" : "red",
                  "labelSize": "12px",
                  "labelPos": "top"
                }
              },
              "name": "김포국제공항",
              "lat": 37.558056,
              "lon": 126.790556
            },{
              "id": "p-002",
              "symbol": {
                "label" : "제주국제공항", // 심볼 주변에 표시될 레이블
                "type" : "cross", // 심볼 모양
                "style":{
                  "size": 100,
                  "color" : "rgb(180, 180, 80)",
                  "labelSize": "12px",
                  "labelPos": "right",
                }
              },
              "name": "제주국제공항",
              "lat": 33.511111,
              "lon": 126.492778
            },{
                "id": "p-003",
                "symbol": {
                  "label" : "김해국제공항", // 심볼 주변에 표시될 레이블
                  "type" : "square", // 심볼 모양
                  "style":{
                    "size": 100,
                    "color" : "#6482AD",
                    "labelSize": "12px",
                    "labelPos": "right"
                  }
                },
                "name": "김해국제공항",
                "lat": 35.179444,
                "lon": 128.938056
            }
          ];

          // 심볼 표현
          mapInstance.current.point.add(points);

          const lineData = [
            {
              // 추가하는 lind id
              "id": "l-001",
              "from": {  // 시작점
                "name": "김포국제공항",
                // 위도
                "lat": 37.558056,
                // 경도
                "lon": 126.790556
              },
              "to": {   // 끝점
                "name": "제주국제공항",
                // 위도
                "lat": 33.511111,
                // 경도
                "lon":126.492778
              },
              "style": {
                "border": {
                  "width": 3, //연결선 굵기
                  "color": "#FC4100", //연결선 색상
                  "style": "dotted", //선 유형 "solid", "dashed", "dotted", "10 50"(선길이 공백길이)
                  "animation": "stream 20s linear infinite" //애니메이션
                }
              },
              "label": {
                "text": "김포 -> 제주 노선 (주 14회)", //선 표시 레이블
              }
            },
            {
              "id": "l-002",
              "from": {  // 시작점
                "name": "김포국제공항",
                // 위도
                "lat": 37.558056,
                // 경도
                "lon": 126.790556
              },
              "to": {   // 끝점
                "name": "김해국제공항",
                // 위도
                "lat": 35.179444,
                // 경도
                "lon": 128.938056
              },
              "style": {
                "border": {
                  "width": 3, //연결선 굵기
                  "color": "#f8d50a", //연결선 색상
                  "style": "solid", //선 유형 "solid", "dashed", "dotted", "10 50"(선길이 공백길이)
                }
              },
              "label": {
                "text": "김포 -> 김해 노선(주 7회)", //선 표시 레이블
                "textPosition": "right" //showDistance 사용시 거리정보 기준 레이블 표시 위치
              }
            },
            {
              "id": "l-003",
              "from": {   // 시작점
                "name": "김해국제공항",
                // 위도
                "lat": 35.179444,
                // 경도
                "lon": 128.938056
              },
              "to": {   // 끝점
                "name": "제주국제공항",
                // 위도
                "lat": 33.511111,
                // 경도
                "lon": 126.492778
              },
              "style": {
                "border": {
                  "width": 3, //연결선 굵기
                  "color": "#4793AF", //연결선 색상
                  "style": "dashed", //선 유형 "solid", "dashed", "dotted", "10 50"(선길이 공백길이)
                }
              },
              "label": {
                "text": "김해 -> 제주 노선(주 1회)", //선 표시 레이블
              }
            },
          ];

          mapInstance.current.line.add(lineData);
        });
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
  }, [createMap, dispatch, subTitle, name, title, menuIndex]);

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

export default Line;
