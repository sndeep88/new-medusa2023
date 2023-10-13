import Image from "next/image"

const Hero = ({ bannerImage }: { bannerImage?: string }) => {
  return (
    <div className="max-w-full w-full relative aspect-video overflow-x-hidden">
      <Image
        src={bannerImage ? bannerImage : "/assets/images/banner.jpg"}
        layout="fill"
        loading="eager"
        priority={true}
        // quality={90}
        objectPosition="top"
        objectFit="cover"
        alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
        draggable="false"
        // sizes="100vw"
      />
    </div>
  )
}

export default Hero
