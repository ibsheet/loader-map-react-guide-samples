import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { getCreateMapOptions } from './options';
import Container from '@mui/material/Container';
import styles from '../../assets/styles/samples/map.module.css';

const Drilldown = () => {
  const dispatch = useDispatch();
  const name = 'drilldown';
  const title = '드릴다운';
  const subTitle = `map 속성에 <b>ondrilldown</b> 이벤트를 이용해서 하위 지역 드릴 다운을 구현할 수 있습니다.<br>
    map 에 <b>drillButton</b> 속성을 이용하면 <b>drillup 처리</b>를 위한 버튼을 만들 수 있습니다.<br>
    예제에서 지역을 클릭하면 해당 지역의 하위 지역을 확인할 수 있습니다.`;
  const menuIndex = 2;

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
      mapInstance.current.setSubtitle( "지도를 클릭해서 하위 지도로 이동할 수 있습니다.", {
        "fontSize": 14,
        "fontWeight": 500
      });

      mapInstance.current.map.load({
        "url": "/assets/lib/ibmap/map/new-kr/korea.json",
        "loadfinish": function ( ) {}
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

export default Drilldown;
