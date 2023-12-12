import React from "react";

    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbYLjD2pzvno_e9lVCDpt8OWmyfH_2Cu3NZw&usqp=CAU',

function Slider() {
  return (
    <>
      <div className="mt-8 md:mx-36 carousel">
        <div id="slide1" className="relative w-full carousel-item">
          <img
            src='https://media.licdn.cn/dms/image/C4E1BAQHkN7Cli0qSYw/company-background_10000/0/1607605666419?e=2159024400&v=beta&t=hylf9iaLVH9MRMFrjyPsTA7jV9kq81sVfuECjLlHp38'

            className="w-full"
            alt="slider 1"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="relative w-full carousel-item">
          <img
            src='https://i0.wp.com/www.elelanjobs.com/wp-content/uploads/2022/07/photo_2022-07-11_11-45-13.jpg?w=1280&ssl=1'
            className="w-full"
            alt="slider 2"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="relative w-full carousel-item">
          <img
            src='https://pbs.twimg.com/media/FgtTwl2X0AAG4fg.jpg'
            className="w-full"
            alt="slider 3"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="relative w-full carousel-item">
          <img
            src= 'https://pbs.twimg.com/media/FhWwJI4WAAQ6vao?format=jpg&name=large'
            className="w-full"
            alt="slider 4"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-2 py-2">
        <a href="#slide1" className="btn btn-xs">
          1
        </a>
        <a href="#slide2" className="btn btn-xs">
          2
        </a>
        <a href="#slide3" className="btn btn-xs">
          3
        </a>
        <a href="#slide4" className="btn btn-xs">
          4
        </a>
      </div>
    </>
  );
}

export default Slider;
