import type * as React from "react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { PointerRevealGroup } from "@/components/ui/pointer-reveal";
import { Reveal } from "@/components/motion";
import { servicesContent } from "@/content/portfolio-content";

const serviceImageSizes =
  "(max-width: 520px) calc(100vw - 1.25rem), (max-width: 820px) calc((100vw - 2.1rem) / 2), (max-width: 1100px) calc((92vw - 1rem) / 2), (max-width: 1390px) calc((92vw - 2.3rem) / 3), 414px";

type Service = (typeof servicesContent.services)[number];

function serviceAssetExists(src: string) {
  if (!src.startsWith("/services/")) return false;

  return existsSync(join(process.cwd(), "public", src));
}

function ServiceVisual({ service }: { service: Service }) {
  const hasImage = serviceAssetExists(service.image.src);
  const imageStyle = {
    "--service-image-position": service.image.objectPosition.desktop,
    "--service-image-tablet-position":
      service.image.objectPosition.tablet ?? service.image.objectPosition.desktop,
    "--service-image-mobile-position": service.image.objectPosition.mobile,
    "--service-image-scale": service.image.scale?.desktop ?? 1,
    "--service-image-tablet-scale":
      service.image.scale?.tablet ?? service.image.scale?.desktop ?? 1,
    "--service-image-mobile-scale": service.image.scale?.mobile ?? 1,
  } as React.CSSProperties;

  return (
    <div className="service-card-artwork" style={imageStyle}>
      {!hasImage && (
        <div className="service-card-placeholder" aria-hidden="true">
          <span>Artwork pending</span>
        </div>
      )}

      {hasImage && (
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={serviceImageSizes}
          quality={88}
          className="service-card-image interactive-image-zoom"
        />
      )}
    </div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Reveal
      as="div"
      variant="fade-up"
      delay={(index % 3) * 90}
      duration={500}
      className="h-full"
    >
      <GlassPanel
        radius="card"
        className="service-card interactive-card-motion h-full"
        data-reveal-card
        data-visual-treatment={service.image.treatment}
      >
        <ServiceVisual service={service} />

        <div className="service-card-copy">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <PointerRevealGroup className="service-grid" aria-label="Services">
      {servicesContent.services.map((service, index) => (
        <ServiceCard
          key={service.title}
          service={service}
          index={index}
        />
      ))}
    </PointerRevealGroup>
  );
}
