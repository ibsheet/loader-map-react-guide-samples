import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { createMapOptions } from './options';
import Container from '@mui/material/Container';
import styles from '../../assets/styles/samples/map.module.css';

const Color = () => {
  const dispatch = useDispatch();
  const name = 'color';
  const title = 'color 맵';
  const subTitle = `데이터 값에 따라 지역별로 다른 색상을 표시할 수 있습니다.<br>
    인구수 데이터를 기반으로 색상이 적용된 예시입니다.`;
  const menuIndex = 3;
  
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
      //2024년 2/4 분기 기준
      const etcData = {
        "종로구":	139378,
        "중구":	121322,
        "용산구":	212175,
        "성동구":	277090,
        "광진구":	335335,
        "동대문구":	340983,
        "중랑구":	382284,
        "성북구":	424916,
        "강북구":	287490,
        "도봉구":	360722,
        "노원구":	497237,
        "은평구":	466474,
        "서대문구":	305857,
        "마포구":	363679,
        "양천구":	435548,
        "강서구":	562550,
        "구로구":	392311,
        "금천구":	227457,
        "영등포구":	374985,
        "동작구":	378360,
        "관악구":	481872,
        "서초구":	407768,
        "강남구":	569154,
        "송파구":	653989,
        "강동구":	459389
      }

      mapInstance.current.map.load({
        "url": "/assets/lib/ibmap/map/new-kr/11000/KR11000.json",
        "loadfinish": function ( e ) {
          var data = {},
          unit = {};

          e.mapData.features.forEach(function(i) {
            unit = i.properties;
            data[ unit.id ] = {
              value: etcData[unit.name]
            };
            unit.etcData = etcData[unit.name];
          });
          mapInstance.current.map.setData( data );
        }
      })
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

export default Color;
