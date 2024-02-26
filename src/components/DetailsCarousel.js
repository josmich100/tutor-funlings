import React, { createRef, useEffect, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import Plyr from "plyr-react";
import Lightbox from 'react-image-lightbox';


const DetailsCarousel = ({ items }) => {

  const vidRef = createRef();

  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxFiles, setLightboxFiles] = useState({
    main: null,
    next: null,
    prev: null,
  });

  const goToIndex = (newIndex) => {
    if (newIndex === (items.length)) {
      setActiveIndex(0);
      handleSetLightboxFiles(0);
    }
    else if (newIndex === (-1)) {
      setActiveIndex(items.length - 1);
      handleSetLightboxFiles(items.length - 1);
    }
    else {
      setActiveIndex(newIndex);
      handleSetLightboxFiles(newIndex);
    }
  };

  const handleSetLightboxFiles = (activeIndex) => {
    if (activeIndex === 0) {
      setLightboxFiles({
        main: items[activeIndex]?.filePath,
        next: items[activeIndex + 1]?.filePath,
        prev: items[items.length - 1]?.filePath,
      });
    }
    else if (activeIndex === (items.length - 1)) {
      setLightboxFiles({
        main: items[activeIndex]?.filePath,
        next: items[0]?.filePath,
        prev: items[activeIndex - 1]?.filePath,
      });
    }
    else {
      setLightboxFiles({
        main: items[activeIndex]?.filePath,
        next: items[activeIndex + 1]?.filePath,
        prev: items[activeIndex - 1]?.filePath,
      });
    }
  };

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    if (items.length > 0 && items[activeIndex]?.filePath) {
      handleSetLightboxFiles(activeIndex);
    }
  }, [items]);


  // <-----------------UI--------------------->
  const thumbnail = (sizeH, sizeW) => {
    return (items.map((data, key) => (
      <div
        key={key}
        className="d-flex justify-content-center align-items-center m-1 p-1 flex-fill bg-warning bg-soft"
        onClick={() => goToIndex(key)}
        style={{
          borderRadius: 10,
          cursor: 'pointer',
          maxHeight: sizeH,
          maxWidth: sizeW,
          position: 'relative'
        }}
      >

        <div
          style={{
            backgroundColor: (key === activeIndex ? 'transparent' : 'rgba(255, 255, 255, 0.4)'),
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: (key === activeIndex ? 1 : 10),
            position: 'absolute',
          }}
        >
        </div>

        {data.isImage ?
          <img
            src={data.filePath}
            alt=""
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              zIndex: (key === activeIndex ? 10 : 1),
            }}
            className="img-fluid m-auto d-block thumbnail"
          />
          :
          <img
            src={`${data.filePath.slice(0, -3)}svg`}
            alt=""
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              zIndex: (key === activeIndex ? 10 : 1),
            }}
            className="img-fluid m-auto d-block thumbnail"
          />
        }
      </div>
    )));
  };

  const mainFile = (item, size) => {
    return (
      item.isImage ?
        <div
          onClick={() => setShowLightbox(true)}
          className='d-flex justify-content-center align-items-center p-2'
          style={{ height: size, }}
        >

          <div
            className="avatar-xs bg-primary bg- rounded overflow-hidden"
            style={{
              right: 5,
              bottom: 5,
              zIndex: 10,
              position: 'absolute',
            }}
          >
            <i className='avatar-title bx bx-expand fs-5 text-white' />
          </div>

          <img
            src={item.filePath}
            alt=''
            className="img-fluid mx-auto"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
        :
        <div
          className='d-flex flex-column justify-content-center w-100'
          style={{ height: size, }}
        >
          <Plyr
            ref={vidRef}
            source={{
              type: 'video',
              sources: [{
                src: item.filePath,
                provider: 'html5'
              }]
            }}
            options={{
              controls: ['play-large', 'mute', 'progress', 'volume', 'pip', 'fullscreen', 'current-time'],
              muted: true,
              disableContextMenu: true,
              settings: [],
              resetOnEnd: true,
              loop: { active: true }
            }}
          />
        </div>
    );
  };

  return (
    <div>
      {showLightbox &&
        <Lightbox
          onCloseRequest={() => setShowLightbox(false)}
          mainSrc={lightboxFiles.main}
          nextSrc={lightboxFiles.next}
          prevSrc={lightboxFiles.prev}
          onMovePrevRequest={() => goToIndex(activeIndex - 1)}
          onMoveNextRequest={() => goToIndex(activeIndex + 1)}
        />
      }

      <Row className='mx-0'>
        <Col md={{ span: 10, offset: 2 }}>
          <h5 className="my-2 text-center">
            <span className="px-3 rounded-pill badge-soft-primary ms-4">
              {items[activeIndex]?.featuredFile === true ?
                'Featured'
                :
                'Gallery Image'
              }
            </span>
          </ h5>
        </Col>
        <Col md={{ span: 10, order: 2 }} className='p-0'>
          <Carousel
            controls={false}
            indicators={false}
            pause={false}
            interval={null}
            activeIndex={activeIndex}
            onSelect={handleSelect}
            className='overflow-hidden d-flex rounded bg-warning bg-soft'
          >
            {items.map((item, key) => (
              <Carousel.Item key={key} className='h-100 w-100' style={{ cursor: 'pointer' }}>
                <div className="align-self-center d-flex d-md-none justify-content-center align-items-center h-100">
                  {mainFile(item, 200)}
                </div>
                <div className="align-self-center d-none d-md-flex justify-content-center align-items-center h-100">
                  {mainFile(item, 250)}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col md={{ span: 2, order: 1 }} className='p-0'>
          {/* Image Thumbnails */}
          <div className='d-none d-md-flex flex-column justify-content-start h-100'>
            {thumbnail(40, 'auto')}
          </div>
          <div className='d-flex justify-content-start d-md-none h-100'>
            {thumbnail(40, '20%')}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailsCarousel;
