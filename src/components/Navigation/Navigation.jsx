import React from 'react';
import { useParams } from 'react-router-dom';
import { route } from './Routes';
import Home from '../../samples/Home';

// Map 컴포넌트 임포트
import Line from '../../samples/Line';
import MeasureDistance from '../../samples/MeasureDistance';
import Drilldown from '../../samples/Drilldown';
import Color from '../../samples/Color';
import MultiSelect from '../../samples/MultiSelect';
import PointSymbol from '../../samples/PointSymbol';
import MapLabel from '../../samples/MapLabel';
import SvgMap from '../../samples/SvgMap';
import TileMap from '../../samples/TileMap';

const matchRoute = idx => {
  switch (route[idx] && route[idx].name) {
    case 'line':
      return <Line />;
    case 'measure-distance':
      return <MeasureDistance />;
    case 'drilldown':
      return <Drilldown />;
    case 'color':
      return <Color />;
    case 'multi-select':
      return <MultiSelect />;
    case 'point-symbol':
      return <PointSymbol />;
    case 'map-label':
      return <MapLabel />;
    case 'svg-map':
      return <SvgMap />;
    case 'tile-map':
      return <TileMap />;
    default:
      return <Home />;
  }
}

const Navigation = () => {
  const { name } = useParams();
  const index = route.findIndex(element => element.name === name);

  return (
    <>
      { matchRoute(index) }
    </>
  )
}

export default Navigation;
