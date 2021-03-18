import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './LP.css';
const running = process.env.PUBLIC_URL + '/Assets/running.jpg';
const gps = process.env.PUBLIC_URL + '/Assets/gps.jpg';
const pushup = process.env.PUBLIC_URL + '/Assets/pushup.jpg';

const items = [
  {
    src: running ,//<img src={ process.env.PUBLIC_URL + '/Assets/coffee.png' } />,
    altText: 'Bieganie',
    caption: <span class="ke">Udostępniaj wyniki swojemu trenerowi</span>,
    header: <span class="ke">Podziel się sportowymi osiągnięciami</span>,
  },
  {
    src: gps,
    altText: 'Trasa',
    header: <span class="ke">Zapisz swoją trasę</span>,
    caption: <span class="ke">Włącz lokalizację GPS i udokumentuj pokonaną trasę</span>,
  },
  {
    src: pushup,
    altText: 'Poprawa wyników',
    caption: <span class="ke">Bieżąca poprawa wyników</span>,
    header: <span class="ke">Ćwicz z trenerem</span>,
  }
];

const AutoSlider = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="d-block w-100 croppedImg" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.header} className="LPSliderCaption" />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default AutoSlider;