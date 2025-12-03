import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { getCreateMapOptions } from './options';
import Container from '@mui/material/Container';
import styles from '../../assets/styles/samples/map.module.css';

const MapLabel = () => {
  const dispatch = useDispatch();
  const name = 'map-label';
  const title = '맵 - 레이블';
  const subTitle = `<b>map.show("label")</b> 을 이용해 지역에 레이블을 표시할 수 있습니다.<br>이때 표시하는 레이블은 <b>map.key.name</b> 에 설정한 키를 geojson 데이터에서 읽어드립니다.<br>
    geojson 에 있는 다른 값으로 레이블을 표시하고자 한다면 <b>map.locale</b>을 이용해 <b>map.key.name-map.locale</b> 키에 해당하는 값을 읽어드리도록 할 수 있습니다.`;
  const menuIndex = 6;

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
        "url":"/assets/lib/ibmap/map/world/world.json",
        "loadfinish": function(){
          mapInstance.current.map.show( 'label' );
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
  }, [createMap, dispatch, subTitle, title, menuIndex, createMapOptions]);

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

export default MapLabel;
