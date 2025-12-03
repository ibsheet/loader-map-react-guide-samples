import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { FaSearch, FaChartLine, FaChartBar, FaChartArea } from 'react-icons/fa';
import { route } from '../components/Navigation/Routes';
import styled from '@emotion/styled';

// 이미지 모음
import line from '/assets/img/line.png';
import measureDistance from '/assets/img/measureDistance.png';
import drilldown from '/assets/img/drilldown.png';
import color from '/assets/img/color.png';
import multiSelect from '/assets/img/multiSelect.png';
import pointSymbol from '/assets/img/pointSymbol.png';
import mapLabel from '/assets/img/mapLabel.png';
import svgMap from '/assets/img/svgMap.png';
import tileMap from '/assets/img/tileMap.png';

const imageList = [
  line,
  measureDistance,
  drilldown,
  color,
  multiSelect,
  pointSymbol,
  mapLabel,
  svgMap,
  tileMap,
];

const StyledFunctionText = styled.span`
  font-size: 1rem;
  margin-right: 0.25rem;
  padding: 5px 8px;
  border-radius: 0.25rem;
  font-weight: bold;
  color: #fff;
  background: ${({ category }) =>
    category === '고급기능'
      ? '#009ecc' : category === '실무예제'
        ? '#4caf50' : '#d04630'};
`;

// 스타일 정의
const StyledContainer = styled(Container)`
  padding-top: 4rem;
  padding-bottom: 4rem;
  max-width: 1200px;
`;

const StyledImgWrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 10px;

  &:hover .card-hover {
    opacity: 1;
    transition: opacity 350ms ease;
  }
`;

const StyledCardHover = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(FaSearch)`
  color: #ffffff;
  opacity: 0.8;
  font-size: 60px;
`;

const StyledCardTitle = styled('span')`
  padding: 0 5px;
  font-weight: bold;
`;

const StyledCardContent = styled(CardContent)`
  padding-bottom: 13px !important;
`;

const Row = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 32px; /* spacing 4 = 32px */
  justify-content: space-between;
`;

const CardWrapper = styled('div')`
  width: calc((100% - 64px) / 3); /* 3개 기준, gap 고려 */
  margin-bottom: 32px;
`;

// 카드 하나를 렌더링하는 컴포넌트
const SampleCard = ({ card, image }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StyledCardContent sx={{ flexGrow: 1 }}>
        <StyledImgWrapper
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`${card.title} 샘플 이미지`}
        >
          {/* {getChartIcon(card.name)} */}
          <StyledCardHover className="card-hover">
            <Link to={`/${card.name}`} aria-label={`${card.title} 예제로 이동`}>
              <StyledIcon />
            </Link>
          </StyledCardHover>
        </StyledImgWrapper>
        <div>
          {/* <StyledFunctionText category={card.category}>{card.category}</StyledFunctionText> */}
          <StyledCardTitle>{card.title}</StyledCardTitle>
        </div>
      </StyledCardContent>
    </Card>
  );
};

// 메인 컴포넌트
const Main = () => {
  return (
    <StyledContainer>
      <Row>
        {(route ?? []).map((card, index) => {
          const image = imageList[index] ?? '';
          return (
            <CardWrapper key={card.name || index}>
              <SampleCard card={card} image={image} />
            </CardWrapper>
          );
        })}
      </Row>
    </StyledContainer>
  );
};

export default Main;
