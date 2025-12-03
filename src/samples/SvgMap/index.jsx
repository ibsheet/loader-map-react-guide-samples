import { useEffect, useState, useRef, useCallback } from 'react';
import loader from '@ibsheet/loader';
import { useDispatch } from 'react-redux';
import { createSample, removeSample } from '../../reducer';
import { createMapOptions, mapConfigs, typeColors } from './options';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from '../../assets/styles/samples/svgMap.module.css';

const SvgMap = () => {
  const dispatch = useDispatch();
  const name = 'svg-map';
  const title = 'SVG 디자인 맵';
  const subTitle = `SVG 이미지와 json 또는 geojson을 사용하여 맵을 구현할 수 있습니다.<br>
    데이터는 ID가 일치하는 SVG 요소에 자동으로 매핑됩니다.`;
  const menuIndex = 7;
    
  const mounted = useRef(false);
  const mapInstance = useRef(null);
  const [mapType, setMapType] = useState('seoul');
  const [styleType, setStyleType] = useState('type1');

  const createMap = useCallback(async () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMap = (newMapType = mapType, newStyleType = styleType) => {
    if (mapInstance.current) {
      let map = newMapType;
      let type = newStyleType;

      let url = mapConfigs[map][type].svg;
      let data = mapConfigs[map][type].json;

      if (map === 'world') {
        mapInstance.current.cfg.map.scale = 0.8;
      } else {
        mapInstance.current.cfg.map.scale = 1.2;
      }

      let hoverColor = typeColors[type].hover;
      let selectColor = typeColors[type].select;

      mapInstance.current.cfg.map.hover.style.backgroundColor = hoverColor;
      mapInstance.current.cfg.map.select.style.backgroundColor = selectColor;
      
      mapInstance.current.map.clear();
      mapInstance.current.map.clearData();
      mapInstance.current.tooltip._clearFixed();
      
      mapInstance.current.map.loadSvg(url, data);
    }
  }

  // 맵 타입 변경 핸들러
  const handleMapTypeChange = (event, newMapType) => {
    if (newMapType !== null) {
      setMapType(newMapType);
      loadMap(newMapType, styleType);
    }
  };

  // 스타일 타입 변경 핸들러
  const handleStyleTypeChange = (event, newStyleType) => {
    if (newStyleType !== null) {
      setStyleType(newStyleType);
      loadMap(mapType, newStyleType);
    }
  };
  
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
  }, [createMap, dispatch, subTitle]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subTitle} dangerouslySetInnerHTML={{ __html: subTitle }}></p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>지도 선택</span>
          <ToggleButtonGroup
            value={mapType}
            exclusive
            onChange={handleMapTypeChange}
            className={styles.toggleGroup}
          >
            <ToggleButton value="seoul" className={styles.toggleButton}>서울지도</ToggleButton>
            <ToggleButton value="korea" className={styles.toggleButton}>대한민국지도</ToggleButton>
            <ToggleButton value="world" className={styles.toggleButton}>세계지도</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>타입 선택</span>
          <ToggleButtonGroup
            value={styleType}
            exclusive
            onChange={handleStyleTypeChange}
            className={styles.toggleGroup}
          >
            <ToggleButton value="type1" className={styles.toggleButton}>Type 1</ToggleButton>
            <ToggleButton value="type2" className={styles.toggleButton}>Type 2</ToggleButton>
            <ToggleButton value="type3" className={styles.toggleButton}>Type 3</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <div id="mapDiv" className={styles.mapDiv}></div>
      </div>
    </Container>
  );
};

export default SvgMap;
