import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import Image from "../../Image";
type PostImageProps = {
  imageUrls: string[];
}
const PostImage = ({imageUrls}:PostImageProps) => {
  const [imgIndex, setImgIndex] = useState(1);
  return(
    
    <div className="relative z-10">
    <Swiper
      className="bg-slate-300"
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={(x: any) => setImgIndex(x.activeIndex + 1)}
    >
      {imageUrls.length > 0 ? (
        imageUrls.map((url, index) => (
          <SwiperSlide className="aspect-w-1 aspect-h-1" key={index}>
            <Image src={url} size="fit"/>
          </SwiperSlide>
        ))
      ) : (
        <p>이미지 없음.</p>
      )}
      {imageUrls.length > 1 ? (
        <b className="z-20 absolute text-sm right-3 top-3 text-white bg-black bg-opacity-60 rounded-full px-2 py-1">
          {imgIndex}/{imageUrls.length}
        </b>
      ) : (
        ""
      )}
    </Swiper>
  </div>
  )
}
export default PostImage