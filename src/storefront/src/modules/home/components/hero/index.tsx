import Image from "next/image"

const Hero = () => {
  return (
    <div className="w-screen relative min-h-[35vh] sm:min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh]">
      <Image
        src="/assets/images/banner.jpg"
        layout="fill"
        loading="eager"
        priority={true}
        quality={90}
        objectPosition="top"
        objectFit="cover"
        alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
        draggable="false"
        sizes="100vw"
      />
    </div>
  )
}

export default Hero
