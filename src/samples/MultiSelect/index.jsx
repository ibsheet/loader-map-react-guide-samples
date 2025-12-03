import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { getCreateMapOptions } from './options';
import Container from '@mui/material/Container';
import styles from '../../assets/styles/samples/map.module.css';

const MultiSelect = () => {
  const dispatch = useDispatch();
  const name = 'multi-select';
  const title = '다중 선택';
  const subTitle = `기본적으로 한번에 한 지역만 선택이 가능하지만, <b>map.select.multiSelect : 1</b>로 설정하여 다중 선택을 구현할 수 있습니다.<br>
    선택한 영역의 정보는 <b>map.onselect 이벤트</b>에서 확인이 가능합니다.`;
  const menuIndex = 4;

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
      mapInstance.current.map.load( {
        "url": "/assets/lib/ibmap/map/new-kr/51000/KR51000.json",
        "loadfinish": function () {}
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

export default MultiSelect;
